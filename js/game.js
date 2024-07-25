let canvas;
let ctx;
let world;
let backgroundMusic = new Audio('./audio/background2.mp3');
backgroundMusic.volume = 0.2;
backgroundMusic.loop = true;
let backgroundSound = false;
let masterSound = true;


function startGame() {
    keyboard = new Keyboard();
    closeStartScreen();
    loadingScreen();
    initLevel();
    canvas = document.getElementById('canvas');
    playBackgroundMusic();
    world = new World(canvas, keyboard);
    setupMobileControls();
  }

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
    document.getElementById("gameOverScreen").classList.add('d-none');
    document.getElementById("winGameScreen").classList.add('d-none');
    document.getElementById("canvas").classList.remove('d-none');
    closeStartScreen();
    startGame();
}

function gameOver() {
    document.getElementById("gameOverScreen").classList.remove('d-none');
    stopGame();
    // backgroundMusic.pause();
    document.getElementById("btn-mobile-wrapper").classList.remove("btn-mobile-wrapper-800");
}

function closeStartScreen() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById("btn-mobile-wrapper").classList.add("btn-mobile-wrapper-800");
}

function backToMenu() {
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById("gameOverScreen").classList.add('d-none');
    document.getElementById("winGameScreen").classList.add('d-none');
    document.getElementById("canvas").classList.remove('d-none');
    document.getElementById("btn-mobile-wrapper").style.display = "none";
    // playBackgroundMusic();
  }

  function setupMobileControls() {
    document.getElementById('btnLeft').addEventListener('touchstart', () => keyboard.LEFT = true);
    document.getElementById('btnLeft').addEventListener('touchend', () => keyboard.LEFT = false);

    document.getElementById('btnRight').addEventListener('touchstart', () => keyboard.RIGHT = true);
    document.getElementById('btnRight').addEventListener('touchend', () => keyboard.RIGHT = false);

    document.getElementById('btnJump').addEventListener('touchstart', () => keyboard.SPACE = true);
    document.getElementById('btnJump').addEventListener('touchend', () => keyboard.SPACE = false);

    document.getElementById('btnThrow').addEventListener('touchstart', () => keyboard.E = true);
    document.getElementById('btnThrow').addEventListener('touchend', () => keyboard.E = false);
}

function toggleMute() {
    // masterSound = !masterSound;
    backgroundSound = !backgroundSound;
    // playBackgroundMusic();
    updateMuteIcon();
  }

  function updateMuteIcon() {
    let muteIcon = document.getElementById('muteIcon');
    if (backgroundSound) {
      muteIcon.src = './img/12_icons/sound_on.svg';
    } else {
      muteIcon.src = './img/12_icons/sound_off.svg';
    }
  }

  function playBackgroundMusic() {
    if (backgroundSound) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }


