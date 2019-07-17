import HeatmapJS from "heatmap.js/build/heatmap.js";

export function setupHeatMap(){
  let heatmapInstance = HeatmapJS.create({
    container: document.getElementById("map")
  });
  return heatmapInstance;
}

export function updateHeatMap(heatMapInstance, points){
  let heatMapPoints = [];
  for(let i = 0; i < points.length; ++i){
    let point = {
      x: points[i]["x"],
      y: points[i]["y"],
      value: 80
    }
    heatMapPoints.push(point);
  }
  let data = {
    max: 80,
    data: heatMapPoints
  };
  heatMapInstance.setData(data);
}

// Test functions
export function movePoints(points, width, height){
  for(let i = 0; i < points.length; ++i){
    points[i] = movePoint(points[i]["direction"], points[i], width, height);
  }
}

function movePoint(direction, point, width, height){
  switch(direction){
    case 0: // Left
      point["x"] = (point["x"] - 1) % width;
      break;
    case 1: // Right
      point["x"] = (point["x"] + 1) % width;
      break;
    case 2: // Up
      point["y"] = (point["y"] + 1) % height;
      break;
    case 3: // Down
      point["y"] = (point["y"] - 1) % height;
      break;
    case 4: // Diag top right
      point["y"] = (point["y"] + 1) % height;
      point["x"] = (point["x"] + 1) % width;
      break;
    case 5: // Diag bottom right
      point["y"] = (point["y"] - 1) % height;
      point["x"] = (point["x"] + 1) % width;
      break;
    case 6: // Diag bottom left
      point["y"] = (point["y"] - 1) % height;
      point["x"] = (point["x"] - 1) % width;
      break;
    case 7: // Diag top left
      point["y"] = (point["y"] + 1) % height;
      point["x"] = (point["x"] - 1) % width;
      break;
    default:
      console.log("WARNING: Direction input invalid! (Must be 0-7)");
  }
  return point;
}

export function generateRandomPoints(width, height){
  let numberOfPoints = 8;
  let points = [];
  for(let i = 0; i < numberOfPoints; ++i){
    // Generate random starting points
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    let testPoint = {
      direction: i,
      x,
      y
    };
    points.push(testPoint);
  }
  return points;
}
