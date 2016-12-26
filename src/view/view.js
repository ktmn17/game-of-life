export default class View {
  constructor() {
    this.elem = document.querySelector('.window__game');

    this.input = document.querySelector('.window__input');
    this.play = document.querySelector('.window__button_play');
    this.pause = document.querySelector('.window__button_pause');
    this.clear = document.querySelector('.window__button_clear');
  }

  draw(cells) {
    this.removeChildren();

    let self = this;

    for (let i = 0; i < cells.length; i++) {

      let row = document.createElement('div');
      row.classList.add('window__row');
      this.elem.appendChild(row);

      for (let j = 0; j < cells[i].length; j++) {
        let cell = cells[i][j];
        let elem = this.createElemCell();

        elem.onclick = function() {
          if (cell.condition == cell.alive) {
            self.makeDead(cell, elem);
          } else self.makeAlive(cell, elem);
        }

        if (cell.condition == cell.alive) this.makeAlive(cell, elem)
        if (cell.condition == cell.dead) this.makeDead(cell, elem)

        row.appendChild(elem);
      }
    }
  }

  createElemCell() {
    let elem = document.createElement('div');
    elem.classList.add('window__cell');
    return elem;
  }

  makeAlive(cell, elem) {
    cell.setAlive();
    elem.classList.add('window__cell_enable');
  }

  makeDead(cell, elem) {
    cell.setDead();
    elem.classList.remove('window__cell_enable');
  }

  removeChildren() {
    while (this.elem.children.length) {
      this.elem.removeChild(this.elem.children[0]);
    }
  }
}
