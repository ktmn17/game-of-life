import EventEmitter from 'events';
import pug from '../main.pug';
import style from '../style.styl';

class View extends EventEmitter {
  constructor(numberOfRows) {
    super();

    document.body.innerHTML = pug({ numberOfRowsPug: numberOfRows });

    this.gameBoard = document.querySelector('.window__game');
    this.numberOfRowsInput = document.querySelector('.window__input');
    this.playButton = document.querySelector('.window__button_play');
    this.clearButton = document.querySelector('.window__button_clear');

    this.handlers();
  }

  draw(cells) {
    this.removeChildren();

    for (let i = 0; i < cells.length; i++) {
      const row = document.createElement('div');
      row.classList.add('window__row');

      this.gameBoard.appendChild(row);

      for (let j = 0; j < cells[i].length; j++) {
        const cell = cells[i][j];
        const elemCell = this.createElemCell();

        elemCell.onclick = () => {
          if (cell.isAlive) {
            this.makeDead(cell, elemCell);
          } else this.makeAlive(cell, elemCell);
        };

        if (cell.isAlive) this.makeAlive(cell, elemCell);
        else this.makeDead(cell, elemCell);

        row.appendChild(elemCell);
      }
    }
  }

  removeChildren() {
    while (this.gameBoard.children.length) {
      this.gameBoard.removeChild(this.gameBoard.children[0]);
    }
  }

  createElemCell() {
    const elemCell = document.createElement('div');
    elemCell.classList.add('window__cell');
    return elemCell;
  }

  makeAlive(cell, elemCell) {
    cell.setAlive();
    elemCell.classList.add('window__cell_enable');
  }

  makeDead(cell, elemCell) {
    cell.setDead();
    elemCell.classList.remove('window__cell_enable');
  }

  changePlayButton() {
    if (this.playButton.textContent === 'Play') this.playButton.textContent = 'Pause';
    else this.playButton.textContent = 'Play';
  }

  getNumberOfRowsInputValue() {
    return this.numberOfRowsInput.value;
  }

  changeNumberOfRowsInputValue(value) {
    this.numberOfRowsInput.value = value;
  }

  handlers() {
    document.addEventListener('DOMContentLoaded', () => this.emit('pageIsReady'));

    this.numberOfRowsInput.onblur = () => this.emit('changeRows');
    this.playButton.onclick = () => this.emit('playOrPause');
    this.clearButton.onclick = () => this.emit('clearCells');
  }
}

export default View;
