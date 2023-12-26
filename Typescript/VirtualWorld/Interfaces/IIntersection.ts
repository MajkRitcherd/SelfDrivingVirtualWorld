import ICoordinate from "./ICoordinate.js";

/**
 * Represents structure that holds information about the intersection.
 */
export default interface IIntersection extends ICoordinate {
  /** Intersection's offset. */
  offset: number;
}