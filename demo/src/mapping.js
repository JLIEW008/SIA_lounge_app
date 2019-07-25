export function getCenter(minX, minY, maxX, maxY){
  return {
    x: parseInt((minX + maxX) / 2),
    y: parseInt((minY + maxY) / 2)
  };
}
