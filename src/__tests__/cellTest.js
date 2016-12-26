import assert from 'assert';
import Cell from '../model/cell.js';

describe('test model cell', function () {
    it('change the cell condition to alive', function () {
        let cell = new Cell();
        cell.setAlive();
        assert.equal(cell.condition, cell.alive);
    });

    it('change the cell condition to dead', function () {
        let cell = new Cell();
        cell.setDead();
        assert.equal(cell.condition, cell.dead);
    });
});