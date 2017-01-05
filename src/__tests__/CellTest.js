import Cell from '../model/Cell';

describe('model cell', function () {
  const cell = new Cell();

  it('created cell is object', function () {
    assert.isObject(cell);
  });

  it('created cell has dead status', function () {
    assert.equal(cell.isAlive, false);
  });

  it('set cell to alive', function () {
    cell.setAlive();
    assert.equal(cell.isAlive, true);
  });

  it('set cell to dead', function () {
    cell.setDead();
    assert.equal(cell.isAlive, false);
  });
});
