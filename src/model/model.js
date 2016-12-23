export default class Cell {
  constructor() {
    this.condition = false;
    this.elem = createElemCell();
  }

  makeAlive() {
    this.condition = true;
    this.elem.classList.add('window__cell_enable');
  }

  makeDead() {
    this.condition = false;
    this.elem.classList.remove('window__cell_enable');
  }
}

function createElemCell() {
  let elem = document.createElement('div');
  elem.classList.add('window__cell');
  return elem;
};
