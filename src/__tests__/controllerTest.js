import assert from 'assert';
import pug from '../main.pug';
import style from '../style.styl';

document.body.innerHTML = pug();

import Controller from '../controller/controller.js';
import View from '../view/view.js';
import Model from '../model/gameScreen.js';

let view = new View();
let model = new Model();
let controller = new Controller();
let spyDraw;

describe('controller', function() {

  beforeEach(function() {
    spyDraw = sinon.spy(view, 'draw');
  });

  afterEach(function() {
    spyDraw.restore();
  });

  it('turn all alive cells to dead after click clear button', function() {
    
    view.clear.onclick = () => {

      let cells = model.createCells(5);
      view.draw(cells);
    };

    let click = new Event('click');
    view.clear.dispatchEvent(click);

    assert( spyDraw.called, 'doesnt draw new cells' );
  });

  it('draw input.value cells after unfocus input', function() {

    let input = view.input;
    input.value = 4;

    input.onblur = () => {

      let cells = model.createCells(input.value);
      view.draw(cells);
    };

    let blur = new Event('blur');
    view.input.dispatchEvent(blur);

    assert( spyDraw.called, 'doesnt draw new cells' );

    let cellsElem = view.elem.querySelectorAll('.window__cell')
    assert.equal( cellsElem.length, 16, 'doesnt draw the right number of cells' );
  });

  it('start the game after click play button and pause the game after click pause button', function(done) {

    let cells = model.createCells(5);
    let timerId;

    view.play.onclick = () => {
      cells = model.updateCells(cells);
      view.draw(cells);

      timerId = setInterval( () => {
        cells = model.updateCells(cells);
        view.draw(cells);

      }, view.delay);
    };

    view.pause.onclick = () => {
      clearInterval(timerId);
    };

    let click = new Event('click');
    view.play.dispatchEvent(click);

    assert( spyDraw.calledOnce, 'doesnt draw cells right off after click play' );

    setTimeout(function() {
      assert( spyDraw.calledTwice, 'doesnt draw cells second time after delay' );

      view.pause.dispatchEvent(click);

      setTimeout(function() {
        assert( spyDraw.calledTwice, 'draw cells after click pause' );

        done();
      }, view.delay);

    }, view.delay);
  });
});
