class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false; // Springen
    UP = false; // Springen
    E = false; // Werfen
    A = false; // Bewege nach links
    D = false; // Bewege nach rechts
  
    constructor() {
      this.bindKeyPressEvents();
      this.bindButtonPressEvents();
    }
  
    /**
     * Binds key press events to set keyboard properties based on key codes.
     */
    bindKeyPressEvents() {
      window.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
          case 37: // LEFT arrow
          case 65: // A key
            this.LEFT = true;
            break;
          case 39: // RIGHT arrow
          case 68: // D key
            this.RIGHT = true;
            break;
          case 32: // SPACE key
          case 38: // UP arrow
            this.SPACE = true; // Springen
            break;
          case 69: // E key
            this.E = true; // Werfen
            break;
        }
      });
  
      window.addEventListener('keyup', (e) => {
        switch (e.keyCode) {
          case 37: // LEFT arrow
          case 65: // A key
            this.LEFT = false;
            break;
          case 39: // RIGHT arrow
          case 68: // D key
            this.RIGHT = false;
            break;
          case 32: // SPACE key
          case 38: // UP arrow
            this.SPACE = false; // Springen
            break;
          case 69: // E key
            this.E = false; // Werfen
            break;
        }
      });
    }
  
    /**
     * Binds touch press events to the corresponding buttons.
     */
    bindButtonPressEvents() {
      document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.LEFT = true;
      });
  
      document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        this.LEFT = false;
      });
  
      document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.RIGHT = true;
      });
  
      document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        this.RIGHT = false;
      });
  
      document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.SPACE = true; // Dieser Button simuliert den Sprung
        this.UP = true; // Dieser Button simuliert den Sprung zusätzlich
      });
  
      document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        this.SPACE = false; // Dieser Button simuliert den Sprung
        this.UP = false; // Dieser Button simuliert den Sprung zusätzlich
      });
  
      document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.E = true; // Dieser Button simuliert das Werfen
      });
  
      document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        this.E = false; // Dieser Button simuliert das Werfen
      });
    }
  }
  
  