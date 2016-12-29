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

    input.onblur = () => {
      clearInterval(timerId);

      input.value <= 40 ? true : input.value = 40;

      cells = model.createCells(input.value);
      view.draw(cells);
    };

    play.onclick = () => {
      clearInterval(timerId);

      cells = model.updateCells(cells);
      view.draw(cells);

      timerId = setInterval( () => {
        cells = model.updateCells(cells);
        view.draw(cells);

      }, view.delay);
    };

    pause.onclick = () => {
      clearInterval(timerId);
    };

    clear.onclick = () => {
      clearInterval(timerId);

      cells = model.createCells(input.value);
      view.draw(cells);
    };
  }
};
