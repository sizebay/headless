/**
 * Normalizes the body shape from the APP so the API can properly consume it.
 * @param shape
 * @returns {number}
 */
export default function parseBodyShape(shape: number): number {
  switch (shape) {
    case 5:
      return 2;
    case 4:
      return 1;
    case 3:
      return 0;
    case 2:
      return -1;
    case 1:
      return -2;
    default:
      return 0;
  }
}