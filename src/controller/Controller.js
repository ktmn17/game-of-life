import View from '../view/View';
import Model from '../model/GameScreen';

export default class Controller {
  constructor() {
    this.view = new View();
    this.model = new Model();

    this.lengthInput = this.view.length;
    this.playButton = this.view.play;
    this.clearButton = this.view.clear;

    this.timerId = 0;
  }

  setUpGame() {
    this.setBeginGame();

    this.lengthInput.onblur = () => this.setBeginGame();
    this.playButton.onclick = () => this.toggleGameCondition();
    this.clearButton.onclick = () => this.setBeginGame();
  }

  toggleGameCondition() {
    if (!this.model.gameCondition) this.startGame();
    else this.pauseGame();
  }

  startGame() {
    this.model.gameCondition = true;
    clearInterval(this.timerId);

    this.drawUpdateCells();
    this.view.changePlayButton();

    this.timerId = setInterval(() => {
      this.drawUpdateCells();
    }, this.model.delay);
  }

  pauseGame() {
    if (this.model.gameCondition) {
      this.view.changePlayButton();
    }

    this.model.gameCondition = false;
    clearInterval(this.timerId);
  }

  setBeginGame() {
    if (this.model.gameCondition) {
      this.pauseGame();
    }

    this.lengthInput.value = this.model.restrictMaxlength(this.lengthInput.value);

    this.model.createCells(this.lengthInput.value);
    this.view.draw(this.model.cells);
  }

  drawUpdateCells() {
    this.model.updateCells();
    this.view.draw(this.model.cells);
  }
}
