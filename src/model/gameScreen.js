import Cell from './cell.js';

export default class Model {
  constructor() {

  }

  createCells(length) {
    let cells = [];

    for (let i = 0; i < length; i++) {
      let cellsRow = [];

      for (let j = 0; j < length; j++) {
        let cell = new Cell();
        cellsRow.push(cell);
      }
      cells.push(cellsRow);
    }

    return cells;
  }

  updateCells(cells) {
    let newCells = this.createCells(cells.length);

    for (let i = 0; i < cells.length; i++) {

      for (let j = 0; j < cells[i].length; j++) {
        let cell = cells[i][j];
        let newCell = newCells[i][j];
        let countTrue = this.checkNeighbors(cells, i, j);

        newCell.condition = cell.condition;

        if (cell.condition == cell.dead) {
          if (countTrue === 3) newCell.condition = newCell.alive;
        }
        if (cell.condition == cell.alive) {
          if (countTrue < 2 || countTrue > 3) newCell.condition = newCell.dead;
        }
      }
    }

    return newCells;
  }

  checkNeighbors(cells, i, j) {
    let neighbors = this.getNeighbors(cells, i, j);
    let countTrue = 0;

    for (let x = 0; x < neighbors.length; x++) {
      if ( neighbors[x].condition == neighbors[x].dead ) continue;
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
      if (i + x < 0 || i + x > cells.length - 1) continue first; // row doesnt exist

      second: for (let y = -1; y <= 1; y++) {
        if (j + y < 0 || j + y > cells[i].length - 1) continue second; // cell doesnt exist
        if (x == 0 && y == 0) continue second; // cell itself

        neighbors.push( cells[i + x][j + y] );
      }
    }

    return neighbors;
  }
}
