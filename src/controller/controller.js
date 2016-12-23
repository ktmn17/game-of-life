import View from '../view/view.js';

export default class controller {
  constructor() {
    let input = document.querySelector('.window__input');
    let play = document.querySelector('.window__button_play');
    let pause = document.querySelector('.window__button_pause');
    let clear = document.querySelector('.window__button_clear');
    let timerId;

    let gameScreen = new View();
    let cells = gameScreen.createArray(input.value);

    document.addEventListener("DOMContentLoaded", function() {
      gameScreen.draw(cells);
    });

    input.onblur = function() {
      clearInterval(timerId);

      cells = gameScreen.createArray(input.value);

      gameScreen.removeChildren();
      gameScreen.draw(cells);
    }

    play.onclick = function() {
      clearInterval(timerId);

      timerId = setInterval(function() {
        gameScreen.draw(cells);
      }, 500);
    }

    pause.onclick = function() {
      clearInterval(timerId);
    }

    clear.onclick = function() {
      clearInterval(timerId);

      let gameScreen = new View();
      cells = gameScreen.createArray(input.value);

      gameScreen.removeChildren();
      gameScreen.draw(cells);
    }
  }
}
