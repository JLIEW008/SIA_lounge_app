async function setupCamera(videoId, width, height) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
        "Browser API navigator.mediaDevices.getUserMedia not available");
  }

  const video = document.getElementById(videoId);
  video.width = width;
  video.height = height;

  const stream = await navigator.mediaDevices.getUserMedia({
    "audio": false,
    "video": {
      facingMode: "user",
      width: width,
      height: height,
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

export async function loadVideo(videoId, width, height) {
  const video = await setupCamera(videoId, width, height);
  video.play();

  return video;
}
