import * as cocoSsd from "@tensorflow-models/coco-ssd";
import {loadVideo} from "./cameraSetup.js";
import {drawBoundingBox} from "./demoUtils";

const videoWidth = 600;
const videoHeight = 500;
const minConfidenceLevel = 0.5;

const video = loadVideo("od-video", videoWidth, videoHeight);

function detectObjectsInRealTime(video, net) {
  const canvas = document.getElementById("od-output");
  const ctx = canvas.getContext("2d");
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  async function objectDetectionFrame() {
    let objects = await net.detect(video);


    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();

    for(let i = 0; i < objects.length; ++i){
      // Draw bounding box for object if over min confidence level
      if(objects[i]["score"] > minConfidenceLevel){
        // Draw box
        let corners =  objects[i]["bbox"];
        ctx.rect(
            parseInt(corners[0], 10),
            parseInt(corners[1], 10),
            parseInt(corners[2], 10),
            parseInt(corners[3], 10)
          );
        ctx.strokeStyle = "red";
        ctx.stroke();
        // Add class label
        ctx.fillStyle = "red";
        ctx.fillRect(
          parseInt(corners[0], 10),
          parseInt(corners[1] - 30),
          objects[i]["class"].length * 10,
          30
        );
        ctx.fillStyle = "white";
        ctx.font = "15px Arial";
        ctx.textAlign="center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          objects[i]["class"],
          parseInt(corners[0], 10) + objects[i]["class"].length * 5,
          parseInt(corners[1] - 30, 10) + 15
        );
      }
    }
    requestAnimationFrame(objectDetectionFrame);
  }
  objectDetectionFrame();
}

export async function bindPage() {
  const model = await cocoSsd.load("mobilenet_v2");
  let video;

  try {
    video = await loadVideo("od-video", videoWidth, videoHeight);
  } catch (e) {
    throw e;
  }
  detectObjectsInRealTime(video, model);
}

bindPage();
