import View from '../view/view.js';
import GameScreen from '../model/gameScreen.js';
import Cell from '../model/cell.js';

import pug from '../main.pug';
import style from '../style.styl';

document.body.innerHTML = pug();

describe('view', function() {
  let view = new View();

  describe('createElemCell', function() {
    let cell = view.createElemCell();

    it('create div element', function() {
      assert.equal( cell.tagName, 'DIV', 'cell doesnt give tag DIV' );
    });

    it('set element right class', function() {
      assert.equal( cell.className, 'window__cell', 'cell doesnt give class window__cell' );
    });
  });

  describe('removeChildren', function() {
    it('remove all cells from screen', function() {
      for (let i = 0; i < 10; i++) {
        let child = view.createElemCell();

        view.elem.appendChild(child);
      }

      view.removeChildren();
      assert.equal( view.elem.children.length, 0, 'doesnt remove all children');
    });
  });

  describe('makeAlive', function() {
    let cellElem = view.createElemCell();
    let cellModel = new Cell();

    view.makeAlive(cellModel, cellElem);

    it('make cell elem alive', function() {
      assert( cellElem.classList.contains('window__cell_enable'), 'doesnt add class window__cell_enable to elem ' );
    });

    it('make cell model alive', function() {
      assert.equal( cellModel.condition, cellModel.alive, 'doesnt turn model condition to alive' );
    });
  });

  describe('makeDead', function() {
    let cellElem = view.createElemCell();
    let cellModel = new Cell();

    view.makeAlive(cellModel, cellElem);
    view.makeDead(cellModel, cellElem);

    it('make cell elem dead', function() {
      assert( !cellElem.classList.contains('window__cell_enable'), 'doesnt remove class window__cell_enable from elem' );
    });

    it('make cell model dead', function() {
      assert.equal( cellModel.condition, cellModel.dead, 'doesnt turn model condition to dead' );
    });
  });

  describe('draw', function() {
    let model = new GameScreen();
    model.createCells(5);

    model.cells[1][2].setAlive();
    model.cells[2][2].setAlive();
    model.cells[3][2].setAlive();

    let cells = model.cells;
    view.draw(cells);

    let cellElems = view.elem.querySelectorAll('.window__cell');

    it('draw anything', function() {
      assert( cellElems.length, 'doesnt draw anything');
    });

    it('draw the right number of cells', function() {
      assert.equal( cellElems.length, 25, 'doesnt draw the right number of cells');
    });

    it('add to the first elem class window__cell', function() {
      assert( cellElems[0].classList.contains('window__cell'), 'doesnt add to the first elem class window__cell');
    });

    it('add to the last elem class window__cell', function() {
      assert( cellElems[24].classList.contains('window__cell'), 'doesnt add to the last elem class window__cell');
    });

    it('add to the needed elem (8) class window__cell_enable', function() {
      assert( cellElems[7].classList.contains('window__cell_enable'), 'doesnt add to the needed elem class window__cell_enable');
    });

    it('add to the needed elem (13) class window__cell_enable', function() {
      assert( cellElems[12].classList.contains('window__cell_enable'), 'doesnt add to the needed elem class window__cell_enable');
    });

    it('add to the needed elem (18) class window__cell_enable', function() {
      assert( cellElems[17].classList.contains('window__cell_enable'), 'doesnt add to the needed elem class window__cell_enable');
    });

    let click = new Event('click');

    it('add class window__cell_enable after click on dead cell', function() {
      cellElems[0].dispatchEvent(click);
      assert( cellElems[0].classList.contains('window__cell_enable'), 'doesnt add class window__cell_enable after click on dead cell' );
    });

    it('remove class window__cell_enable after click on alive cell', function() {
      cellElems[7].dispatchEvent(click);
      assert( !cellElems[7].classList.contains('window__cell_enable'), 'doesnt remove class window__cell_enable after click on alive cell' );
    });
  });

  describe('changePlayButton', function() {
    it('change condition play button to pause', function() {
      view.play.textContent == 'Play';

      view.changePlayButton();

      assert.equal( view.play.textContent, 'Pause', 'doesnt change condition play button to pause' );
    });

    it('change condition pause button to play', function() {
      view.play.textContent == 'Pause';

      view.changePlayButton();

      assert.equal( view.play.textContent, 'Play', 'doesnt change condition pause button to play' );
    })
  })
})
