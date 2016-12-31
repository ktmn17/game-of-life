export default class View {
  constructor() {
    this.elem = document.querySelector('.window__game');

    this.length = document.querySelector('.window__input');
    this.play = document.querySelector('.window__button_play');
    this.clear = document.querySelector('.window__button_clear');

    this.delay = 500;
  }

  draw(cells) {
    this.removeChildren();

    for (let i = 0; i < cells.length; i++) {

      let row = document.createElement('div');
      row.classList.add('window__row');

      this.elem.appendChild(row);

      for (let j = 0; j < cells[i].length; j++) {
        let cell = cells[i][j];
        let elem = this.createElemCell();

        elem.onclick = () => {
          if (cell.condition == cell.alive) {
            this.makeDead(cell, elem);
          } else this.makeAlive(cell, elem);
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
    if ( this.play.textContent == 'Play' ) this.play.textContent = 'Pause';
    else this.play.textContent = 'Play';
  }

}
