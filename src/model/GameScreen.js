import Cell from './Cell.js';

export default class Model {
  constructor() {
    this.rows = 0;
    this.cells = [];
    this.isGameActive = false; // game are in process or not
    this.delay = 500;
    this.maxRows = 40;
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
      newCell.isAlive = cell.isAlive;

      const aliveNeighbors = this.checkNeighbors(this.cells, i, j);

      if (!cell.isAlive) {
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
      if (neighbors[x].isAlive)  {
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

  restrictMaxRows(length) {
    return (length >= this.maxRows) ? this.maxRows : length;
  }
}
