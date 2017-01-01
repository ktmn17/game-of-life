import View from '../view/View.js';
import Model from '../model/GameScreen.js';

export default class Controller {
  constructor() {
    this.view = new View();
    this.model = new Model();

    this.length = this.view.length;
    this.play = this.view.play;
    this.pause = this.view.pause;
    this.clear = this.view.clear;

    this.timerId;
  }

  setUpGame() {
    this.drawInitialCells();

    this.lengthHandler();
    this.playHandler();
    this.clearHandler();
  }

  lengthHandler() {
    this.length.onblur = () => {
      this.pauseGame();

      this.length.value <= 40 ? true : this.length.value = 40;

      this.drawInitialCells();
    };
  }

  playHandler() {
    this.play.onclick = () => {
      this.startGame();
    };
  }

  pauseHandler() {
    this.play.onclick = () => {
      this.pauseGame();
    };
  }

  clearHandler() {
    this.clear.onclick = () => {
      this.pauseGame();
      this.drawInitialCells();
    };
  }

  startGame() {
    this.model.gameCondition = true;
    clearInterval(this.timerId);

    this.drawUpdateCells();
    this.view.changePlayButton();
    this.pauseHandler();

    this.timerId = setInterval( () => {
      this.drawUpdateCells();

    }, this.model.delay);
  }

  pauseGame() {
    if (this.model.gameCondition) {
      this.view.changePlayButton();
      this.playHandler();
    }

    this.model.gameCondition = false;
    clearInterval(this.timerId);
  }

  drawInitialCells() {
    this.model.createCells(this.length.value);
    this.view.draw(this.model.cells);
  }

  drawUpdateCells() {
    this.model.updateCells();
    this.view.draw(this.model.cells);
  }
}
