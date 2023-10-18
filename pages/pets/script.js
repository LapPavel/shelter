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

// Пагинация
import pets from "../../assets/pets.json" assert { type: 'json' };
const cardsContainer = document.querySelector('.cards-container');
let page = 0;
let cardsCount;

// Создаем массив случайных массивов :)
function createArrs() {
    let arr = [];
    for (let i = 0; i < 6; i++) {
        arr.push(getRnd())
        if (arr[i-1] && (arr[i].slice(0, 4).includes(arr[i-1].at(-1)) ||
        arr[i].slice(0, 4).includes(arr[i-1].at(-2)) ||
        arr[i-1].slice(-4).includes(arr[i].at(0)) ||
        arr[i-1].slice(-4).includes(arr[i].at(1)))) {
            arr.pop()
            i--
        }
    }
    return arr;
};

function getRnd() {
    let arr = [];
    for (let i = 0; i < 8; i++) {
        let num = parseInt(Math.random() * 8);
        while (arr.includes(num)) {
            num = parseInt(Math.random() * 8);
        };
        arr.push(num);
    };
    return arr;
};

function rebuildArr() {
    let newArr = [...arr.flat()];
    arr.splice(0, arr.length);
    for (let i = 0; i < 48; i += 48 / cardsCount) {
        arr.push(newArr.slice(i, i + 48 / cardsCount))
    };
}

const arr = createArrs();

// Перестроение массива для разной ширины
if (window.innerWidth > 990) {
    cardsCount = 6;
    rebuildArr();
} else if (window.innerWidth > 520) {
    cardsCount = 8;
    rebuildArr();
} else {
    cardsCount = 16;
    rebuildArr();
}

//Создание карточек
function buildCards(arr) {
    for (let i = 0; i <  48 / cardsCount; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<img src=${pets[arr[i]].img} alt=${pets[arr[i]].name} class="card_img">
        <p>${pets[arr[i]].name}</p>
        <button class="card_btn">Learn more</button>`;
        cardsContainer.appendChild(card);
    };
};

buildCards(arr[0]);

// Изменение карточек
function onForwardBtn() {
    btnEnd.classList.remove('non_active');
    btnNext.classList.remove('non_active');
    btnNext.addEventListener('click', nextCards);
    btnEnd.addEventListener('click', endCrads);
};

function offForwardBtn() {
    btnNext.removeEventListener('click', nextCards);
    btnEnd.removeEventListener('click', endCrads);
    btnNext.classList.add('non_active');
    btnEnd.classList.add('non_active');
};

function onBackBtn() {
    btnBegin.classList.remove('non_active');
    btnPrev.classList.remove('non_active');
    btnPrev.addEventListener('click', prevCards);
    btnBegin.addEventListener('click', beginCards);
};

function offBackBtn() {
    btnPrev.removeEventListener('click', prevCards);
    btnBegin.removeEventListener('click', beginCards);
    btnPrev.classList.add('non_active');
    btnBegin.classList.add('non_active');
};

function nextCards() {
    cardsContainer.innerHTML= '';
    page++;
    buildCards(arr[page]);
    if (page > 0) {
        onBackBtn();
    };
    numPage.textContent = page + 1;
    if (page >= cardsCount - 1) {
        offForwardBtn();
    };
    addListnerModal();
};

function endCrads() {
    cardsContainer.innerHTML= '';
    page = cardsCount - 1;
    buildCards(arr[page]);
    onBackBtn();
    numPage.textContent = page + 1;
    offForwardBtn();
    addListnerModal();
};

function prevCards() {
    cardsContainer.innerHTML= '';
    page--;
    buildCards(arr[page]);
    if (page < cardsCount - 1) {
        onForwardBtn();
    };
    numPage.textContent = page + 1;
    if (page <= 0) {
        offBackBtn();
    };
    addListnerModal();
};

function beginCards() {
    cardsContainer.innerHTML= '';
    page = 0;
    buildCards(arr[page]);
    onForwardBtn();
    numPage.textContent = page + 1;
    offBackBtn();
    addListnerModal();
};

// Перестройка карточек под ширину окна
const mediaDesktop = '(min-width: 991px)';
const mediaTablet = '(min-width: 520px) and (max-width: 990px)';
const mediaPhone = '(max-width: 520px)';
const mediaDesktopList = window.matchMedia(mediaDesktop);
const mediaTabletList = window.matchMedia(mediaTablet);
const mediaPhoneList = window.matchMedia(mediaPhone);

mediaDesktopList.addEventListener('change', event => {
    if (event.matches) {
        cardsCount = 6;
        rebuildArr();
        if (page >= cardsCount) {
            page = cardsCount - 1;
            numPage.textContent = cardsCount;
            offForwardBtn();
        };
        cardsContainer.innerHTML= '';
        buildCards(arr[page]);
    };
});

mediaTabletList.addEventListener('change', event => {
    if (event.matches) {
        cardsCount = 8;
        rebuildArr();
        if (page >= cardsCount) {
            page = cardsCount - 1;
            numPage.textContent = cardsCount;
            offForwardBtn();
        } else onForwardBtn();
        cardsContainer.innerHTML= '';
        buildCards(arr[page]);
    };
});

mediaPhoneList.addEventListener('change', event => {
    if (event.matches) {
        cardsCount = 16;
        rebuildArr();
        if (page < cardsCount) {onForwardBtn();};
        cardsContainer.innerHTML= '';
        buildCards(arr[page]);
    };
});

// Обработчик пагинации
const btnBegin = document.querySelector('.nav_begin');
const btnPrev = document.querySelector('.nav_prev');
const numPage = document.querySelector('.num_page');
const btnNext = document.querySelector('.nav_next');
const btnEnd = document.querySelector('.nav_end');

btnNext.addEventListener('click', nextCards);
btnEnd.addEventListener('click', endCrads);
btnPrev.addEventListener('click', prevCards);
btnBegin.addEventListener('click', beginCards);
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
            <img src=${pets[arr[page][i]].img} alt=${pets[arr[page][i]].name}>
            <div class="modal-animal">
                <h3 class="animal_name">${pets[arr[page][i]].name}</h3>
                <p class="animal_type">${pets[arr[page][i]].type} - ${pets[arr[page][i]].breed}</p>
                <p class="animal_info">${pets[arr[page][i]].description}</p>
                <ul class="animal_feature">
                    <li><p><b>Age:</b> ${pets[arr[page][i]].age}</p></li>
                    <li><p><b>Inoculations:</b> ${pets[arr[page][i]].inoculations}</p></li>
                    <li><p><b>Diseases:</b> ${pets[arr[page][i]].diseases}</p></li>
                    <li><p><b>Parasites:</b> ${pets[arr[page][i]].parasites}</p></li>
                </ul>
            </div>
        </div>
    </div>`;
    document.body.appendChild(modalWindow);
}

// Обработчик модального окна
function addListnerModal() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((el, i) => {
        el.addEventListener('click', () => openModal(i))
    });
};
addListnerModal();
//-----------------------------------------------------------------