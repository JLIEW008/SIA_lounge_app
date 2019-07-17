import * as cocoSsd from "@tensorflow-models/coco-ssd";

const video = document.getElementById("od-video");

const model = await cocoSsd.load();

const videoWidth = 600;
const videoHeight = 500;


const predictions = model.detect(video);
video.width = videoWidth;
video.height = videoHeight;
const stream = await navigator.mediaDevices.getUserMedia({
  "audio": false,
  "video": {
    facingMode: "user",
    width: videoWidth,
    height: videoHeight,
  },
});
video.srcObject = stream;

return new Promise((resolve) => {
  video.onloadedmetadata = () => {
    resolve(video);
  };
});
}
video.srcObject = stream;
console.log(predictions);
