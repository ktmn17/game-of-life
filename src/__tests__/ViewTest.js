import View from '../view/View.js';

describe('View', function() {
  const stubSetInitialHandlers = sinon.stub(View.prototype, 'setInitialHandlers');

  const view = new View(3);
  const VertLineCells = [
    [{ isAlive: false }, { isAlive: true }, { isAlive: false }],
    [{ isAlive: false }, { isAlive: true }, { isAlive: false }],
    [{ isAlive: false }, { isAlive: true }, { isAlive: false }],
  ];
  const spyRemoveElemCells = sinon.spy(view, 'removeElemCells');
  const spyCreateElemRow = sinon.spy(View, 'createElemRow');
  const spyCreateElemCell = sinon.spy(View, 'createElemCell');
  const spyToogleCell = sinon.spy(view, 'toogleCell');
  const spyMakeAlive = sinon.spy(view, 'makeAlive');
  const spyMakeDead = sinon.spy(view, 'makeDead');

  const resetAllSpies = function reset() {
    spyRemoveElemCells.reset();
    spyCreateElemRow.reset();
    spyCreateElemCell.reset();
    spyToogleCell.reset();
    spyMakeAlive.reset();
    spyMakeDead.reset();
  };

  stubSetInitialHandlers.restore();

  describe('draw initial layout', function () {
    it('draw window', function () {
      const window = document.querySelectorAll('.window');
      assert.equal(window.length, 1, 'doesnt draw window');
    });

    it('draw window__h1', function () {
      const window__h1 = document.querySelectorAll('.window__h1');
      assert.equal(window__h1.length, 1, 'doesnt draw window__h1');
    });

    it('draw window__game', function () {
      const window__game = document.querySelectorAll('.window__game');
      assert.equal(window__game.length, 1, 'doesnt draw window__game');
    });

    it('draw window__controller', function () {
      const window__controller = document.querySelectorAll('.window__controller');
      assert.equal(window__controller.length, 1, 'doesnt draw window__controller');
    });

    it('draw window__input', function () {
      const window__input = document.querySelectorAll('.window__input');
      assert.equal(window__input.length, 1, 'doesnt draw window__input');
    });

    it('draw window__button_play', function () {
      const window__button_play = document.querySelectorAll('.window__button_play');
      assert.equal(window__button_play.length, 1, 'doesnt draw window__button_play');
    });

    it('draw window__button_clear', function () {
      const window__button_clear = document.querySelectorAll('.window__button_clear');
      assert.equal(window__button_clear.length, 1, 'doesnt draw window__button_clear');
    });
  });

  describe('draw (center vertical line on 3x3)', function() {
    before(function () {
      view.draw(VertLineCells);
    });

    after(function () {
      resetAllSpies();
    });

    it('call removeElemCells once', function () {
      sinon.assert.calledOnce(spyRemoveElemCells);
    });

    it('call createElemRow thrice', function () {
      sinon.assert.calledThrice(spyCreateElemRow);
    });

    it('call createElemCell thrice', function () {
      sinon.assert.callCount(spyCreateElemCell, 9);
    });

    it('call makeAlive thrice times', function () {
      sinon.assert.callCount(spyMakeAlive, 3);
    });

    it('call makeDead six times', function () {
      sinon.assert.callCount(spyMakeDead, 6);
    });

    it('call toggleCell after click on cell', function() {
      const click = new Event('click');
      const cellElems = document.querySelectorAll('.window__cell');

      cellElems[0].dispatchEvent(click);
      sinon.assert.calledOnce(spyToogleCell);
      cellElems[8].dispatchEvent(click);
      sinon.assert.calledTwice(spyToogleCell);
    });

    it('draw at least one element', function() {
      const cellElems = document.querySelectorAll('.window__cell');
      assert(cellElems.length, 'doesnt draw anything');
    });

    it('add to the last elem class window__cell', function() {
      const cellElems = document.querySelectorAll('.window__cell');
      assert(cellElems[8].classList.contains('window__cell'), 'doesnt add to the last elem class window__cell');
    });

    it('add to the needed elem (1) class window__cell_enable', function() {
      const cellElems = document.querySelectorAll('.window__cell');
      assert(cellElems[1].classList.contains('window__cell_enable'), 'doesnt add to the needed elem class window__cell_enable');
    });

    it('return this', function () {
      assert.equal(view.draw([]), view, 'doesnt return this');
    });
  });

  describe('getNumberOfRowsInputValue', function () {
    it('return number of rows input value', function () {
      view.numberOfRowsInput.value = 5;
      assert.equal(view.getNumberOfRowsInputValue(), 5, 'doesnt return right number');
    });
  });

  describe('changePlayButton', function () {
    it('change play button to play state', function () {
      view.playButton.textContent = 'Pause';
      view.changePlayButton(false);
      assert.equal(view.playButton.textContent, 'Play', 'doesnt change play button to play state');
    });

    it('change play button to pause state', function () {
      view.playButton.textContent = 'Play';
      view.changePlayButton(true);
      assert.equal(view.playButton.textContent, 'Pause', 'doesnt change play button to pause state');
    });

    it('return this', function () {
      assert.equal(view.changePlayButton(), view, 'doesnt return this');
    });
  });

  describe('changeNumberOfRowsInputValue', function () {
    it('change number of rows input value', function () {
      view.numberOfRowsInput.value = 5;
      view.changeNumberOfRowsInputValue(7);

      assert.equal(view.numberOfRowsInput.value, 7, 'doesnt change number of rows input value right');
    });

    it('return this', function () {
      assert.equal(view.changeNumberOfRowsInputValue(), view, 'doesnt return this');
    });
  });
});
