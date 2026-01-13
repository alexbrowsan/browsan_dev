// Плавный скролл по якорям
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || !href.startsWith('#')) return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// Фон навбара при скролле
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Анимации появления блоков
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Карточки услуг
document.querySelectorAll('.service-card').forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Блок «Для кого»
const targetContent = document.querySelector('.target-content');
if (targetContent) {
    targetContent.style.opacity = '0';
    targetContent.style.transform = 'translateY(20px)';
    targetContent.style.transition =
        'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(targetContent);
}

// Модальное окно для кейсов
const modal = document.getElementById('caseModal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const modalTitle = document.getElementById('modalTitle');
const modalScreenshots = document.getElementById('modalScreenshots');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalResults = document.getElementById('modalResults');

// Данные кейсов (здесь вы будете заполнять свои данные)
const casesData = {
    site: {
        title: 'Запуск сайта для студии растяжки за 48 часов',
        screenshots: ['скрин 1.jpg'],
        task: 'У студии не было сайта, заявки терялись в переписках, запись не масштабировалась. Нужно было быстро начать принимать клиентов без долгого дизайна и ТЗ.',
        solution: 'За 1 созвон собрал требования, запустил простой сайт, подключил CRM и настроил поток заявок без ручной обработки.',
        deadline: '48 часов от обращения до первых клиентов.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        results: [
            'первые записи и продажи в течение 2 суток',
            'заявки сразу попадают в CRM',
            'администратор тратит меньше времени на обработку'
        ]
    },
    game: {
        title: 'Игровые механики для фудтех-платформы',
        screenshots: ['скрин 2.jpg'],
        task: 'Фудтех-платформе нужно было создать игровые механики, которые можно продавать пользователям как дополнительный продукт и использовать для повышения вовлечения.',
        solution: 'Разработал несколько игровых прототипов с простой логикой и быстрым запуском. Игры адаптированы под интеграцию в существующую платформу и масштабирование под разные сценарии продаж.',
        deadline: '3 дня',
        tech: ['HTML', 'CSS', 'JavaScript'],
        results: [
            'готовые игры как продаваемый digital-продукт',
            'возможность подключения игр к платформе без сложной интеграции',
            'рост вовлечения пользователей через интерактив'
        ]
    },
    bot: {
        title: 'AI-бот для анализа осанки и продажи онлайн-программ',
        screenshots: ['бот 1.jpg', 'бот 2.jpg'],
        task: 'Автоматизировать первичную диагностику клиента и продажи курсов без участия тренера.',
        solution: 'Telegram-бот принимает фото, анализирует осанку с помощью AI, выдаёт рекомендации и предлагает подходящий продукт.',
        deadline: '24 часа',
        tech: ['Python', 'Telegram API'],
        results: [
            'автоматизирована первичная консультация',
            'бот работает как продавец 24/7',
            'снижена нагрузка на тренера'
        ]
    }
};

// Функция открытия модального окна
function openModal(caseId) {
    const caseData = casesData[caseId];
    if (!caseData) return;

    // Заполняем данные
    modalTitle.textContent = caseData.title;
    
    // Скриншоты
    modalScreenshots.innerHTML = '';
    if (caseData.screenshots && caseData.screenshots.length > 0) {
        caseData.screenshots.forEach(screenshot => {
            const screenshotDiv = document.createElement('div');
            screenshotDiv.className = 'modal-screenshot';
            screenshotDiv.innerHTML = `<img src="${screenshot}" alt="${caseData.title}">`;
            modalScreenshots.appendChild(screenshotDiv);
        });
    } else {
        modalScreenshots.innerHTML = '<p style="color: var(--text-secondary);">Скриншоты будут добавлены</p>';
    }
    
    // Задача
    if (caseData.task) {
        modalDescription.innerHTML = `<h3>Задача</h3><p>${caseData.task}</p>`;
    } else if (caseData.description) {
        modalDescription.innerHTML = `<h3>Описание</h3><p>${caseData.description}</p>`;
    } else {
        modalDescription.innerHTML = '';
    }
    
    // Решение
    if (caseData.solution) {
        const solutionDiv = document.createElement('div');
        solutionDiv.className = 'modal-solution';
        solutionDiv.innerHTML = `<h3>Решение</h3><p>${caseData.solution}</p>`;
        modalDescription.appendChild(solutionDiv);
    }
    
    // Срок
    if (caseData.deadline) {
        const deadlineDiv = document.createElement('div');
        deadlineDiv.className = 'modal-deadline';
        deadlineDiv.innerHTML = `<h3>Срок</h3><p>${caseData.deadline}</p>`;
        modalDescription.appendChild(deadlineDiv);
    }
    
    // Технологии
    modalTech.innerHTML = '';
    if (caseData.tech && caseData.tech.length > 0) {
        const techTitle = document.createElement('h3');
        techTitle.textContent = 'Технологии';
        modalTech.appendChild(techTitle);
        const techList = document.createElement('ul');
        caseData.tech.forEach(tech => {
            const li = document.createElement('li');
            li.textContent = tech;
            techList.appendChild(li);
        });
        modalTech.appendChild(techList);
    }
    
    // Результат
    modalResults.innerHTML = '';
    if (caseData.results && caseData.results.length > 0) {
        const resultsTitle = document.createElement('h3');
        resultsTitle.textContent = 'Результат';
        modalResults.appendChild(resultsTitle);
        const resultsList = document.createElement('ul');
        caseData.results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result;
            resultsList.appendChild(li);
        });
        modalResults.appendChild(resultsList);
    } else if (caseData.result) {
        const resultTitle = document.createElement('h3');
        resultTitle.textContent = 'Результат';
        modalResults.appendChild(resultTitle);
        const resultP = document.createElement('p');
        resultP.textContent = caseData.result;
        resultP.style.color = 'var(--text-secondary)';
        resultP.style.lineHeight = '1.8';
        resultP.style.fontSize = '1.1rem';
        modalResults.appendChild(resultP);
    }
    
    // Добавляем класс для кейсов "site" и "game" для специальных стилей (скриншот на всю ширину)
    if (caseId === 'site' || caseId === 'game') {
        modal.classList.add('modal-site');
    } else {
        modal.classList.remove('modal-site');
    }
    
    // Показываем модальное окно
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Функция закрытия модального окна
function closeModal() {
    modal.classList.remove('active');
    modal.classList.remove('modal-site');
    document.body.style.overflow = '';
}

// Обработчики событий
document.querySelectorAll('.case-card').forEach(card => {
    card.addEventListener('click', () => {
        const caseId = card.getAttribute('data-case');
        if (caseId) {
            openModal(caseId);
        }
    });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

