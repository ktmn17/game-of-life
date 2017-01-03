import View from '../view/View';
import Model from '../model/GameScreen';

export default class Controller {
  constructor(rows) {
    this.view = new View(rows);
    this.model = new Model();

    this.playTimerId = 0;
  }

  setUpGame() {
    const setBeginGame = this.setBeginGame.bind(this);
    const toggleGameActive = this.toggleGameActive.bind(this);

    this.view.on('pageIsReady', setBeginGame);
    this.view.on('changeRows', setBeginGame);
    this.view.on('playOrPause', toggleGameActive);
    this.view.on('clearCells', setBeginGame);
  }

  setBeginGame() {
    if (this.model.isGameActive) {
      this.pauseGame();
    }

    this.moveAndUpdateLengthRowsInputValueToModel();

    this.model.createCells(this.model.rows);
    this.view.draw(this.model.cells);
  }

  toggleGameActive() {
    if (this.model.isGameActive) this.pauseGame();
    else this.startGame();
  }

  startGame() {
    this.model.isGameActive = true;

    clearInterval(this.playTimerId);

    this.drawUpdateCells();
    this.view.changePlayButton();

    this.playTimerId = setInterval(() => {
      this.drawUpdateCells();
    }, this.model.delay);
  }

  pauseGame() {
    if (this.model.isGameActive) {
      this.view.changePlayButton();
    }

    this.model.isGameActive = false;
    clearInterval(this.playTimerId);
  }

  drawUpdateCells() {
    this.model.updateCells();
    this.view.draw(this.model.cells);
  }

  moveAndUpdateLengthRowsInputValueToModel() {
    this.model.rows = this.view.getLengthRowsInputValue();
    this.model.rows = this.model.restrictMaxRows(this.model.rows);

    this.view.changeLengthRowsInputValue(this.model.rows);
  }
}
