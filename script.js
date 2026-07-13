"use strict";


/* =========================
   50 ПРИЧИН ЛЮБВИ
========================= */

const reasons = [
    "твою заботу",
    "твою прекрасную улыбку",
    "твою доброту",
    "то, как ты меня поддерживаешь",
    "твой милый смех",
    "наши долгие разговоры",
    "твою искренность",
    "твои тёплые объятия",
    "то, что рядом с тобой спокойно",
    "наши общие воспоминания",

    "то, что ты веришь в меня",
    "твою нежность",
    "твой особенный характер",
    "твоё чувство юмора",
    "то, как ты радуешься мелочам",
    "то, что с тобой я могу быть собой",
    "твои милые привычки",
    "каждый момент рядом с тобой",
    "то, что ты делаешь мою жизнь лучше",
    "Твой неповторимый запах",

    "твой прекрасный взгляд",
    "то, как ты держишь меня за руку",
    "твой голос",
    "то, как ты умеешь меня успокоить",
    "наши совместные прогулки",
    "твои сообщения",
    "то, как ты скучаешь по мне",
    "то, как ты умеешь слушать",
    "твои прекрасные глаза",
    "то, как ты вдохновляешь меня",

    "твою честность",
    "твою верность",
    "то, как ты умеешь создавать уют",
    "твою красоту",
    "твою внутреннюю силу",
    "то, как ты заботишься о близких",
    "наши планы на будущее",
    "то, как ты смотришь на меня",
    "то, как ты делаешь обычные дни особенными",
    "то, что у тебя самая красивая попа в мире",

    "твои неожиданные милые поступки",
    "то, как ты понимаешь меня без слов",
    "То, как ты принимаешь все близко к сердцу",
    "то, как ты смеёшься над моими шутками",
    "твоё терпение",
    "то, как ты радуешься нашим встречам",
    "каждую нашу фотографию",
    "то, что ты всегда остаёшься собой",
    "все моменты, которые ещё ждут нас впереди",
    "то, что именно ты появилась в моей жизни"
];


/* =========================
   ЭКРАНЫ
========================= */

const heroScreen =
    document.getElementById("heroScreen");

const reasonsScreen =
    document.getElementById("reasonsScreen");

const gameIntroScreen =
    document.getElementById("gameIntroScreen");

const gameScreen =
    document.getElementById("gameScreen");


/* =========================
   КНОПКИ НАВИГАЦИИ
========================= */

const showReasonsButton =
    document.getElementById("showReasonsButton");

const backToHeroButton =
    document.getElementById("backToHeroButton");

const goToGameButton =
    document.getElementById("goToGameButton");

const backToReasonsButton =
    document.getElementById("backToReasonsButton");

const openGameButton =
    document.getElementById("openGameButton");

const backToGameIntroButton =
    document.getElementById("backToGameIntroButton");

const returnToReasonsAfterGameButton =
    document.getElementById(
        "returnToReasonsAfterGameButton"
    );


/* =========================
   ПРИЧИНЫ
========================= */

const heartsGrid =
    document.getElementById("heartsGrid");

const progressText =
    document.getElementById("progressText");

let openedHearts = 0;


/* =========================
   ЭЛЕМЕНТЫ ИГРЫ
========================= */

const gameArea =
    document.getElementById("gameArea");

const player =
    document.getElementById("player");

const timerElement =
    document.getElementById("timer");

const scoreElement =
    document.getElementById("score");

const comboElement =
    document.getElementById("combo");

const livesElement =
    document.getElementById("lives");

const levelText =
    document.getElementById("levelText");

const difficultyFill =
    document.getElementById("difficultyFill");

const gameMessage =
    document.getElementById("gameMessage");

const startGameButton =
    document.getElementById("startGameButton");

const playAgainButton =
    document.getElementById("playAgainButton");

const resultCard =
    document.getElementById("resultCard");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const finalScore =
    document.getElementById("finalScore");

const moveLeftButton =
    document.getElementById("moveLeftButton");

const moveRightButton =
    document.getElementById("moveRightButton");


/* =========================
   СОСТОЯНИЕ ИГРЫ
========================= */

let score = 0;
let timeLeft = 30;
let lives = 3;

let comboCount = 0;
let comboMultiplier = 1;

let missedHearts = 0;
let elapsedSeconds = 0;
let difficultyLevel = 1;

let gameRunning = false;
let playerX = 0;

let spawnInterval = null;
let timerInterval = null;

const activeAnimationFrames =
    new Set();


/* =========================
   ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
========================= */

function showScreen(screenToShow) {
    const screens = [
        heroScreen,
        reasonsScreen,
        gameIntroScreen,
        gameScreen
    ];

    screens.forEach((screen) => {
        screen.classList.add("hidden");
    });

    screenToShow.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


showReasonsButton.addEventListener(
    "click",
    () => {
        showScreen(reasonsScreen);
    }
);


backToHeroButton.addEventListener(
    "click",
    () => {
        showScreen(heroScreen);
    }
);


goToGameButton.addEventListener(
    "click",
    () => {
        showScreen(gameIntroScreen);
    }
);


backToReasonsButton.addEventListener(
    "click",
    () => {
        showScreen(reasonsScreen);
    }
);


openGameButton.addEventListener(
    "click",
    () => {
        resetGame();

        showScreen(gameScreen);

        setTimeout(() => {
            resetPlayerPosition();
        }, 50);
    }
);


backToGameIntroButton.addEventListener(
    "click",
    () => {
        resetGame();

        showScreen(gameIntroScreen);
    }
);


returnToReasonsAfterGameButton.addEventListener(
    "click",
    () => {
        resetGame();

        showScreen(reasonsScreen);
    }
);


/* =========================
   СОЗДАНИЕ ПРИЧИН
========================= */

function createReasonCards() {
    heartsGrid.innerHTML = "";

    reasons.forEach((reason, index) => {
        const card =
            document.createElement("div");

        card.classList.add("heart-card");

        card.setAttribute(
            "aria-label",
            `Причина номер ${index + 1}`
        );

        card.innerHTML = `
            <div class="heart-inner">

                <div class="heart-front">
                    ❤️
                </div>

                <div class="heart-back">
                    ${reason}
                </div>

            </div>
        `;

        card.addEventListener(
            "click",
            () => {
                openReasonCard(card);
            }
        );

        heartsGrid.appendChild(card);
    });

    updateReasonsProgress();
}


function openReasonCard(card) {
    if (card.classList.contains("open")) {
        return;
    }

    card.classList.add("open");

    openedHearts++;

    updateReasonsProgress();

    if (openedHearts === reasons.length) {
        goToGameButton.classList.remove("hidden");
    }
}


function updateReasonsProgress() {
    progressText.textContent =
        `Открыто: ${openedHearts} из ${reasons.length}`;
}


createReasonCards();


/* =========================
   СЕРДЕЧКИ НА ФОНЕ
========================= */

function createBackgroundHearts() {
    const background =
        document.getElementById(
            "backgroundHearts"
        );

    const symbols = [
        "♡",
        "♥",
        "♡",
        "♥"
    ];

    for (let i = 0; i < 20; i++) {
        const heart =
            document.createElement("span");

        heart.classList.add(
            "background-heart"
        );

        const symbolIndex =
            Math.floor(
                Math.random() *
                symbols.length
            );

        heart.textContent =
            symbols[symbolIndex];

        const size =
            18 + Math.random() * 35;

        const left =
            Math.random() * 100;

        const duration =
            12 + Math.random() * 14;

        const delay =
            Math.random() * -20;

        heart.style.fontSize =
            `${size}px`;

        heart.style.left =
            `${left}%`;

        heart.style.animationDuration =
            `${duration}s`;

        heart.style.animationDelay =
            `${delay}s`;

        background.appendChild(heart);
    }
}


createBackgroundHearts();


/* =========================
   ПОЛОЖЕНИЕ ПЕРСОНАЖА
========================= */

function resetPlayerPosition() {
    const areaWidth =
        gameArea.clientWidth;

    const playerWidth =
        player.offsetWidth;

    playerX =
        areaWidth / 2 -
        playerWidth / 2;

    player.style.left =
        `${playerX}px`;
}


function movePlayerByAmount(amount) {
    if (!gameRunning) {
        return;
    }

    const maxX =
        gameArea.clientWidth -
        player.offsetWidth;

    playerX += amount;

    playerX =
        Math.max(
            0,
            Math.min(playerX, maxX)
        );

    player.style.left =
        `${playerX}px`;
}


function movePlayerTo(clientX) {
    if (!gameRunning) {
        return;
    }

    const gameRect =
        gameArea.getBoundingClientRect();

    const playerWidth =
        player.offsetWidth;

    const maxX =
        gameArea.clientWidth -
        playerWidth;

    let newX =
        clientX -
        gameRect.left -
        playerWidth / 2;

    newX =
        Math.max(
            0,
            Math.min(newX, maxX)
        );

    playerX = newX;

    player.style.left =
        `${playerX}px`;
}


/* Клавиатура */

document.addEventListener(
    "keydown",
    (event) => {
        if (!gameRunning) {
            return;
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();

            movePlayerByAmount(-42);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();

            movePlayerByAmount(42);
        }
    }
);


/* Мышка */

gameArea.addEventListener(
    "mousemove",
    (event) => {
        movePlayerTo(event.clientX);
    }
);


/* Телефон */

gameArea.addEventListener(
    "touchstart",
    (event) => {
        event.preventDefault();

        const touch =
            event.touches[0];

        movePlayerTo(touch.clientX);
    },
    {
        passive: false
    }
);


gameArea.addEventListener(
    "touchmove",
    (event) => {
        event.preventDefault();

        const touch =
            event.touches[0];

        movePlayerTo(touch.clientX);
    },
    {
        passive: false
    }
);


/* Кнопки управления */

moveLeftButton.addEventListener(
    "click",
    () => {
        movePlayerByAmount(-55);
    }
);


moveRightButton.addEventListener(
    "click",
    () => {
        movePlayerByAmount(55);
    }
);


/* =========================
   ЗАПУСК ИГРЫ
========================= */

startGameButton.addEventListener(
    "click",
    startGame
);


playAgainButton.addEventListener(
    "click",
    startGame
);


function startGame() {
    /*
        Сначала выполняется полный сброс.
        Благодаря этому повторный запуск
        не создаёт дополнительные интервалы.
    */

    resetGameState();

    gameRunning = true;

    resultCard.classList.add("hidden");
    startGameButton.classList.add("hidden");
    gameMessage.classList.add("hidden");

    resetPlayerPosition();
    updateGameInterface();

    createSpawnInterval();

    timerInterval =
        setInterval(() => {
            updateGameTimer();
        }, 1000);
}


/* =========================
   ИНТЕРВАЛ ПОЯВЛЕНИЯ ОБЪЕКТОВ
========================= */

function createSpawnInterval() {
    clearInterval(spawnInterval);

    const spawnDelay =
        getSpawnDelay();

    spawnInterval =
        setInterval(() => {
            createFallingObject();
        }, spawnDelay);
}


function getSpawnDelay() {
    if (difficultyLevel === 1) {
        return 650;
    }

    if (difficultyLevel === 2) {
        return 530;
    }

    if (difficultyLevel === 3) {
        return 430;
    }

    return 350;
}


/* =========================
   ТАЙМЕР И СЛОЖНОСТЬ
========================= */

function updateGameTimer() {
    if (!gameRunning) {
        return;
    }

    timeLeft--;
    elapsedSeconds++;

    if (
        elapsedSeconds === 10 ||
        elapsedSeconds === 20 ||
        elapsedSeconds === 30
    ) {
        increaseDifficulty();
    }

    updateGameInterface();

    if (timeLeft <= 0) {
        finishGame("time");
    }
}


function increaseDifficulty() {
    difficultyLevel =
        Math.min(
            difficultyLevel + 1,
            4
        );

    createSpawnInterval();

    updateGameInterface();
}


/* =========================
   СОЗДАНИЕ ПАДАЮЩИХ ОБЪЕКТОВ
========================= */

function createFallingObject() {
    if (!gameRunning) {
        return;
    }

    const object =
        document.createElement("div");

    object.classList.add(
        "falling-object"
    );

    const objectData =
        chooseObjectType();

    object.textContent =
        objectData.icon;

    object.dataset.type =
        objectData.type;

    object.dataset.value =
        String(objectData.value);

    if (objectData.type === "bomb") {
        object.classList.add(
            "bomb-object"
        );
    }

    if (objectData.type === "time") {
        object.classList.add(
            "time-object"
        );
    }

    const maximumLeft =
        Math.max(
            0,
            gameArea.clientWidth - 58
        );

    const startX =
        Math.random() * maximumLeft;

    object.style.left =
        `${startX}px`;

    gameArea.appendChild(object);

    animateFallingObject(
        object,
        objectData
    );
}


function chooseObjectType() {
    const random =
        Math.random();

    /*
        На высоких уровнях вероятность
        появления бомб увеличивается.
    */

    const bombChance =
        0.08 +
        difficultyLevel * 0.025;

    const timeChance = 0.05;

    if (random < bombChance) {
        return {
            type: "bomb",
            icon: "💣",
            value: 0
        };
    }

    if (
        random <
        bombChance + timeChance
    ) {
        return {
            type: "time",
            icon: "⏰",
            value: 3
        };
    }

    if (random < 0.22) {
        return {
            type: "gold",
            icon: "💛",
            value: 5
        };
    }

    if (random < 0.42) {
        return {
            type: "rare",
            icon: "💖",
            value: 3
        };
    }

    return {
        type: "normal",
        icon: "❤️",
        value: 1
    };
}


/* =========================
   ДВИЖЕНИЕ ОБЪЕКТА
========================= */

function animateFallingObject(
    object,
    objectData
) {
    let objectY = -75;

    const baseSpeed =
        2.3 +
        difficultyLevel * 0.7;

    const randomSpeed =
        Math.random() * 1.6;

    const fallSpeed =
        baseSpeed + randomSpeed;


    function fall() {
        if (
            !gameRunning ||
            !object.isConnected
        ) {
            object.remove();

            return;
        }

        objectY += fallSpeed;

        object.style.top =
            `${objectY}px`;

        if (
            checkCollision(
                object,
                player
            )
        ) {
            handleCaughtObject(
                object,
                objectData
            );

            return;
        }

        if (
            objectY >
            gameArea.clientHeight
        ) {
            handleMissedObject(
                object,
                objectData
            );

            return;
        }

        const animationId =
            requestAnimationFrame(fall);

        activeAnimationFrames.add(
            animationId
        );
    }


    const initialAnimationId =
        requestAnimationFrame(fall);

    activeAnimationFrames.add(
        initialAnimationId
    );
}


/* =========================
   ПОЙМАННЫЙ ОБЪЕКТ
========================= */

function handleCaughtObject(
    object,
    objectData
) {
    const objectRect =
        object.getBoundingClientRect();

    const areaRect =
        gameArea.getBoundingClientRect();

    const effectX =
        objectRect.left -
        areaRect.left +
        objectRect.width / 2;

    const effectY =
        objectRect.top -
        areaRect.top;


    if (objectData.type === "bomb") {
        lives--;

        resetCombo();

        showFloatingText(
            "−1 жизнь",
            effectX,
            effectY
        );

        createParticles(
            effectX,
            effectY,
            true
        );

        shakeGameArea();

        object.remove();

        updateGameInterface();

        if (lives <= 0) {
            finishGame("lives");
        }

        return;
    }


    if (objectData.type === "time") {
        timeLeft += 3;

        showFloatingText(
            "+3 сек",
            effectX,
            effectY
        );

        createParticles(
            effectX,
            effectY,
            false
        );

        object.remove();

        updateGameInterface();

        return;
    }


    comboCount++;

    updateComboMultiplier();

    const earnedPoints =
        objectData.value *
        comboMultiplier;

    score += earnedPoints;

    missedHearts = 0;

    showFloatingText(
        `+${earnedPoints}`,
        effectX,
        effectY
    );

    createParticles(
        effectX,
        effectY,
        false
    );

    object.remove();

    updateGameInterface();
}


/* =========================
   ПРОПУЩЕННЫЙ ОБЪЕКТ
========================= */

function handleMissedObject(
    object,
    objectData
) {
    object.remove();

    if (
        objectData.type === "normal" ||
        objectData.type === "rare" ||
        objectData.type === "gold"
    ) {
        missedHearts++;

        if (missedHearts >= 3) {
            resetCombo();

            missedHearts = 0;

            updateGameInterface();
        }
    }
}


/* =========================
   КОМБО
========================= */

function updateComboMultiplier() {
    if (comboCount >= 15) {
        comboMultiplier = 4;

        return;
    }

    if (comboCount >= 10) {
        comboMultiplier = 3;

        return;
    }

    if (comboCount >= 5) {
        comboMultiplier = 2;

        return;
    }

    comboMultiplier = 1;
}


function resetCombo() {
    comboCount = 0;
    comboMultiplier = 1;
}


/* =========================
   СТОЛКНОВЕНИЕ
========================= */

function checkCollision(
    firstElement,
    secondElement
) {
    const firstRect =
        firstElement.getBoundingClientRect();

    const secondRect =
        secondElement.getBoundingClientRect();

    /*
        Столкновение считается с корзиной,
        поэтому верх персонажа немного сужен.
    */

    return !(
        firstRect.bottom <
            secondRect.top + 60 ||

        firstRect.top >
            secondRect.bottom ||

        firstRect.right <
            secondRect.left + 10 ||

        firstRect.left >
            secondRect.right - 10
    );
}


/* =========================
   ВИЗУАЛЬНЫЕ ЭФФЕКТЫ
========================= */

function showFloatingText(
    text,
    x,
    y
) {
    const element =
        document.createElement("div");

    element.classList.add(
        "floating-score"
    );

    element.textContent = text;

    element.style.left =
        `${x - 25}px`;

    element.style.top =
        `${y}px`;

    gameArea.appendChild(element);

    setTimeout(() => {
        element.remove();
    }, 800);
}


function createParticles(
    x,
    y,
    isDanger
) {
    for (let i = 0; i < 9; i++) {
        const particle =
            document.createElement("span");

        particle.classList.add(
            "particle"
        );

        if (isDanger) {
            particle.style.background =
                "#4f3a48";
        }

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            25 + Math.random() * 45;

        const particleX =
            Math.cos(angle) *
            distance;

        const particleY =
            Math.sin(angle) *
            distance;

        particle.style.left =
            `${x}px`;

        particle.style.top =
            `${y}px`;

        particle.style.setProperty(
            "--particle-x",
            `${particleX}px`
        );

        particle.style.setProperty(
            "--particle-y",
            `${particleY}px`
        );

        gameArea.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 700);
    }
}


function shakeGameArea() {
    gameArea.classList.remove("shake");

    void gameArea.offsetWidth;

    gameArea.classList.add("shake");

    setTimeout(() => {
        gameArea.classList.remove("shake");
    }, 400);
}


/* =========================
   ИНТЕРФЕЙС
========================= */

function updateGameInterface() {
    timerElement.textContent =
        String(
            Math.max(0, timeLeft)
        );

    scoreElement.textContent =
        String(score);

    comboElement.textContent =
        `x${comboMultiplier}`;

    livesElement.textContent =
        "❤️".repeat(
            Math.max(0, lives)
        ) +
        "♡".repeat(
            Math.max(0, 3 - lives)
        );

    updateDifficultyInterface();
}


function updateDifficultyInterface() {
    const levels = {
        1: {
            name: "Нежный",
            width: "25%"
        },

        2: {
            name: "Романтичный",
            width: "50%"
        },

        3: {
            name: "Страстный",
            width: "75%"
        },

        4: {
            name: "Безумная любовь",
            width: "100%"
        }
    };

    const currentLevel =
        levels[difficultyLevel];

    levelText.textContent =
        currentLevel.name;

    difficultyFill.style.width =
        currentLevel.width;
}


/* =========================
   ЗАВЕРШЕНИЕ ИГРЫ
========================= */

function finishGame(reason) {
    if (!gameRunning) {
        return;
    }

    gameRunning = false;

    clearGameIntervals();
    cancelGameAnimations();
    removeGameObjects();

    finalScore.textContent =
        String(score);

    if (reason === "lives") {
        resultTitle.textContent =
            "Жизни закончились!";
    } else {
        resultTitle.textContent =
            "Время закончилось!";
    }

    resultText.textContent =
        createResultMessage(score);

    resultCard.classList.remove("hidden");
    startGameButton.classList.add("hidden");

    gameMessage.classList.add("hidden");
}


function createResultMessage(finalResult) {
    if (finalResult >= 150) {
        return (
            "Ты поймала невероятно много сердечек! " +
            "Это результат настоящей чемпионки любви."
        );
    }

    if (finalResult >= 100) {
        return (
            "Прекрасный результат! Ты почти не дала " +
            "ни одному сердечку пролететь мимо."
        );
    }

    if (finalResult >= 60) {
        return (
            "Ты отлично ловишь мою любовь. " +
            "Каждое сердечко теперь принадлежит тебе."
        );
    }

    if (finalResult >= 30) {
        return (
            "Хороший результат! Главное, что все " +
            "пойманные сердечки были только для тебя."
        );
    }

    return (
        "Неважно, сколько сердечек удалось поймать. " +
        "Моя любовь всё равно бесконечна."
    );
}


/* =========================
   ПОЛНЫЙ СБРОС ИГРЫ
========================= */

function resetGame() {
    gameRunning = false;

    clearGameIntervals();
    cancelGameAnimations();
    removeGameObjects();

    resetGameState();

    resultCard.classList.add("hidden");
    startGameButton.classList.remove("hidden");
    gameMessage.classList.remove("hidden");

    updateGameInterface();

    setTimeout(() => {
        resetPlayerPosition();
    }, 50);
}


function resetGameState() {
    gameRunning = false;

    score = 0;
    timeLeft = 30;
    lives = 3;

    comboCount = 0;
    comboMultiplier = 1;

    missedHearts = 0;
    elapsedSeconds = 0;
    difficultyLevel = 1;

    clearGameIntervals();
    cancelGameAnimations();
    removeGameObjects();

    updateGameInterface();
}


function clearGameIntervals() {
    clearInterval(spawnInterval);
    clearInterval(timerInterval);

    spawnInterval = null;
    timerInterval = null;
}


function cancelGameAnimations() {
    activeAnimationFrames.forEach(
        (animationId) => {
            cancelAnimationFrame(
                animationId
            );
        }
    );

    activeAnimationFrames.clear();
}


function removeGameObjects() {
    document
        .querySelectorAll(
            ".falling-object, " +
            ".floating-score, " +
            ".particle"
        )
        .forEach((element) => {
            element.remove();
        });
}


/* =========================
   ИЗМЕНЕНИЕ РАЗМЕРА ЭКРАНА
========================= */

window.addEventListener(
    "resize",
    () => {
        if (
            !gameScreen.classList.contains(
                "hidden"
            )
        ) {
            resetPlayerPosition();
        }
    }
);


/* Начальное состояние */

resetGame();