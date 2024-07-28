let canvas;
let ctx;
let world;
let backgroundMusic = new Audio('./audio/background2.mp3');
win_audio = new Audio('./audio/win_sound.mp3');
lose_audio = new Audio('./audio/lose_sound.mp3');
backgroundMusic.volume = 0.1;
backgroundMusic.loop = true;
let backgroundSound = false;
let masterSound = true;

/**
 * Initializes the game by setting up the necessary components and starting the game loop.
 */
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

/**
 * Enters full screen mode for the canvas element.
 */
function fullScreen() {
  let canvas = document.getElementById('canvas');
  enterFullScreen(canvas);
}

/**
 * Displays a loading screen by removing the 'hide' class from the element with the id 'loadingScreen',
 */
async function loadingScreen() {
  document.getElementById('loadingScreen').classList.remove('hide');
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hide');
  }, 800);
}

/**
* Enters full screen mode for the given element.
*/
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

/**
 * Exits full screen mode if it is currently active.
 */
function exitFullScreen() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }
}

/**
 * Displays the win game screen, stops the game, pauses the background music,
 */
function winGame() {
  document.getElementById("winGameScreen").classList.remove('d-none');
  stopGame();
  backgroundMusic.pause();
  if (!masterSound) {
    win_audio.play();
  };
  document.getElementById("btn-mobile-wrapper").classList.remove("btn-mobile-wrapper-800");
  exitFullScreen();
}

/**
 * Stops all intervals by clearing them.
 */
function stopGame() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

/**
 * Restarts the game by hiding the game over and win screens, showing the canvas,
 */
function restartGame() {
  document.getElementById("gameOverScreen").classList.add('d-none');
  document.getElementById("winGameScreen").classList.add('d-none');
  document.getElementById("canvas").classList.remove('d-none');
  closeStartScreen();
  startGame();
  location.reload();
}

/**
 * Displays the game over screen, stops the game, pauses the background music,
 */
function gameOver() {
  document.getElementById("gameOverScreen").classList.remove('d-none');
  stopGame();
  if (!masterSound) {
    lose_audio.play();
  };
  backgroundMusic.pause();
  document.getElementById("btn-mobile-wrapper").classList.remove("btn-mobile-wrapper-800");
  exitFullScreen();
}

/**
 * Hides the start screen, game over screen, and canvas, and adds a class to the mobile wrapper.
 */
function closeStartScreen() {
  document.getElementById('startScreen').classList.add('d-none');
  document.getElementById('gameOverScreen').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  document.getElementById("btn-mobile-wrapper").classList.add("btn-mobile-wrapper-800");
}

/**
 * Returns the user to the start screen by hiding the game over and win screens,
 */
function backToMenu() {
  document.getElementById('startScreen').classList.remove('d-none');
  document.getElementById("gameOverScreen").classList.add('d-none');
  document.getElementById("winGameScreen").classList.add('d-none');
  document.getElementById("canvas").classList.remove('d-none');
  document.getElementById("btn-mobile-wrapper").style.display = "none";
  playBackgroundMusic();
  location.reload();
}

/**
* Sets up touch event listeners for mobile controls.
*/
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

/**
 * Toggles the mute state of the background music and updates the mute icon.
 */
function toggleMute() {
  masterSound = !masterSound;
  backgroundSound = !backgroundSound;
  playBackgroundMusic();
  updateMuteIcon();
}

/**
* Updates the mute icon based on the current state of the background sound.
*/
function updateMuteIcon() {
  let muteIcon = document.getElementById('muteIcon');
  if (backgroundSound) {
    muteIcon.innerHTML = `
          <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
          <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
        `;
  } else {
    muteIcon.innerHTML = `<path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06M6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>`;
  }
}

/**
* Plays the background music if `backgroundSound` is true, otherwise pauses it.
*/
function playBackgroundMusic() {
  if (backgroundSound) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
}


