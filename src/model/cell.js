export default class Cell {
  constructor() {
    this.condition = false;
    this.alive = true;
    this.dead = false;
  }

  setAlive() {
    this.condition = this.alive;
  }

  setDead() {
    this.condition = this.dead;
  }
}
