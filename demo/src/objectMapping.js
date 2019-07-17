import * as cocoSsd from "@tensorflow-models/coco-ssd";
import {loadVideo} from "./cameraSetup.js";
import {drawBoundingBox} from "./demoUtils";

const videoWidth = 600;
const videoHeight = 500;
const minConfidenceLevel = 0.8;

const video = loadVideo("od-video", videoWidth, videoHeight);

function detectObjectsInRealTime(video, net) {
  const canvas = document.getElementById("od-output");
  const ctx = canvas.getContext("2d");

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  async function objectDetectionFrame() {
    let objects = await net.detect(video);

    ctx.clearRect(0, 0, videoWidth, videoHeight);

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();

    for(let i = 0; i < objects.length; ++i){
      if(objects[i]["score"] > minConfidenceLevel){
        let a = 1
      }
      let corners =  objects[i]["bbox"];
      ctx.rect(
          parseInt(corners[0], 10), parseInt(corners[1], 10), parseInt(corners[2] - corners[1], 10),
          parseInt(corners[3] - corners[0], 10)
        );

      ctx.strokeStyle = "red";
      ctx.stroke();
    }

    requestAnimationFrame(objectDetectionFrame);
  }
  objectDetectionFrame();
}

export async function bindPage() {
  const model = await cocoSsd.load("mobilenet_v1");
  let video;

  try {
    video = await loadVideo("od-video", videoWidth, videoHeight);
  } catch (e) {
    throw e;
  }
  detectObjectsInRealTime(video, model);
}

bindPage();
