import Controller from '../controller/Controller';

describe('Controller', function () {
  const controller = new Controller();
  const spySetBeginGame = sinon.spy(controller, 'setBeginGame');
  const spyToggleGameActive = sinon.spy(controller, 'toggleGameActive');
  const spyStartGame = sinon.spy(controller, 'startGame');
  const spyPauseGame = sinon.spy(controller, 'pauseGame');
  const spyTransmitNumOfRowsInputValueToModel = sinon.spy(controller, 'transmitNumOfRowsInputValueToModel');
  const spyChangeNumberOfRowsInputValue = sinon.spy(controller.view, 'changeNumberOfRowsInputValue');
  const spyDrawInitialCells = sinon.spy(controller, 'drawInitialCells');

  const resetAllSpies = function reset() {
    spySetBeginGame.reset();
    spyToggleGameActive.reset();
    spyStartGame.reset();
    spyPauseGame.reset();
    spyTransmitNumOfRowsInputValueToModel.reset();
    spyChangeNumberOfRowsInputValue.reset();
    spyDrawInitialCells.reset();
  };

  describe('setUpGame', function () {
    before(function () {
      controller.setUpGame();
    });

    afterEach(function () {
      resetAllSpies();
    });

    it('call setBeginGame', function () {
      sinon.assert.calledOnce(spySetBeginGame);
    });

    it('call setBeginGame after view event changeRows', function () {
      controller.view.emit('changeRows');
      sinon.assert.calledOnce(spySetBeginGame);
    });

    it('call setBeginGame after view event playOrPause', function () {
      controller.view.emit('playOrPause');
      sinon.assert.calledOnce(spyToggleGameActive);
    });

    it('call setBeginGame after view event clearCells', function () {
      controller.view.emit('clearCells');
      sinon.assert.calledOnce(spySetBeginGame);
    });

    it('call model.setAlive with after view event setModelCellAlive', function () {
      const modelCell = {
        isAlive: false,

        setAlive() {
          this.isAlive = true;
        },
      };

      const spySetAlive = sinon.spy(modelCell, 'setAlive');

      controller.view.emit('setModelCellAlive', modelCell);
      sinon.assert.calledOnce(spySetAlive);
    });

    it('call model.setDead after view event setModelCellDead', function () {
      const modelCell = {
        isAlive: true,

        setDead() {
          this.isAlive = false;
        },
      };
      const spySetDead = sinon.spy(modelCell, 'setDead');

      controller.view.emit('setModelCellDead', modelCell);
      sinon.assert.calledOnce(spySetDead);
    });
  });

  describe('setBeginGame', function () {
    before(function () {
      resetAllSpies();
    });

    afterEach(function () {
      resetAllSpies();
    });

    it('call pauseGame if game is active', function () {
      controller.model.gameIsActive = true;
      controller.setBeginGame();

      sinon.assert.calledOnce(spyPauseGame);
    });

    it('doesnt call pauseGame if game is not active', function () {
      controller.model.gameIsActive = false;
      controller.setBeginGame();

      sinon.assert.notCalled(spyPauseGame);
    });

    it('call transmitNumOfRowsInputValueToModel', function () {
      controller.setBeginGame();
      sinon.assert.calledOnce(spyTransmitNumOfRowsInputValueToModel);
    });

    it('call changeNumberOfRowsInputValue', function () {
      controller.setBeginGame();
      sinon.assert.calledOnce(spyChangeNumberOfRowsInputValue);
    });

    it('call spyDrawInitialCells', function () {
      controller.setBeginGame();
      sinon.assert.calledOnce(spyDrawInitialCells);
    });

    it('return this', function () {
      assert.equal(controller.setBeginGame(), controller, 'doesnt return this');
    });
  });

  describe('toggleGameActive', function () {
    before(function () {
      resetAllSpies();
    });

    afterEach(function () {
      resetAllSpies();
    });

    it('call pauseGame if game is active', function () {
      controller.model.gameIsActive = true;
      controller.toggleGameActive();
      sinon.assert.calledOnce(spyPauseGame);
      sinon.assert.notCalled(spyStartGame);
    });

    it('call startGame if game is not active', function () {
      controller.model.gameIsActive = false;
      controller.toggleGameActive();
      sinon.assert.calledOnce(spyStartGame);
      sinon.assert.notCalled(spyPauseGame);
    });

    it('return this', function () {
      assert.equal(controller.toggleGameActive(), controller, 'doesnt return this');
    });
  });
});
