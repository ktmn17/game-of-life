import Model from '../model/GameScreen.js';

describe('model gameScreen', function() {
  let model = new Model();

  describe('createCells', function() {
    it('set model.cells new cells 5x5', () => {
      model.createCells(5);
      let cells = model.cells;

      assert.equal( cells[0][0].condition, cells[0][0].dead, 'doesnt create the first cell' );
      assert.equal( cells[4][4].condition, cells[4][4].dead, 'doesnt create the last cell' );
    });
  });

  describe('getNeighbors', function() {
    model.createCells(5);
    let cells = model.cells;

    it('return neighboors of the first cell', function() {
      let neighbors = model.getNeighbors(cells, 0, 0);
      assert.equal( neighbors[0], cells[0][1], 'the first neighbor of the first cell doesnt right' );
      assert.equal( neighbors.length, 3, 'the amount of the neighbors of the first cell doesnt right' );
    })

    it('return neighboors of the center cell', function() {
      let neighbors = model.getNeighbors(cells, 2, 2);
      assert.equal( neighbors[0], cells[1][1], 'the first neighbor of the center cell doesnt right' );
      assert.equal( neighbors.length, 8, 'the amount of the neighbors of the center cell doesnt right' );
    })

    it('return neighboors of the last cell', function() {
      let neighbors = model.getNeighbors(cells, 4, 4);
      assert.equal( neighbors[0], cells[3][3], 'the first neighbor of the last cell doesnt right' );
      assert.equal( neighbors.length, 3, 'the amount of the neighbors of the last cell doesnt right' );
    })
  });

  describe('checkNeighbors', function() {
    model.createCells(5);
    let cells = model.cells;

    cells[1][1].setAlive();
    cells[1][3].setAlive();
    cells[3][2].setAlive();

    it('return the amount of neighbors with 2 alive condition', function() {
      let aliveNeighbors = model.checkNeighbors(cells, 1, 2);
      assert.equal( aliveNeighbors, 2, 'the amount of the alive neighbors doesnt right of the cell with 2 alive neighbors' );
    });

    it('return the amount of neighbors with 3 alive condition', function() {
      let aliveNeighbors = model.checkNeighbors(cells, 2, 2);
      assert.equal( aliveNeighbors, 3, 'the amount of the alive neighbors doesnt right of the cell with 3 alive neighbors' );
    });

    it('return the amount of neighbors with 0 alive condition', function() {
      let aliveNeighbors = model.checkNeighbors(cells, 4, 4);
      assert.equal( aliveNeighbors, 0, 'the amount of the alive neighbors doesnt right of the cell with 0 alive neighbors' );
    });
  });

  describe('updateCells', function() {
    model.createCells(5);

    model.cells[1][2].setAlive();
    model.cells[2][2].setAlive();
    model.cells[3][2].setAlive();

    model.updateCells(cells);

    let cells = model.cells;

    // made a vertical line of three cells and update above. It should update to a horizontal line

    it('set dead the top cell of the line', function() {
      assert.equal( cells[1][2].condition, cells[1][2].dead, 'the update line of three cell doesnt right' );

    });

    it('set alive the left cell of the line', function() {
      assert.equal( cells[2][1].condition, cells[2][1].alive, 'the update line of three cell doesnt right' );
    });

    it('retain alive the center cell of the line', function() {
      assert.equal( cells[2][2].condition, cells[2][2].alive, 'the update line of three cell doesnt right' );

    });

    it('set alive the right cell of the line', function() {
      assert.equal( cells[2][3].condition, cells[2][3].alive, 'the update line of three cell doesnt right' );

    });

    it('set dead the bottom cell of the line', function() {
      assert.equal( cells[3][2].condition, cells[3][2].dead, 'the update line of three cell doesnt right' );

    });
  });
});
