const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 5,
        livesRemaining: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function countDown() {
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId)
        clearInterval(state.actions.countDownTimerId)
        window.alert("Seu tempo acabou! Sua pontuação foi: " + state.values.result)
        resetGame();
    }
}

function resetGame() {
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.values.livesRemaining = 3;
    state.view.lives.textContent = state.values.livesRemaining;
    state.values.result = 0;
    state.view.score.textContent = state.values.result;

    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playAudioHit();
            } else {
                state.values.livesRemaining--;
                state.view.lives.textContent = state.values.livesRemaining;
                state.values.hitPosition = null;
                plauAudioMiss();

                if (state.values.livesRemaining <= -1) {
                    window.alert("Game over! Suas vidas esgotaram. Sua pontuação foi: " + state.values.result);
                    resetGame();
                }
            }
        })
    })
}

function playAudioHit() {
    let acertou = new Audio("../../src/audios/hit.m4a");

    acertou.volume = 0.1;
    acertou.play();
}

function plauAudioMiss() {
    let errou = new Audio("../../src/audios/miss.m4a");

    errou.volume = 0.3;
    errou.play();
}

function main() {
    addListenerHitBox();
}

main();