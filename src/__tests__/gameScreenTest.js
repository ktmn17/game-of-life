import assert from 'assert';
import Model from '../model/gameScreen.js';

let model = new Model();

describe('model gameScreen', function() {

  it('create cells', function() {

    let cells = model.createCells(5);
    assert.equal( cells[0][0].condition, cells[0][0].dead, 'doesnt create the first cell' );
    assert.equal( cells[4][4].condition, cells[4][4].dead, 'doesnt create the last cell' );
  });

  it('return neighboors of cell', function() {

    let cells = model.createCells(5);

    let neighbors = model.getNeighbors(cells, 0, 0);
    assert.equal( neighbors[0], cells[0][1], 'the first neighbor of the first cell doesnt right' );
    assert.equal( neighbors.length, 3, 'the amount of the neighbors of the first cell doesnt right' );

    neighbors = model.getNeighbors(cells, 2, 2);
    assert.equal( neighbors[0], cells[1][1], 'the first neighbor of the center cell doesnt right' );
    assert.equal( neighbors.length, 8, 'the amount of the neighbors of the center cell doesnt right' );

    neighbors = model.getNeighbors(cells, 4, 4);
    assert.equal( neighbors[0], cells[3][3], 'the first neighbor of the last cell doesnt right' );
    assert.equal( neighbors.length, 3, 'the amount of the neighbors of the last cell doesnt right' );
  });

  it('return amount of neighbors with alive condition', function() {

    let cells = model.createCells(5);

    cells[1][1].setAlive();
    cells[1][3].setAlive();
    cells[3][2].setAlive();

    let countTrue = model.checkNeighbors(cells, 1, 2);
    assert.equal( countTrue, 2, 'the amount of the alive neighbors doesnt right of the cell with 2 alive neighbors' );

    countTrue = model.checkNeighbors(cells, 2, 2);
    assert.equal( countTrue, 3, 'the amount of the alive neighbors doesnt right of the cell with 3 alive neighbors' );

    countTrue = model.checkNeighbors(cells, 4, 4);
    assert.equal( countTrue, 0, 'the amount of the alive neighbors doesnt right of the cell with 0 alive neighbors' );
  });

  it('return next step cells after application rules of the game of life', function() {

    let cells = model.createCells(5);

    cells[1][2].setAlive();
    cells[2][2].setAlive();
    cells[3][2].setAlive();

    cells = model.updateCells(cells);

    assert.equal( cells[1][2].condition, cells[1][2].dead, 'the update line of three cell doesnt right' );
    assert.equal( cells[2][1].condition, cells[2][1].alive, 'the update line of three cell doesnt right' );
    assert.equal( cells[2][2].condition, cells[2][2].alive, 'the update line of three cell doesnt right' );
    assert.equal( cells[2][3].condition, cells[2][3].alive, 'the update line of three cell doesnt right' );
    assert.equal( cells[3][2].condition, cells[3][2].dead, 'the update line of three cell doesnt right' );
  });
});
