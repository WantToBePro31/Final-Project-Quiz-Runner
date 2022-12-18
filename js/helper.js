export class Helper {
  constructor() {}

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  randomColor(min, max) {
    const val = Math.random() * (max - min);

    return Math.floor(val);
  }

  randomCount() {
    return Math.floor(Math.random() * 3) + 1;
  }

  randomGenerator(count) {
    return !(Math.floor(Math.random() * count));
  } 

  randomPlace() {
    const place = this.randomCount();

    if (place == 1) return -1;
    if (place == 2) return 0;
    return 1;
  }

  updateHighScore(prevScore, curScore) {
    return Math.max(prevScore, curScore);
  }
}
