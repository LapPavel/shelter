//Бергер меню
const burgerBtn = document.querySelector('.burger_btn');
const burgerMenu = document.querySelector('.menu-container');
const burgerBack = document.querySelector('.burger_blackground');
const html = document.querySelector('html');
const burgerArr = [burgerBtn, burgerMenu, burgerBack, html];

// Открытие/закрытие бергер меню
function toggleBurgerMenu() {
    burgerArr.forEach(el => el.classList.toggle('active'));
}

function closeBurgerMenu() {
    burgerArr.forEach(el => el.classList.remove('active'));
}

function selectMenu(el) {
    if (el.target.tagName === "A") {closeBurgerMenu()};
};

// Обработчик меню
burgerBtn.addEventListener('click', toggleBurgerMenu);
burgerMenu.addEventListener('click', selectMenu);
burgerBack.addEventListener('click', toggleBurgerMenu);
//-----------------------------------------------------------------

// Слайдер-карусель
import pets from "../../assets/pets.json" assert { type: 'json' };
let prevArr = [], curArr = [], nextArr = [];
let cardsCount;
const prevBtn = document.querySelector('.slide_prev');
const nextBtn = document.querySelector('.slide_next');
const slider = document.querySelector('.slider');
const sliderWrap = document.querySelector('.slider-wrap')

if (window.innerWidth > 1279) {
    cardsCount = 3;
} else if (window.innerWidth > 767) {
    cardsCount = 2;
} else cardsCount = 1;


getRnd(curArr)
getSecondRnd(prevArr, curArr)
getSecondRnd(nextArr, curArr)


addCardTemplate(prevArr);
addCardTemplate(curArr);
addCardTemplate(nextArr);

//Создание карточек
function addCardTemplate(arr) {
    const cards = document.createElement('div');
    cards.classList.add('slider-cards');
    for (let i = 0; i < arr.length; i++) {
        const card = createCardTemplate(arr, i);
        cards.appendChild(card);
    }
    slider.appendChild(cards);
}

function createCardTemplate(changeArr, i) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<img src=${pets[changeArr[i]].img} alt=${pets[changeArr[i]].name} class="card_img">
    <p>${pets[changeArr[i]].name}</p>
    <button class="card_btn">Learn more</button>`;
    return card;
}

//Генерация псевдослучайных наборов
function getRnd(arr) {
    arr.splice(0, arr.length);
    for (let i = 0; i < cardsCount; i++) {
        let num = parseInt(Math.random() * 8);
        while (arr.includes(num)) {
            num = parseInt(Math.random() * 8);
        };
        arr.push(num);
    };
};

function getSecondRnd(arr1, arr2) {
    arr1.splice(0, arr1.length);
    for (let i = 0; i < cardsCount; i++) {
        let num = parseInt(Math.random() * 8);
        while (arr1.includes(num) || arr2.includes(num)) {
            num = parseInt(Math.random() * 8);
        };
        arr1.push(num);
    };
 };

//Изменение размера слайдера
function rebuildSlider() {
    slider.innerHTML = '';
    getRnd(curArr);
    getSecondRnd(prevArr, curArr);
    getSecondRnd(nextArr, curArr);
    addCardTemplate(prevArr);
    addCardTemplate(curArr);
    addCardTemplate(nextArr);
    addListnerModal();
}

// Перестройка слайдера под ширину окна
window.addEventListener('resize', resizeWindow, true);
function resizeWindow() {
    if (window.innerWidth > 1279 && sliderWrap.offsetWidth === 1080) {
        cardsCount = 3;
        const sliderPart = document.querySelector('.slider-cards')
        if (sliderPart.children.length != cardsCount) {
            rebuildSlider();
        };
    } else if (window.innerWidth > 767 && sliderWrap.offsetWidth === 645) {
        cardsCount = 2;
        const sliderPart = document.querySelector('.slider-cards')
        if (sliderPart.children.length != cardsCount) {
            rebuildSlider();
        };
    } else {
        cardsCount = 1;
        const sliderPart = document.querySelector('.slider-cards')
        if (sliderPart.children.length != cardsCount) {
            rebuildSlider();
        };
    };
};

//Прокрутка слайдера
function moveLeft() {
    slider.classList.add('transition-left');
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
};

function moveRight() {
    slider.classList.add('transition-right');
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
}

prevBtn.addEventListener('click', moveLeft);
nextBtn.addEventListener('click', moveRight);

slider.addEventListener('animationend', (event) => {
    let changedItem;
    let changeArr;
    const prevSlide = document.querySelectorAll('.slider-cards')[0];
    const curSlide = document.querySelectorAll('.slider-cards')[1];
    const nextSlide = document.querySelectorAll('.slider-cards')[2];
    if (event.animationName === 'move-left') {
        slider.classList.remove('transition-left');
        changedItem = prevSlide;
        nextSlide.innerHTML = curSlide.innerHTML;
        curSlide.innerHTML = prevSlide.innerHTML;
        nextArr = [...curArr];
        curArr = [...prevArr];
        getSecondRnd(prevArr, curArr);
        changeArr = [...prevArr];
    } else {
        slider.classList.remove('transition-right');
        changedItem = nextSlide;
        prevSlide.innerHTML = curSlide.innerHTML;
        curSlide.innerHTML = nextSlide.innerHTML;
        prevArr = [...curArr];
        curArr = [...nextArr];
        getSecondRnd(nextArr, curArr);
        changeArr = [...nextArr];
    }
    changedItem.innerHTML = '';
    for (let i = 0; i < cardsCount; i++) {
        const card = createCardTemplate(changeArr, i);
        changedItem.appendChild(card);
    }
    prevBtn.addEventListener('click', moveLeft);
    nextBtn.addEventListener('click', moveRight);
    addListnerModal();
});
//-----------------------------------------------------------------

// Модальное окно для карточек
function openModal(i) {
    createModalWindow(i);
    html.classList.add('active');
    const overlay = document.querySelector('.overlay');
    const modalBack = document.querySelector('.modal-back');
    const modalBtn = document.querySelector('.modal_btn');
    modalBack.addEventListener('click', () => {
        overlay.remove();
        html.classList.remove('active');
    });
    modalBtn.addEventListener('click', () => {
        overlay.remove();
        html.classList.remove('active');
    });
 };

// Создаем крточку
function createModalWindow(i) {
    const modalWindow = document.createElement('div');
    modalWindow.classList.add('overlay');
    modalWindow.innerHTML = `
    <div class="modal-back"></div>
    <div class="modal-container">
        <button class="modal_btn"></button>
        <div class="modal-content">
            <img src=${pets[curArr[i]].img} alt=${pets[curArr[i]].name}>
            <div class="modal-animal">
                <h3 class="animal_name">${pets[curArr[i]].name}</h3>
                <p class="animal_type">${pets[curArr[i]].type} - ${pets[curArr[i]].breed}</p>
                <p class="animal_info">${pets[curArr[i]].description}</p>
                <ul class="animal_feature">
                    <li><p><b>Age:</b> ${pets[curArr[i]].age}</p></li>
                    <li><p><b>Inoculations:</b> ${pets[curArr[i]].inoculations}</p></li>
                    <li><p><b>Diseases:</b> ${pets[curArr[i]].diseases}</p></li>
                    <li><p><b>Parasites:</b> ${pets[curArr[i]].parasites}</p></li>
                </ul>
            </div>
        </div>
    </div>`;
    document.body.appendChild(modalWindow);
}

// Обработчик модального окна
function addListnerModal() {
    const cards = document.querySelectorAll('.slider-cards')[1].querySelectorAll('.card');
    cards.forEach((el, i) => {
        el.addEventListener('click', () => openModal(i))
    });
};
addListnerModal();
//-----------------------------------------------------------------