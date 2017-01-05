import Model from '../model/GameScreen';

describe('model gameScreen', function() {
  const model = new Model();

  const VertLineCells = [
    [{ isAlive: false }, { isAlive: true }, { isAlive: false }],
    [{ isAlive: false }, { isAlive: true }, { isAlive: false }],
    [{ isAlive: false }, { isAlive: true }, { isAlive: false }],
  ];

  const setInitialModel = function initTest() {
    model.cells = VertLineCells;
    model.numOfRows = 3;
    model.maxRows = 5;
    model.gameIsActive = false;
  }

  describe('setInitialCells', function() {
    describe('set initial cells 3x3', function () {
      before(function () {
        setInitialModel();

        model.cells = [];

        model.setInitialCells();
      });

      it('cells is array', () => {
        assert.isArray(model.cells, 'model.cell is not array');
      });

      it('cells has 3 rows', () => {
        assert.equal(model.cells.length, 3, 'model.cell doesnt have 3 rows');
      });

      it('cells has 3 cells in last row', () => {
        assert.equal(model.cells[2].length, 3, 'model.cell doesnt have 3 cells in last row');
      });

    })

    it('return this', () => {
      assert.equal(model.setInitialCells(), model, 'doesnt return this');
    });
  });

  describe('setNextStepCells', function() {
    describe('update vertical line to horizontal', function () {
      before(function () {
        setInitialModel();

        const stubAliveNeighb = sinon.stub(model, 'getAliveNeighbors');

        stubAliveNeighb.onCall(0).returns(2);
        stubAliveNeighb.onCall(1).returns(1);
        stubAliveNeighb.onCall(2).returns(2);
        stubAliveNeighb.onCall(3).returns(3);
        stubAliveNeighb.onCall(4).returns(2);
        stubAliveNeighb.onCall(5).returns(3);
        stubAliveNeighb.onCall(6).returns(2);
        stubAliveNeighb.onCall(7).returns(1);
        stubAliveNeighb.onCall(8).returns(2);

        model.setNextStepCells();

        stubAliveNeighb.restore();
      });

      it('set dead the top cell of the line', function() {
        assert.isFalse( model.cells[0][1].isAlive, 'the update line of three cell doesnt right' );
      });

      it('set alive the left cell of the line', function() {
        assert.isTrue( model.cells[1][0].isAlive, 'the update line of three cell doesnt right' );
      });

      it('retain alive the center cell of the line', function() {
        assert.isTrue( model.cells[1][1].isAlive, 'the update line of three cell doesnt right' );
      });

      it('set alive the right cell of the line', function() {
        assert.isTrue( model.cells[1][2].isAlive, 'the update line of three cell doesnt right' );
      });

      it('set dead the bottom cell of the line', function() {
        assert.isFalse( model.cells[2][1].isAlive, 'the update line of three cell doesnt right' );
      });
    });

    it('return this', () => {
      assert.equal(model.setNextStepCells(), model, 'doesnt return this')
    });
  });

  describe('getAliveNeighbors', function() {
    const neighb = [
      { isAlive: false },
      { isAlive: false },
      { isAlive: false },
      { isAlive: false },
      { isAlive: false },
      { isAlive: false },
      { isAlive: false },
      { isAlive: false },
    ];

    const stubNeighb = sinon.stub(model, 'getNeighbors');
    stubNeighb.returns(neighb);

    before(function () {
      setInitialModel();
    });

    after(function () {
      stubNeighb.restore();
    });

    it('return 0 of cell with 0 alive neighbors', function() {
      const aliveNeighbors = model.getAliveNeighbors();
      assert.equal(aliveNeighbors, 0, 'the amount of the alive neighbors doesnt right of the cell with 2 alive neighbors');
    });

    it('return 2 of cell with 2 alive neighbors', function() {
      neighb[3].isAlive = true;
      neighb[6].isAlive = true;

      const aliveNeighbors = model.getAliveNeighbors();
      assert.equal(aliveNeighbors, 2, 'the amount of the alive neighbors doesnt right of the cell with 2 alive neighbors');
    });

    it('return 4 of cell with 4 alive neighbors', function() {
      neighb[0].isAlive = true;
      neighb[7].isAlive = true;

      const aliveNeighbors = model.getAliveNeighbors();
      assert.equal(aliveNeighbors, 4, 'the amount of the alive neighbors doesnt right of the cell with 2 alive neighbors');
    });
  });

  describe('getNeighbors', function() {
    before(function () {
      setInitialModel();
    })

    it('return neighboors of the first cell', function() {
      const neighbors = model.getNeighbors(0, 0);
      assert.equal(neighbors[2], model.cells[1][1], 'the first neighbor of the first cell doesnt right');
      assert.equal(neighbors.length, 3, 'the amount of the neighbors of the first cell doesnt right');
    })

    it('return neighboors of the center cell', function() {
      const neighbors = model.getNeighbors(1, 1);
      assert.equal(neighbors[4], model.cells[1][2], 'the first neighbor of the center cell doesnt right');
      assert.equal(neighbors.length, 8, 'the amount of the neighbors of the center cell doesnt right');
    })

    it('return neighboors of the center right cell', function() {
      const neighbors = model.getNeighbors(1, 2);
      assert.equal(neighbors[0], model.cells[0][1], 'the first neighbor of the last cell doesnt right');
      assert.equal(neighbors.length, 5, 'the amount of the neighbors of the center right cell doesnt right');
    })
  });

  describe('setGameActive', function () {
    before(function () {
      setInitialModel();
    });

    it('set gameIsAlive to true', function () {
      model.setGameActive(true);
      assert.isTrue(model.gameIsActive)
    });

    it('set gameIsAlive to false', function () {
      model.setGameActive(false);
      assert.isFalse(model.gameIsActive)
    });

    it('return this', () => {
      assert.equal(model.setGameActive(true), model, 'doesnt return this')
    });
  });

  describe('setNumOfRows', function () {
    before(function () {
      setInitialModel();
    });

    it('set argument to numOfRows, if it less than maxRows', function () {
      model.setNumOfRows(4);
      assert.equal(model.numOfRows, 4, 'doesnt set num of rows right')
    });

    it('set maxRows to numOfRows, if it more than maxRows', function () {
      model.setNumOfRows(model.maxRows + 10);
      assert.equal(model.numOfRows, model.maxRows, 'doesnt set num of rows right')
    });
  });
});
