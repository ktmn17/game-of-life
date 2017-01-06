import Cell from '../model/Cell';

describe('Model Cell', function () {
  const cell = new Cell();

  it('created cell is object', function () {
    assert.isObject(cell);
  });

  it('created cell has dead status', function () {
    assert.equal(cell.isAlive, false, 'created cell doesnt ahve dead status');
  });

  it('set cell to alive', function () {
    cell.setAlive();
    assert.equal(cell.isAlive, true, 'doesnt set cell to alive');
  });

  it('set cell to dead', function () {
    cell.setDead();
    assert.equal(cell.isAlive, false, 'doesnt set cell to alive');
  });
});
