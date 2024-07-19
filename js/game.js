let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function startGame() {
    closeStartScreen();
    loadingScreen();
    initLevel();
    canvas = document.getElementById('canvas');
    // playBackgroundMusic();
    world = new World(canvas, keyboard);
  }

window.addEventListener('keydown', (event) => {
    if(event.keyCode == 39 || event.keyCode == 68) {
        keyboard.RIGHT = true;
    }
    if(event.keyCode == 37 || event.keyCode == 65 ) {
        keyboard.LEFT = true;
    }
    if(event.keyCode == 38) {
        keyboard.UP = true;
    }
    if(event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 69) {
        keyboard.E = true;
    }
});

window.addEventListener('keyup', (event) => {
    if(event.keyCode == 39 || event.keyCode == 68) {
        keyboard.RIGHT = false;
    }
    if(event.keyCode == 37 || event.keyCode == 65 ) {
        keyboard.LEFT = false;
    }
    if(event.keyCode == 38) {
        keyboard.UP = false;
    }
    if(event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 69) {
        keyboard.E = false;
    }
});

function fullScreen() {
    let canvas = document.getElementById('canvas');
    enterFullScreen(canvas);
}

async function loadingScreen() {
    document.getElementById('loadingScreen').classList.remove('hide');
    setTimeout(() => {
      document.getElementById('loadingScreen').classList.add('hide');
    }, 800);
  }

function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) { // Unterstützung für Firefox
        element.mozRequestFullScreen();
    }
}

function winGame() {
    document.getElementById("winGameScreen").classList.remove('d-none');
    stopGame();
    // backgroundMusic.pause();
    document.getElementById("btn-mobile-wrapper").classList.remove("btn-mobile-wrapper-800");
}

function stopGame() {
    for (let i = 1; i < 9999; i++) {
      window.clearInterval(i);
    }
}

function restartGame() {
    world = new World(canvas, keyboard);
    document.getElementById("gameOverScreen").classList.add('d-none');
    document.getElementById("winGameScreen").classList.add('d-none');
    document.getElementById("canvas").classList.remove('d-none');
    closeStartScreen();
    startGame();
}

function gameOver() {
    document.getElementById("gameOverScreen").classList.remove('d-none');
    stopGame();
    backgroundMusic.pause();
    document.getElementById("btn-mobile-wrapper").classList.remove("btn-mobile-wrapper-800");
}

function closeStartScreen() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    // document.getElementById("btn-mobile-wrapper").classList.add("btn-mobile-wrapper-800")
  }

