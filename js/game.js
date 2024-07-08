let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
    
    console.log('My Character is',world.character);
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
