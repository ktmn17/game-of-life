import Cell from '../model/cell.js';

describe('model cell', function () {

    it('change cell condition to alive', function () {
        let cell = new Cell();
        cell.setAlive();
        assert.equal(cell.condition, cell.alive);
    });

    it('change cell condition to dead', function () {
        let cell = new Cell();
        cell.setDead();
        assert.equal(cell.condition, cell.dead);
    });
});
