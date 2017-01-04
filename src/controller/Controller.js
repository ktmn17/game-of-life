import View from '../view/View';
import Model from '../model/GameScreen';

export default class Controller {
  constructor(numberOfRows) {
    this.view = new View(numberOfRows);
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
    this.view.on('setModelCellAlive', modelCell => modelCell.setAlive());
    this.view.on('setModelCellDead', modelCell => modelCell.setDead());
  }

  setBeginGame() {
    if (this.model.gameIsActive) {
      this.pauseGame();
    }

    this.moveAndUpdateNumberOfRowsInputValueToModel();
    this.view.changeNumberOfRowsInputValue(this.model.numberOfRows);

    this.model.createCells(this.model.numberOfRows);
    this.view.draw(this.model.cells);

    return this;
  }

  toggleGameActive() {
    if (this.model.gameIsActive) this.pauseGame();
    else this.startGame();

    return this;
  }

  startGame() {
    this.model.setGameActive(true);

    clearInterval(this.playTimerId);

    this.drawUpdateCells();
    this.view.changePlayButton(this.model.gameIsActive);

    this.playTimerId = setInterval(() => {
      this.drawUpdateCells();
    }, this.model.delay);

    return this;
  }

  pauseGame() {
    this.model.setGameActive(false);
    this.view.changePlayButton(this.model.gameIsActive);

    clearInterval(this.playTimerId);

    return this;
  }

  drawUpdateCells() {
    this.model.updateCells();
    this.view.draw(this.model.cells);

    return this;
  }

  moveAndUpdateNumberOfRowsInputValueToModel() {
    this.model.numberOfRows = this.view.getNumberOfRowsInputValue();
    this.model.numberOfRows = this.model.getRestrictMaxRows(this.model.numberOfRows);

    return this;
  }
}
