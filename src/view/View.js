import EventEmitter from 'events';
import pug from '../main.pug';
import style from '../style.styl';

class View extends EventEmitter {
  constructor(numberOfRows) {
    super();

    document.body.innerHTML = pug({ numberOfRows });

    this.gameBoard = document.querySelector('.window__game');
    this.numberOfRowsInput = document.querySelector('.window__input');
    this.playButton = document.querySelector('.window__button_play');
    this.clearButton = document.querySelector('.window__button_clear');

    this.initialHandlers();
  }

  draw(cells) {
    this.removeChildren();

    cells.forEach((row) => {
      const elemRow = View.createElemRow();
      this.gameBoard.appendChild(elemRow);

      row.forEach((modelCell) => {
        const elemCell = View.createElemCell();
        elemCell.onclick = () => this.toogleCell(modelCell, elemCell);

        if (modelCell.isAlive) this.makeAlive(modelCell, elemCell);
        else this.makeDead(modelCell, elemCell);

        elemRow.appendChild(elemCell);
      });
    });
  }

  changePlayButton(isGameActive) {
    if (isGameActive) this.playButton.textContent = 'Pause';
    else this.playButton.textContent = 'Play';
  }

  getNumberOfRowsInputValue() {
    return this.numberOfRowsInput.value;
  }

  changeNumberOfRowsInputValue(value) {
    this.numberOfRowsInput.value = value;
  }

  removeChildren() {
    while (this.gameBoard.children.length) {
      this.gameBoard.removeChild(this.gameBoard.children[0]);
    }
  }

  initialHandlers() {
    document.addEventListener('DOMContentLoaded', () => this.emit('pageIsReady'));

    this.numberOfRowsInput.onblur = () => this.emit('changeRows');
    this.playButton.onclick = () => this.emit('playOrPause');
    this.clearButton.onclick = () => this.emit('clearCells');
  }

  toogleCell(modelCell, elemCell) {
    if (modelCell.isAlive) this.makeDead(modelCell, elemCell);
    else this.makeAlive(modelCell, elemCell);
  }

  makeAlive(modelCell, elemCell) {
    this.emit('setModelCellAlive', modelCell);
    elemCell.classList.add('window__cell_enable');
  }

  makeDead(modelCell, elemCell) {
    this.emit('setModelCellDead', modelCell);
    elemCell.classList.remove('window__cell_enable');
  }

  static createElemRow() {
    const elemRow = document.createElement('div');
    elemRow.classList.add('window__row');
    return elemRow;
  }

  static createElemCell() {
    const elemCell = document.createElement('div');
    elemCell.classList.add('window__cell');
    return elemCell;
  }
}

export default View;
