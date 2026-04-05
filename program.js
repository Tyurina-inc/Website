




//ЗАГРУЗКА СТРАНИЦ ПРОГРАММ ИЗ БЭКА

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    
    // Инициализация клиента Supabase
    const supabaseUrl = 'https://bddjcnnhebzecjidvwvu.supabase.co';
    const supabaseKey = 'sb_publishable_O3z7KO02mrk0XV5cTOBvqw_WrQ7K_Sv';
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    
    console.log('Supabase клиент создан');





    
    // Функция экранирования HTML
    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Получение ID программы из URL
    function getProgramIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    // Получение signed URL для изображения
    async function getSignedImageUrl(imageName, width = 1800, quality = 90) {
    console.log('=== getSignedImageUrl вызвана ===');
    console.log('imageName:', imageName);
    console.log('width:', width);
    
    if (!imageName) {
        console.log('imageName пустой, возвращаю null');
        return null;
    }
    
    try {
        const { data, error } = await supabaseClient
            .storage
            .from('images')
            .createSignedUrl(imageName, 3600, {
                transform: {
                    width: width,
                    quality: quality,
                    resize: 'contain'
                }
            });
        
        console.log('Результат createSignedUrl:');
        console.log('Ошибка:', error);
        console.log('Полученный URL:', data?.signedUrl);
        
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

    // Загрузка программы и её контента
    async function loadProgramPage() {
        const programId = getProgramIdFromUrl();
        const container = document.getElementById('program-page-container');
        
        if (!programId) {
            container.innerHTML = '<div class="error">ID программы не указан</div>';
            return;
        }
        
        try {
            container.innerHTML = '<div class="loading">Загрузка программы...</div>';
            
            // Загружаем основную информацию о программе
            const { data: program, error: programError } = await supabaseClient
                .from('Programs')
                .select('*')
                .eq('id', programId)
                .single();
            
            if (programError) {
                throw new Error(programError.message);
            }
            
            if (!program) {
                container.innerHTML = '<div class="error">Программа не найдена</div>';
                return;
            }
            
            // Загружаем контент программы (из Program_contents)
            const { data: contents, error: contentError } = await supabaseClient
                .from('Program_contents')
                .select('*')
                .eq('program_id', programId)
                .order('sort_order', { ascending: true });
            
            if (contentError) {
                console.error('Ошибка загрузки контента:', contentError);
            }
            
            // Получаем signed URL для главной картинки
            let mainImageUrl = null;
            if (program.main_image_url) {
                mainImageUrl = await getSignedImageUrl(program.main_image_url);
            }
            
            // Рендерим страницу
            await renderProgramPage(program, contents || [], mainImageUrl);
            
        } catch (error) {
            console.error('Ошибка загрузки программы:', error);
            container.innerHTML = `<div class="error">Ошибка загрузки программы: ${error.message}</div>`;
        }
    }

// Рендеринг страницы программы
// Рендеринг страницы программы
async function renderProgramPage(program, contents, mainImageUrl) {
    console.log('=== renderProgramPage ВЫЗВАНА ===');
    console.log('Программа:', program?.title);
    console.log('Контентов:', contents?.length);
    
    const container = document.getElementById('program-page-container');
    
    // Определяем класс для статуса
    const statusClass = program.status === 'Нет мест' ? 'no-spots' : '';
    
    // Обрабатываем динамический контент
    // Обрабатываем динамический контент с группировкой картинок
let dynamicContentHtml = '';
let imageBuffer = []; // буфер для картинок, идущих подряд

for (let i = 0; i < contents.length; i++) {
    const item = contents[i];
    console.log(`Обработка ${i}:`, item.content_type);
    
    if (item.content_type === 'text') {
        
        console.log(`  → Текст: "${item.content_text}"`);
        console.log(`  → Длина текста: ${item.content_text?.length}`);
        
        // Если есть накопленные картинки в буфере — сначала выводим их
        if (imageBuffer.length > 0) {
            dynamicContentHtml += renderImageGroup(imageBuffer);
            imageBuffer = [];
        }
        
        // Выводим текст (ТОЛЬКО ОДИН РАЗ)
        dynamicContentHtml += `
            <div class="content-block text-block" data-delay="${i * 0.1}">
                <p class="text">${escapeHtml(item.content_text || 'ПУСТОЙ ТЕКСТ')}</p>
            </div>
        `;
        console.log(`  → Добавлен текст`);
        
    } else if (item.content_type === 'image') {
        // Получаем signed URL для картинки
        let imageUrl = '';
        if (item.image_url) {
            imageUrl = await getSignedImageUrl(item.image_url, 600, 80);
        }
        
        // Добавляем в буфер
        imageBuffer.push({
            url: imageUrl,
            alt: item.alt || 'Изображение программы'
        });
    }
}

// Выводим оставшиеся картинки после цикла
if (imageBuffer.length > 0) {
    dynamicContentHtml += renderImageGroup(imageBuffer);
}

// Функция для отрисовки группы картинок
function renderImageGroup(images) {
    let imagesHtml = '';
    
    for (let i = 0; i < images.length; i++) {
        imagesHtml += `
            <div class="image-wrapper-half">
                <img src="${images[i].url}" alt="${images[i].alt}">
            </div>
        `;
    }
    
    return `
        <div class="content-block images-block">
            ${imagesHtml}
        </div>
    `;
}
    
    // Собираем полный HTML страницы
    const pageHtml = `
        <div class="headline2-block-program">  
            <p class="h2">${escapeHtml(program.title)}</p>
        </div>

        <div class="block-1-program">
            <p class="text">${escapeHtml(program.description)}</p>
            <div class="programm-card-tags">
                <div class="programm-card-tag text">${escapeHtml(program.age_tag || '5-8 лет')}</div>
                <div class="programm-card-tag text ${statusClass}">${escapeHtml(program.status)}</div>
            </div>
            <button class="btn1 prog-btn" data-target="application-form-title">Записаться</button>
        </div>

        <div class="block-2-program">
            <div class="image-wrapper-full">
                <img src="${mainImageUrl || 'images/placeholder.png'}" alt="${escapeHtml(program.title)}">
            </div>   
        </div>

        ${dynamicContentHtml}

        ${program.doc_url ? `
        <div class="documents-button-wrapper">
            <button class="btn2" onclick="window.open('${escapeHtml(program.doc_url)}', '_blank')">
                <p class="text">Изучить документы</p>
                <div class="icon"></div>
            </button>
        </div>
        ` : ''}

        <div class="warning-block">
            <div class="warning">
                <div class="icon"></div>
                <p class="text">Для регистрации на программу необходимо иметь сертификат дополнительного образования</p>
            </div>
        </div>

        <div class="block-2-program">
            <div class="block-form">
                <p class="form-title h2" id="application-form-title">Запишитесь на программу</p>
                <p class="form-subtitle text">Мы свяжемся с Вами</p>
                
                <form id="application-form" class="application-form">
                    <div class="form-field">
                        <label for="lastname" class="form-label">Фамилия</label>
                        <input type="text" id="lastname" name="lastname" class="form-input" placeholder="Иванов" required>
                    </div>
                    
                    <div class="form-field">
                        <label for="firstname" class="form-label">Имя</label>
                        <input type="text" id="firstname" name="firstname" class="form-input" placeholder="Иван" required>
                    </div>
                    
                    <div class="form-field">
                        <label for="phone" class="form-label">Номер телефона</label>
                        <input type="tel" id="phone" name="phone" class="form-input" placeholder="+7 800 123 45 67" required>
                    </div>
                    
                    <div class="form-field">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" name="email" class="form-input" placeholder="ivanov@mail.ru" required>
                        <div class="form-error" id="email-error"></div>
                    </div>
                    
                    <div class="form-checkbox">
                        <label class="checkbox-label">
                            <input type="checkbox" id="consent" name="consent" required>
                            <span class="checkbox-custom"></span>
                            <span class="checkbox-text">Я соглашаюсь на обработку персональных данных</span>
                        </label>
                    </div>
                    
                    <button type="submit" class="form-button btn1">Записаться</button>
                </form>
                
                <div id="form-success" class="form-success" style="display: none;">
                    <p class="h3">Заявка успешно отправлена!</p>
                </div>
            </div>

            <div class="mascots-image-wrapper">
                <img src="images/маскоты-запись.png" alt="Медвежонок, лисичка и бобренок идут в гору">
            </div>
        </div>
    `;
    
    container.innerHTML = pageHtml;
    console.log('=== РЕНДЕРИНГ ЗАВЕРШЕН ===');
    
    // Устанавливаем заголовок страницы
    const titleElement = document.getElementById('page-title');
    if (titleElement) {
        titleElement.textContent = `${program.title} | Центр туризма`;
    }
    
    // Запускаем анимации
    animateTitle();
    initScrollAnimation();
    initForm();
    initScrollToTop();
}
    
    // Анимация печатной машинки для заголовка
    function animateTitle() {
        const titleElement = document.querySelector('.headline2-block-program .h2');
        if (!titleElement) return;
        
        const textLength = titleElement.textContent.length;
        titleElement.style.animation = `typewriter 3s steps(${textLength}, end) 0.3s forwards`;
        titleElement.style.width = '0';
        titleElement.style.opacity = '1';
    }
    
    // Анимация появления блоков при скролле
    function initScrollAnimation() {
        const blocks = document.querySelectorAll('.block-1-program, .block-2-program, .content-block');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
        
        blocks.forEach(block => observer.observe(block));
        
        // Задержки для дочерних элементов
        document.querySelectorAll('.block-1-program p, .block-1-program .programm-card-tags, .block-1-program .btn1').forEach((el, idx) => {
            el.style.animationDelay = '0.3s';
        });
        
        document.querySelectorAll('.content-block').forEach((el, idx) => {
            const delay = idx * 0.1;
            el.style.animationDelay = `${delay}s`;
        });
    }
    
    // Инициализация формы
    function initForm() {
        const form = document.getElementById('application-form');
        if (!form) return;
        
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const submitButton = form.querySelector('.form-button');
        const successMessage = document.getElementById('form-success');
        
        // Маска для телефона
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value[0] !== '7') value = '7' + value;
                    let formatted = '+7';
                    if (value.length > 1) formatted += ' ' + value.substring(1, 4);
                    if (value.length >= 5) formatted += ' ' + value.substring(4, 7);
                    if (value.length >= 8) formatted += ' ' + value.substring(7, 9);
                    if (value.length >= 10) formatted += ' ' + value.substring(9, 11);
                    e.target.value = formatted.trim();
                } else {
                    e.target.value = '';
                }
            });
        }
        
        // Валидация email
        function validateEmail(email) {
            const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
            return re.test(email);
        }
        
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                const email = emailInput.value;
                if (email && !validateEmail(email)) {
                    emailError.textContent = 'Введите корректный email (например, name@domain.ru)';
                    emailError.classList.add('show');
                    emailInput.classList.add('error');
                } else {
                    emailError.classList.remove('show');
                    emailInput.classList.remove('error');
                }
            });
        }
        
        // Отправка формы
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Простая валидация
            const lastname = document.getElementById('lastname').value.trim();
            const firstname = document.getElementById('firstname').value.trim();
            const phone = phoneInput.value.trim();
            const email = emailInput.value.trim();
            const consent = document.getElementById('consent').checked;
            
            if (!lastname || !firstname || !phone || !email || !consent) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Введите корректный email');
                return;
            }
            
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';
            
            const formData = {
                lastname,
                firstname,
                phone,
                email,
                consent,
                program_id: getProgramIdFromUrl(),
                created_at: new Date().toISOString()
            };
            
            try {
                const { error } = await supabaseClient
                    .from('Applications')
                    .insert([formData]);
                
                if (error) throw error;
                
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
            } catch (error) {
                console.error('Ошибка отправки:', error);
                alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
                submitButton.disabled = false;
                submitButton.textContent = 'Записаться';
            }
        });
    }
    
    // Кнопка "Наверх"
    function initScrollToTop() {
        const scrollUpBtn = document.getElementById('scroll-up');
        if (scrollUpBtn) {
            scrollUpBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    
    // Загружаем страницу
    loadProgramPage();
});
