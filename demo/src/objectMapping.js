import * as cocoSsd from "@tensorflow-models/coco-ssd";
import {loadVideo} from "./cameraSetup.js";



//const model = await cocoSsd.load();

const videoWidth = 600;
const videoHeight = 500;

const video = loadVideo("od-video", videoWidth, videoHeight);

//const predictions = model.detect(video);
video.width = videoWidth;
video.height = videoHeight;
