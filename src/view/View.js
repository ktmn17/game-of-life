import pug from '../main.pug';
import style from '../style.styl';

export default class View {
  constructor() {
    document.body.innerHTML = pug();

    this.elem = document.querySelector('.window__game');
    this.length = document.querySelector('.window__input');
    this.play = document.querySelector('.window__button_play');
    this.clear = document.querySelector('.window__button_clear');
  }

  draw(cells) {
    this.removeChildren();

    for (let i = 0; i < cells.length; i++) {
      const row = document.createElement('div');
      row.classList.add('window__row');

      this.elem.appendChild(row);

      for (let j = 0; j < cells[i].length; j++) {
        const cell = cells[i][j];
        const elem = this.createElemCell();

        elem.onclick = () => {
          if (cell.condition == cell.alive) {
            this.makeDead(cell, elem);
          } else this.makeAlive(cell, elem);
        };

        if (cell.condition == cell.alive) this.makeAlive(cell, elem);
        if (cell.condition == cell.dead) this.makeDead(cell, elem);

        row.appendChild(elem);
      }
    }
  }

  createElemCell() {
    const elem = document.createElement('div');
    elem.classList.add('window__cell');
    return elem;
  }

  removeChildren() {
    while (this.elem.children.length) {
      this.elem.removeChild(this.elem.children[0]);
    }
  }

  makeAlive(cell, elem) {
    cell.setAlive();
    elem.classList.add('window__cell_enable');
  }

  makeDead(cell, elem) {
    cell.setDead();
    elem.classList.remove('window__cell_enable');
  }

  changePlayButton() {
    if (this.play.textContent == 'Play') this.play.textContent = 'Pause';
    else this.play.textContent = 'Play';
  }
}
