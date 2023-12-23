import ICoordinate from "./ICoordinate";

// Represents point
export default class Point {
    // Coordinates of a point
    coordinate: ICoordinate;

    constructor(xPoint: Number, yPoint: Number) {
        this.coordinate = {
            x: xPoint,
            y: yPoint
        }
    }
}
