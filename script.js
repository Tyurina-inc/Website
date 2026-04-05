
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
    const up_btn = document.getElementById('scroll-up');
    
    // Пути к изображениям
    const defaultSrc = 'images/наверх.png';
    const hoverSrc = 'images/наверх-красная.png';
    const activeSrc = 'images/наверх-черная.png';
    
    if (up_btn) {
        // При наведении
        up_btn.addEventListener('mouseenter', () => {
            up_btn.src = hoverSrc;
        });
        
        // Когда убираем курсор
        up_btn.addEventListener('mouseleave', () => {
            up_btn.src = defaultSrc;
        });
        
        // При нажатии
        up_btn.addEventListener('mousedown', () => {
            up_btn.src = activeSrc;
        });
        
        // Когда отпускаем кнопку мыши
        up_btn.addEventListener('mouseup', () => {
            up_btn.src = hoverSrc; // возвращаем состояние наведения
        });
        
        // Если нажали и ушли с картинки
        up_btn.addEventListener('mouseleave', () => {
            up_btn.src = defaultSrc;
        });
        
        // Скролл к началу
        up_btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
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

