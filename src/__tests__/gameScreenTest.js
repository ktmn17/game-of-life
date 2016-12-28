import assert from 'assert';
import GameScreen from '../model/gameScreen.js';

let gameScreen = new GameScreen();


describe('model gameScreen', function() {
  it('create cells', function() {
    let cells = gameScreen.createCells(5);
    assert.equal( cells[0][0].condition, cells[0][0].dead, 'doesnt create first cell' );
    assert.equal( cells[4][4].condition, cells[4][4].dead, 'doesnt create last cell' );
  });

  it('return neighboors of cell', function() {
    let cells = gameScreen.createCells(5);

    let neighbors = gameScreen.getNeighbors(cells, 0, 0);
    assert.equal( neighbors[0], cells[0][1], 'first neighbor of first cell doesnt right' );
    assert.equal( neighbors.length, 3, 'length of the neighbors of first cell doesnt right' );

    neighbors = gameScreen.getNeighbors(cells, 2, 2);
    assert.equal( neighbors[0], cells[1][1], 'first neighbor of center cell doesnt right' );
    assert.equal( neighbors.length, 8, 'length of the neighbors of center cell doesnt right' );

    neighbors = gameScreen.getNeighbors(cells, 4, 4);
    assert.equal( neighbors[0], cells[3][3], 'first neighbor of last cell doesnt right' );
    assert.equal( neighbors.length, 3, 'length of the neighbors of last cell doesnt right' );
  });

  it('return amount of neighbors with alive condition', function() {
    let cells = gameScreen.createCells(5);

    cells[1][1].setAlive();
    cells[1][3].setAlive();
    cells[3][2].setAlive();

    let countTrue = gameScreen.checkNeighbors(cells, 1, 2);
    assert.equal( countTrue, 2, 'amount of alive neighbors doesnt right of cell with 2 alive neighbors' );

    countTrue = gameScreen.checkNeighbors(cells, 2, 2);
    assert.equal( countTrue, 3, 'amount of alive neighbors doesnt right of cell with 3 alive neighbors' );

    countTrue = gameScreen.checkNeighbors(cells, 4, 4);
    assert.equal( countTrue, 0, 'amount of alive neighbors doesnt right of cell with 0 alive neighbors' );
  });

  it('return next step cells after application rules of the game of life', function() {
    let cells = gameScreen.createCells(5);

    cells[1][2].setAlive();
    cells[2][2].setAlive();
    cells[3][2].setAlive();

    cells = gameScreen.updateCells(cells);

    assert.equal( cells[1][2].condition, cells[1][2].dead, 'update line of three cell doesnt right' );
    assert.equal( cells[2][1].condition, cells[2][1].alive, 'update line of three cell doesnt right' );
    assert.equal( cells[2][2].condition, cells[2][2].alive, 'update line of three cell doesnt right' );
    assert.equal( cells[2][3].condition, cells[2][3].alive, 'update line of three cell doesnt right' );
    assert.equal( cells[3][2].condition, cells[3][2].dead, 'update line of three cell doesnt right' );
  });
});
