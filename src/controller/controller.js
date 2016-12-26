import View from '../view/view.js';
import Model from '../model/gameScreen.js';

export default class Controller {
  constructor() {
    let view = new View();
    let model = new Model();

    let input = view.input;
    let play = view.play;
    let pause = view.pause;
    let clear = view.clear;
    let timerId;

    let cells = model.createCells(input.value);

    document.addEventListener("DOMContentLoaded", function() {
      view.draw(cells);
    });

    input.onblur = function() {
      clearInterval(timerId);

      cells = model.createCells(input.value);  

      view.draw(cells);
    }

    play.onclick = function() {
      clearInterval(timerId);

      timerId = setInterval(function() {
        cells = model.updateCells(cells);

        view.draw(cells);
      }, 500);
    }

    pause.onclick = function() {
      clearInterval(timerId);
    }

    clear.onclick = function() {
      clearInterval(timerId);

      cells = model.createCells(input.value);

      view.draw(cells);
    }
  }
}
