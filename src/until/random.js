/**
 * 产生随机整数，包括上限，下限
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 */
export function random (lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower
}
