export class Helper {
  constructor() {}

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  randomColor(min, max) {
    const val = Math.random() * (max - min);

    return Math.floor(val);
  }

  randomPlace() {
    const place = Math.floor(Math.random() * 3) + 1;

    if (place == 1) return -0.5;
    if (place == 2) return 0;
    return 0.5;
  }
}
