export class Helper {
    constructor() {}

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180)
    }

    random(min, max) {
      const val = Math.random() * (max - min)
    
      return Math.floor(val)
    }
}