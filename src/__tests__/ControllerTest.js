import pug from '../main.pug';
import style from '../style.styl';

document.body.innerHTML = pug();

import Controller from '../controller/Controller.js';
import View from '../view/View.js';
import Model from '../model/GameScreen.js';

describe('controller', function() {
  let controller = new Controller();

  let spyDraw = sinon.spy(controller.view, 'draw');
  let spyCreateCells = sinon.spy(controller.model, 'createCells');
  let spyUpdateCells = sinon.spy(controller.model, 'updateCells');
  let spyStartGame = sinon.spy(controller, 'startGame');
  let spyPauseGame = sinon.spy(controller, 'pauseGame');
  let spyInitDraw = sinon.spy(controller, 'drawInitialCells');
  let spyDrawUpdateCells = sinon.spy(controller, 'drawUpdateCells');
  let spyLengthHandler = sinon.spy(controller, 'lengthHandler');
  let spyPlayHandler = sinon.spy(controller, 'playHandler');
  let spyPauseHandler = sinon.spy(controller, 'pauseHandler');
  let spyClearHandler = sinon.spy(controller, 'clearHandler');
  let spyChangePlayButton = sinon.spy(controller.view, 'changePlayButton');

  function resetAllSpies() {
    spyDraw.reset();
    spyCreateCells.reset();
    spyUpdateCells.reset();
    spyStartGame.reset();
    spyPauseGame.reset();
    spyInitDraw.reset();
    spyDrawUpdateCells.reset();
    spyLengthHandler.reset();
    spyPlayHandler.reset();
    spyPauseHandler.reset();
    spyClearHandler.reset();
    spyChangePlayButton.reset();
  }

  describe('setUpGame', function() {
    before(function() {
      controller.setUpGame();
    });

    after(function() {
      resetAllSpies();
    });

    it('call drawInitialCells', function() {
      sinon.assert.called(spyInitDraw);
    });

    it('call lengthHandler', function() {
      sinon.assert.called(spyLengthHandler);
    });

    it('call playHandler', function() {
      sinon.assert.called(spyPlayHandler);
    });

    it('call clearHandler', function() {
      sinon.assert.called(spyClearHandler);
    });
  });

  describe('lengthHandler', function() {
    before(function() {
      controller.lengthHandler();
      controller.length.value = 50;

      let blur = new Event('blur');
      controller.length.dispatchEvent(blur);
    });

    after(function() {
      resetAllSpies();
    });

    it('doesnt draw over 40 cells after unfocus', function() {
      let cellElems = controller.view.elem.querySelectorAll('.window__cell');
      assert.equal(cellElems.length, 1600, 'draw over 40 cells')
    });

    it('call pauseGame after unfocus', function() {
      sinon.assert.called(spyPauseGame);
    })

    it('call drawInitialCells after unfocus', function() {
      sinon.assert.called(spyInitDraw);
    });
  });

  describe('playHandler', function() {
    before(function() {
      controller.playHandler();

      let click = new Event('click');
      controller.play.dispatchEvent(click);
    });

    after(function() {
      resetAllSpies();
    });

    it('call startGame after click', function() {
      sinon.assert.called(spyStartGame);
    });
  });

  describe('pauseHandler', function() {
    before(function() {
      controller.pauseHandler();

      let click = new Event('click');
      controller.play.dispatchEvent(click);
    });

    after(function() {
      resetAllSpies();
    });

    it('call pauseGame after click', function() {
      sinon.assert.called(spyPauseGame);
    });
  });

  describe('clearHandler', function() {
    before(function() {
      controller.clearHandler();

      let click = new Event('click');
      controller.clear.dispatchEvent(click);
    });

    after(function() {
      resetAllSpies();
    });

    it('call pauseGame after click', function() {
      sinon.assert.called(spyPauseGame);
    })

    it('call drawInitialCells after click', function() {
      sinon.assert.called(spyInitDraw);
    });
  });

  describe('startGame', function() {
    before(function () {
      controller.startGame();
    });

    after(function() {
      resetAllSpies();
    });

    it('change gameCondition to true', function() {
      assert.equal( controller.model.gameCondition, true, 'doesnt change gameCondition');
    });

    it('call drawUpdateCells', function() {
      sinon.assert.called(spyDrawUpdateCells);
    });

    it('call changePlayButton', function() {
      sinon.assert.called(spyChangePlayButton);
    });

    it('call pauseHandler', function() {
      sinon.assert.called(spyPauseHandler);
    });

    it('call drawUpdateCells after delay', function(done) {
      setTimeout( () => {
        sinon.assert.calledTwice(spyDrawUpdateCells);

        done();
      }, controller.model.delay)
    });
  });

  describe('pauseGame', function() {
    before(function () {
      controller.startGame();
      controller.pauseGame();
    });

    after(function() {
      resetAllSpies();
    })

    it('change gameCondition to false', function() {
      assert.equal( controller.model.gameCondition, false, 'doesnt change gameCondition')
    });

    it('call changePlayButton', function() {
      sinon.assert.called(spyChangePlayButton);
    });

    it('call playHandler', function() {
      sinon.assert.called(spyPlayHandler);
    });

    it('doesnt call drawUpdateCells after delay', function(done) {
      setTimeout( () => {
        sinon.assert.calledOnce(spyDrawUpdateCells);

        done();
      }, controller.model.delay)
    });
  });

  describe('drawInitialCells', function() {
    before(function() {
      controller.drawInitialCells();
    });

    after(function() {
      resetAllSpies();
    })

    it('call createCells', function() {
      sinon.assert.called(spyCreateCells);
    });

    it('call draw', function() {
      sinon.assert.called(spyDraw);
    });
  });

  describe('drawUpdateCells', function() {
    before(function() {
      controller.drawUpdateCells();
    });

    after(function() {
      resetAllSpies();
    })

    it('call updateCells', function() {
      sinon.assert.called(spyUpdateCells);
    });

    it('call draw', function() {
      sinon.assert.called(spyDraw);
    });
  });
});
