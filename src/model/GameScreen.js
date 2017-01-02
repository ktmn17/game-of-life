import Cell from './Cell.js';

export default class Model {
  constructor() {
    this.cells = [];
    this.gameCondition = false; // game are in process or not
    this.delay = 500;
    this.maxLength = 40;
  }

  createCells(length) {
    const cells = [];

    for (let i = 0; i < length; i++) {
      const cellsRow = [];

      for (let j = 0; j < length; j++) {
        const cell = new Cell();
        cellsRow.push(cell);
      }
      cells.push(cellsRow);
    }

    this.cells = cells;
  }

  updateCells() {
    const newCells = this.cells.map((row, i) => row.map((cell, j) => {
      const newCell = new Cell();
      newCell.condition = cell.condition;

      const aliveNeighbors = this.checkNeighbors(this.cells, i, j);

      if (cell.condition == cell.dead) {
        if (aliveNeighbors === 3) newCell.setAlive();
      } else if (aliveNeighbors < 2 || aliveNeighbors > 3) newCell.setDead();

      return newCell;
    }));

    this.cells = newCells;
  }

  checkNeighbors(cells, i, j) {
    const neighbors = this.getNeighbors(cells, i, j);
    let aliveNeighbors = 0;

    for (let x = 0; x < neighbors.length; x++) {
      if (neighbors[x].condition == neighbors[x].dead) continue;
      else {
        aliveNeighbors++;
        if (aliveNeighbors > 3) return 4;
      }
    }

    return aliveNeighbors;
  }

  getNeighbors(cells, i, j) {
    const neighbors = [];

    first: for (let x = -1; x <= 1; x++) {
      if (i + x < 0 || i + x > cells.length - 1) continue first; // row doesnt exist

      second: for (let y = -1; y <= 1; y++) {
        if (j + y < 0 || j + y > cells[i].length - 1) continue second; // cell doesnt exist
        if (x == 0 && y == 0) continue second; // cell itself

        neighbors.push(cells[i + x][j + y]);
      }
    }

    return neighbors;
  }

  restrictMaxlength(length) {
    return (length >= this.maxLength) ? this.maxLength : length;
  }
}
