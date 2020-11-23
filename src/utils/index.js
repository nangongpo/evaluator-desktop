/**
 * 获取随机数
 * @param {number} min 
 * @param {number} max
 * @returns {number}
 */
export function getRandom(min, max) {
  return Math.random() * (max - min) + min
} 
