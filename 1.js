let coinCount = 0;
let clickMultiplier = 1;
let currentSkin = 'FFFFFF'; // Дефолтный цвет скина

// Функция для загрузки сохраненных данных
function loadProgress() {
    const savedCoinCount = localStorage.getItem('coinCount');
    const savedClickMultiplier = localStorage.getItem('clickMultiplier');
    const savedSkin = localStorage.getItem('currentSkin');

    if (savedCoinCount !== null) {
        coinCount = parseInt(savedCoinCount, 10);
    }
    if (savedClickMultiplier !== null) {
        clickMultiplier = parseInt(savedClickMultiplier, 10);
    }
    if (savedSkin !== null) {
        currentSkin = savedSkin;
        document.getElementById('click-button').style.backgroundImage = `url('https://cdn.kasta.ua/imgw/loc/0x0/s3/brands/567_qeogvqgjo.png{currentSkin}')`;
    }

    updateCoinCount();
}

// Функция для сохранения данных
function saveProgress() {
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('clickMultiplier', clickMultiplier);
    localStorage.setItem('currentSkin', currentSkin);
}

// Функция для обновления количества Хлюпиков
function updateCoinCount() {
    document.getElementById('coin-count').innerText = coinCount;
}

// Обработчик клика на кнопку
document.getElementById('click-button').addEventListener('click', function() {
    coinCount += clickMultiplier;
    updateCoinCount();
    saveProgress(); // Сохраняем прогресс при каждом клике
});

// Обработчики кликов по предметам магазина
document.querySelectorAll('.shop-item').forEach(item => {
    item.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        const value = this.getAttribute('data-value');
        const price = parseInt(this.getAttribute('data-price'), 10);

        if (coinCount >= price) {
            coinCount -= price;
            if (type === 'skin') {
                currentSkin = value;
                document.getElementById('click-button').style.backgroundImage = `url('${this.querySelector('img').src}')`;
            } else if (type === 'upgrade') {
                clickMultiplier = parseInt(value, 10);
            }
            updateCoinCount();
            saveProgress(); // Сохраняем прогресс после покупки
        } else {
            alert('Недостаточно Хлюпиков!');
        }
    });
});

// Установка дефолтного скина на кнопку
document.getElementById('click-button').style.backgroundImage = "url('https://www.pngall.com/wp-content/uploads/4/Empty-Gold-Coin-PNG-Image.png')";

// Загружаем прогресс при запуске
loadProgress();
