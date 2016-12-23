import Cell from '../model/model.js';

export default class WindowGame {
  constructor() {
    this.elem = document.querySelector('.window__game');
  }

  createArray(length) {
    let cells = [];
    for (let i = 0; i < length; i++) {
      let cellsRow = [];
      for (let j = 0; j < length; j++) {
        let currentCell = new Cell();
        cellsRow.push(currentCell);
      }

      cells.push(cellsRow);
    }
    return cells;
  }

  draw(cells) {
    this.updateCells(cells);

    for (let i = 0; i < cells.length; i++) {

      let row = document.createElement('div');
      row.classList.add('window__row');
      this.elem.appendChild(row);

      for (let j = 0; j < cells[i].length; j++) {
        let cell = cells[i][j];
        let elem = cell.elem;

        elem.onclick = function() {
          if (cell.condition == true) {
            cell.makeDead();
          } else cell.makeAlive();
        }

        if (cell.condition == true) cell.makeAlive();
        if (cell.condition == false) cell.makeDead();

        row.appendChild(elem);
      }
    }
  }

  updateCells(cells) {
    for (let i = 0; i < cells.length; i++) {

      for (let j = 0; j < cells[i].length; j++) {
        let cell = cells[i][j];
        let countTrue = this.checkNeighbors(cells, i, j);

        if (cell.condition == false) {
          if (countTrue === 3) cell.condition = true;
        }
        if (cell.condition == true) {
          if (countTrue < 2 || countTrue > 3) cell.condition = false;
        }
      }
    }
    return cells;
  }

  checkNeighbors(cells, i, j) {
    let neighbors = this.getNeighbors(cells, i, j);
    let countTrue = 0;
    for (let x = 0; x < neighbors.length; x++) {
      if ( !(neighbors[x].elem.matches('.window__cell_enable')) ) continue;
      else {
        countTrue++;
        if (countTrue > 3) return 4;
      }
    }

    return countTrue;
  }

  getNeighbors(cells, i, j) {
    let neighbors = [];
    first: for (let x = - 1; x <= 1; x++) {
      if (i + x < 0 || i + x > cells.length - 1) continue first;

      second: for (let y = -1; y <= 1; y++) {
        if (j + y < 0 || j + y > cells[i].length - 1) continue second;
        if (x == 0 && y == 0) continue second;

        neighbors.push( cells[i + x][j + y] );
      }
    }
    return neighbors;
  }

  removeChildren() {
    while (this.elem.children.length) {
      this.elem.removeChild(this.elem.children[0]);
    }
  }
}
