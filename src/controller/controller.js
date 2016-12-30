import View from '../view/view.js';
import Model from '../model/gameScreen.js';

export default class Controller {
  constructor() {
    this.view = new View();
    this.model = new Model();

    this.length = this.view.length;
    this.play = this.view.play;
    this.pause = this.view.pause;
    this.clear = this.view.clear;

    this.timerId;
    this.cells;
  }

  startGame() {
    document.addEventListener("DOMContentLoaded", () => {
      this.drawInitialCells();
    });

    this.lengthHandler();
    this.playHandler();
    this.pauseHandler();
    this.clearHandler();
  }

  lengthHandler() {
    this.length.onblur = () => {
      clearInterval(this.timerId);

      this.length.value <= 40 ? true : this.length.value = 40;

      this.drawInitialCells();
    };
  }

  playHandler() {
    this.play.onclick = () => {
      clearInterval(this.timerId);

      this.drawUpdateCells();

      this.timerId = setInterval( () => {
        this.drawUpdateCells();

      }, this.view.delay);
    };
  }

  pauseHandler() {
    this.pause.onclick = () => {
      clearInterval(this.timerId);
    };
  }

  clearHandler() {
    this.clear.onclick = () => {
      clearInterval(this.timerId);

      this.drawInitialCells();
    };
  }

  drawInitialCells() {
    this.cells = this.model.createCells(this.length.value);
    this.view.draw(this.cells);
  }

  drawUpdateCells() {
    this.cells = this.model.updateCells(this.cells);
    this.view.draw(this.cells);
  }
}
