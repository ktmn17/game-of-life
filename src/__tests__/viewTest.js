import assert from 'assert';
import View from '../view/view.js';
import GameScreen from '../model/gameScreen.js';
import Cell from '../model/cell.js';

import pug from '../main.pug';
import style from '../style.styl';

document.body.innerHTML = pug();

let view = new View();

describe('view', function() {
  it('create cell element', function() {

    let cell = view.createElemCell();

    assert.equal( cell.tagName, 'DIV', 'cell doesnt give tag DIV' );
    assert.equal( cell.className, 'window__cell', 'cell doesnt give class window__cell' );
  });

  it('remove all cells from page', function() {

    let childs = [];

    for (let i = 0; i < 10; i++) {
      let child = view.createElemCell();

      childs.push(child);
      view.elem.appendChild(child);
    }

    view.removeChildren();

    assert.equal( view.elem.childNodes.length, 0, 'doesnt remove all children')
  });

  it('make cell elem and cell model alive', function() {

    let cellElem = view.createElemCell();
    let cellModel = new Cell();

    view.makeAlive(cellModel, cellElem);

    assert( cellElem.classList.contains('window__cell_enable'), 'doesnt add to elem class window__cell_enable' );
    assert.equal( cellModel.condition, cellModel.alive, 'doesnt turn model condition to alive' );
  });

  it('make cell elem and cell model dead', function() {

    let cellElem = view.createElemCell();
    let cellModel = new Cell();

    view.makeDead(cellModel, cellElem);

    assert( !cellElem.classList.contains('window__cell_enable'), 'doesnt remove of elem class window__cell_enable' );
    assert.equal( cellModel.condition, cellModel.dead, 'doesnt turn model condition to dead' );
  });

  it('draw cells', function() {

    let gameScreen = new GameScreen();
    let cells = gameScreen.createCells(5);

    cells[1][2].setAlive();
    cells[2][2].setAlive();
    cells[3][2].setAlive();

    view.draw(cells);

    let cellElems = view.elem.querySelectorAll('.window__cell');

    assert( cellElems.length, 'doesnt draw anything');
    assert.equal( cellElems.length, 25, 'doesnt draw the right number of cells');
    assert( cellElems[0].classList.contains('window__cell'), 'doesnt add to the first elem class window__cell');
    assert( cellElems[24].classList.contains('window__cell'), 'doesnt add to the last elem class window__cell');
    assert( cellElems[7].classList.contains('window__cell_enable'), 'doesnt add to the needed elem class window__cell_enable');
    assert( cellElems[12].classList.contains('window__cell_enable'), 'doesnt add to the needed elem class window__cell_enable');
    assert( cellElems[17].classList.contains('window__cell_enable'), 'doesnt add to the needed elem class window__cell_enable');

    let click = new Event('click');
    cellElems[0].dispatchEvent(click);
    cellElems[7].dispatchEvent(click);

    assert( cellElems[0].classList.contains('window__cell_enable'), 'doesnt add class window__cell_enable after click on dead cell' );
    assert( !cellElems[7].classList.contains('window__cell_enable'), 'doesnt remove class window__cell_enable after click on alive cell' );
  })
})
