
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

    async function getSignedImageUrl(imageName) {
        if (!imageName) return null;
        
        try {
            const { data, error } = await supabaseClient
                .storage
                .from('images')
                .createSignedUrl(imageName, 3600);
            
            if (error) {
                console.error(`Ошибка получения signed URL для ${imageName}:`, error);
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
        
        if (!container) {
            console.error('Контейнер programs-container не найден!');
            return;
        }
        
        if (!programs || programs.length === 0) {
            container.innerHTML = '<div class="loading">Программы не найдены</div>';
            return;
        }
        
        // Проверяем данные
        console.log('Рендеринг карточек, количество:', programs.length);
        console.log('Первая программа:', programs[0]);
        
        const cardsHtml = programs.map(program => {
            // Определяем класс для тега статуса
            const statusClass = program.status === 'Нет мест' ? 'no-spots' : '';
            
            // Формируем стиль для обложки
            const coverStyle = program.imageUrl 
                ? `background-image: url('${program.imageUrl}'); background-size: cover; background-position: center;`
                : 'background-color: #f0f0f0; background-image: none;';
            
            return `
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
            `;
        }).join('');
        
        console.log('Сгенерированный HTML длина:', cardsHtml.length);
        container.innerHTML = cardsHtml;
        console.log('Карточки отрисованы');
    }

    // Загружаем программы
    loadProgramsWithSignedUrls();
});


//ЗАГРУЗКА СТРАНИЦ ПРОГРАММ ИЗ БЭКА








// ФОРМА ЗАПИСИ НА ПРОГРАММУ


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('application-form');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const submitButton = form.querySelector('.form-button');
    const successMessage = document.getElementById('form-success');
    
    // Маска для телефона
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] !== '7') {
                value = '7' + value;
            }
            
            let formatted = '+7';
            
            if (value.length > 1) {
                formatted += ' ' + value.substring(1, 4);
            }
            if (value.length >= 5) {
                formatted += ' ' + value.substring(4, 7);
            }
            if (value.length >= 8) {
                formatted += ' ' + value.substring(7, 9);
            }
            if (value.length >= 10) {
                formatted += ' ' + value.substring(9, 11);
            }
            
            e.target.value = formatted.trim();
        } else {
            e.target.value = '';
        }
    });
    
    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return re.test(email);
    }
    
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
    
    // Валидация телефона
    function validatePhone(phone) {
        const digits = phone.replace(/\D/g, '');
        return digits.length === 11 && digits[0] === '7';
    }
    
    // Валидация формы
    function validateForm() {
        let isValid = true;
        
        const lastname = document.getElementById('lastname');
        const firstname = document.getElementById('firstname');
        const phone = phoneInput;
        const email = emailInput;
        const consent = document.getElementById('consent');
        
        // Проверка полей
        [lastname, firstname].forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        
        // Проверка телефона
        if (!validatePhone(phone.value)) {
            phone.classList.add('error');
            isValid = false;
        } else {
            phone.classList.remove('error');
        }
        
        // Проверка email
        if (!validateEmail(email.value)) {
            email.classList.add('error');
            if (email.value) {
                emailError.textContent = 'Введите корректный email (например, name@domain.ru)';
                emailError.classList.add('show');
            }
            isValid = false;
        } else {
            email.classList.remove('error');
            emailError.classList.remove('show');
        }
        
        // Проверка согласия
        if (!consent.checked) {
            consent.closest('.form-checkbox').classList.add('error');
            isValid = false;
        } else {
            consent.closest('.form-checkbox').classList.remove('error');
        }
        
        return isValid;
    }
    
    // Отправка формы
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Показываем общее сообщение об ошибке
            alert('Пожалуйста, заполните все поля корректно');
            return;
        }
        
        // Блокируем кнопку
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
        
        // Собираем данные
        const formData = {
            lastname: document.getElementById('lastname').value.trim(),
            firstname: document.getElementById('firstname').value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            consent: document.getElementById('consent').checked,
            created_at: new Date().toISOString()
        };
        
        try {
            // Здесь должен быть запрос к вашему API
            // Пример для Supabase:
            /*
            const { data, error } = await supabase
                .from('applications')
                .insert([formData]);
            
            if (error) throw error;
            */
            
            // Имитация отправки (удалите после подключения Supabase)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('Форма отправлена:', formData);
            
            // Показываем сообщение об успехе
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Опционально: скролл к форме
            document.querySelector('.block-form').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
        } catch (error) {
            console.error('Ошибка отправки:', error);
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
            submitButton.disabled = false;
            submitButton.textContent = 'Записаться';
        }
    });
    
    // Сброс ошибок при вводе
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });
    
    document.getElementById('consent').addEventListener('change', () => {
        document.querySelector('.form-checkbox').classList.remove('error');
    });
});



// КНОПКА СКРОЛЛА

document.querySelectorAll('.prog-btn').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

//КНОПКА СКРОЛЛА ВВЕРХ

    document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('scroll-up');
    
    // Пути к изображениям
    const defaultSrc = 'images/наверх.png';
    const hoverSrc = 'images/наверх-красная.png';
    const activeSrc = 'images/наверх-черная.png';
    
    if (logo) {
        // При наведении
        logo.addEventListener('mouseenter', () => {
            logo.src = hoverSrc;
        });
        
        // Когда убираем курсор
        logo.addEventListener('mouseleave', () => {
            logo.src = defaultSrc;
        });
        
        // При нажатии
        logo.addEventListener('mousedown', () => {
            logo.src = activeSrc;
        });
        
        // Когда отпускаем кнопку мыши
        logo.addEventListener('mouseup', () => {
            logo.src = hoverSrc; // возвращаем состояние наведения
        });
        
        // Если нажали и ушли с картинки
        logo.addEventListener('mouseleave', () => {
            logo.src = defaultSrc;
        });
        
        // Скролл к началу
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Стиль курсора
        logo.style.cursor = 'pointer';
    }
});

//АККОРДИОН

document.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const icon = item.querySelector('.accordion-icon');
    
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        if (!isActive) {
            // Открываем аккордеон
            item.classList.add('active');
            
            // Добавляем класс для анимации поворота
            icon.style.transform = 'rotate(180deg)';
            
            // Меняем иконку в середине поворота (через половину времени анимации)
            setTimeout(() => {
                if (item.classList.contains('active')) {
                    icon.style.backgroundImage = "url('images/минус.png')";
                }
            }, 150);
            
        } else {
            // Закрываем аккордеон
            // Сначала меняем иконку на плюс
            icon.style.backgroundImage = "url('images/плюс.png')";
            
            // Затем поворачиваем обратно
            setTimeout(() => {
                if (!item.classList.contains('active')) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }, 50);
            
            item.classList.remove('active');
        }
    });
});


// АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ

document.addEventListener('DOMContentLoaded', () => {
    // Выбираем все блоки, которые нужно анимировать
    const animatedBlocks = document.querySelectorAll('.block-2, .headline2-block, .block-4, .block-5, .block-2-program');
    
    // Создаем наблюдатель
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Если блок появляется в области видимости
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Опционально: продолжаем наблюдать, чтобы анимация сработала только раз
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Блок считается видимым, когда 20% его площади на экране
        rootMargin: '0px 0px -50px 0px' // Небольшой отступ снизу
    });
    
    // Начинаем наблюдение за каждым блоком
    animatedBlocks.forEach(block => {
        observer.observe(block);
    });
});


// //АДАПТИРОВАНИЕ ОБЛОЖКИ ПОД ЭКРАН

document.addEventListener('DOMContentLoaded', () => {
    resizeCoverIframe();
});

window.addEventListener('load', resizeCoverIframe);
window.addEventListener('resize', resizeCoverIframe);

function resizeCoverIframe() {
    const iframe = document.querySelector('.cover iframe');
    const cover = document.querySelector('.cover');
    
    if (!iframe || !cover) return;
    
    const coverHeight = cover.offsetHeight;
    
    // Исходные пропорции анимации (1920×1122)
    const animationRatio = 1920 / 1122; // ≈ 1.71
    
    // Вычисляем ширину, сохраняя пропорции
    const iframeWidth = coverHeight * animationRatio;
    
    iframe.style.height = `${coverHeight}px`;
    iframe.style.width = `${iframeWidth}px`;
    iframe.style.left = '50%';
    iframe.style.transform = `translateX(-50%)`;
}



// document.addEventListener('DOMContentLoaded', () => {
//     resizeFireIframe();
// });

// window.addEventListener('load', resizeFireIframe);
// window.addEventListener('resize', resizeFireIframe);

// function resizeFireIframe() {
//     const iframe = document.querySelector('#mascots-fire');
//     const container = document.querySelector('.child-2');
    
//     if (!iframe || !container) return;
    
//     // Размеры контейнера
//     const containerWidth = container.offsetWidth;
//     const containerHeight = container.offsetHeight;
    
//     // Исходные размеры анимации (из вашего файла)
//     // Теперь соответствуют размеру child-2 на 1920px
//     const animationWidth = 642;   // ширина анимации в пикселях
//     const animationHeight = 560;  // высота анимации в пикселях
    
//     // Вычисляем масштаб для полного заполнения контейнера
//     const scaleX = containerWidth / animationWidth;
//     const scaleY = containerHeight / animationHeight;
//     const scale = Math.max(scaleX, scaleY); // cover режим
    
//     // Задаем фиксированные размеры iframe
//     iframe.style.width = `${animationWidth}px`;
//     iframe.style.height = `${animationHeight}px`;
    
//     // Масштабируем и центрируем
//     iframe.style.transform = `translate(-50%, -50%) scale(${scale})`;
// }