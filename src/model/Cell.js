export default class Cell {
  constructor() {
    this.isAlive = false;
    this.alive = true;
    this.dead = false;
  }

  setAlive() {
    this.isAlive = this.alive;
  }

  setDead() {
    this.isAlive = this.dead;
  }
}
