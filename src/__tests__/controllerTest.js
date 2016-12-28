import assert from 'assert';
import pug from '../main.pug';
import style from '../style.styl';

document.body.innerHTML = pug();

import Controller from '../controller/controller.js';
import View from '../view/view.js';
import GameScreen from '../model/gameScreen.js';

let controller = new Controller();
let view = new View();
let gameScreen = new GameScreen();

describe('controller', function() {
  it('draw input value cells after unfocus input', function() {
    view.input.value = 5;

    let blur = new Event('blur');
    view.input.dispatchEvent(blur);

    let cellElems = view.elem.querySelectorAll('.window__cell');
    assert.equal( cellElems.length, 25, 'doest draw right numbers of cells' );
  });

  it('turn all alive cells to dead after click clear button', function() {
    let cells = gameScreen.createCells(5);

    cells[0][0].setAlive();
    cells[2][2].setAlive();
    cells[4][4].setAlive();

    view.draw(cells);

    let click = new Event('click');
    view.clear.dispatchEvent(click);

    let aliveCellElems = view.elem.querySelectorAll('.window__cell_enable');

    assert( !aliveCellElems.length, 'doesnt remove class window__cell_enable from all cells' );
  });

})
