//  ЗАГРУЗКА КАРТОЧКИ ИЗ БЭКА


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    
    // Инициализация клиента Supabase
    const supabaseUrl = 'https://bddjcnnhebzecjidvwvu.supabase.co';
    const supabaseKey = 'sb_publishable_O3z7KO02mrk0XV5cTOBvqw_WrQ7K_Sv';
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    
    console.log('Supabase клиент создан');

    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    async function getSignedImageUrl(imageName, width = 400, quality = 80) {
    if (!imageName) return null;
    
    try {
        // Добавляем параметры трансформации прямо в запрос
        const { data, error } = await supabaseClient
            .storage
            .from('images')
            .createSignedUrl(imageName, 3600, {
                transform: {
                    width: width,      // Ширина (для карточек 400-600, для страниц 800-1200)
                    quality: quality,  // Качество 80% (почти неотличимо от оригинала)
                    resize: 'contain'  // Как вписывать картинку
                }
            });
        
        if (error) {
            console.error(`Ошибка получения signed URL:`, error);
            return null;
        }
        
        return data.signedUrl;
    } catch (error) {
        console.error('Ошибка при создании signed URL:', error);
        return null;
    }
}

    async function loadProgramsWithSignedUrls() {
        const container = document.getElementById('programs-container');
        
        if (!container) {
            console.error('Контейнер programs-container не найден!');
            return;
        }
        
        try {
            container.innerHTML = '<div class="loading">Загрузка программ...</div>';
            
            const { data: programs, error: programsError } = await supabaseClient
                .from('Programs')
                .select('*')
                .order('id', { ascending: true });
            
            if (programsError) {
                throw new Error(programsError.message);
            }
            
            if (!programs || programs.length === 0) {
                container.innerHTML = '<div class="loading">Программы не найдены</div>';
                return;
            }
            
            const programsWithImages = await Promise.all(
                programs.map(async (program) => {
                    let imageUrl = null;
                    
                    if (program.main_image_url) {
                        imageUrl = await getSignedImageUrl(program.main_image_url);
                    }
                    
                    return {
                        ...program,
                        imageUrl: imageUrl
                    };
                })
            );
            
            renderProgramCards(programsWithImages);
            
        } catch (error) {
            console.error('Ошибка загрузки программ:', error);
            container.innerHTML = `<div class="error">Ошибка загрузки программ: ${error.message}</div>`;
        }
    }

    function renderProgramCards(programs) {
    const container = document.getElementById('programs-container');
    
    if (!container) return;
    
    const cardsHtml = programs.map(program => {
        const statusClass = program.status === 'Нет мест' ? 'no-spots' : '';
        const coverStyle = program.imageUrl 
            ? `background-image: url('${program.imageUrl}'); background-size: cover; background-position: center;`
            : 'background-color: #f0f0f0;';
        
        return `
            <a href="program.html?id=${program.id}" class="programm-card-link">
                <div class="programm-card">
                    <div class="programm-card-cover" style="${coverStyle}">
                        <div class="programm-card-tags">
                            <div class="programm-card-tag text">${escapeHtml(program.age_tag || '5-8 лет')}</div>
                            <div class="programm-card-tag text ${statusClass}">${escapeHtml(program.status)}</div>
                        </div>
                    </div>
                    <div class="programm-card-title h3">${escapeHtml(program.title)}</div>
                    <div class="programm-card-text text">${escapeHtml(program.description)}</div>
                </div>
            </a>
        `;
    }).join('');
    
    container.innerHTML = cardsHtml;
    }

    // Загружаем программы
    loadProgramsWithSignedUrls();
});