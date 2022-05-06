// ================== ml5 Section ================== //

const isFlipped = true
let keypointsPose = []
let videoImage
let poseLabel = " "

let state = "waiting"
let brain
let newTextShow = " "
let textShow = " "

var socket

function translateText() {
  if (poseLabel == "A") {
    newTextShow = "standing"
  } else if (poseLabel == "B") {
    newTextShow = "right_hand_raised"
  } else if (poseLabel == "C") {
    newTextShow = "left_hand_raised"
  } else if (poseLabel == "D") {
    newTextShow = "tree"
  } else if (poseLabel == "E") {
    newTextShow = "tree"
  } else if (poseLabel == "F") {
    newTextShow = "warrior"
  } else if (poseLabel == "G") {
    newTextShow = "warrior"
  } else if (poseLabel == "H") {
    newTextShow = "triangle"
  } else if (poseLabel == "I") {
    newTextShow = "triangle"
  } else if (poseLabel == "J") {
    newTextShow = "x_pose"
  } else if (poseLabel == "K") {
    newTextShow = "squad"
  } else {
    newTextShow = " "
  }
  if (newTextShow != textShow && newTextShow != " ") sendData(newTextShow)
  textShow = newTextShow
}

// function keyPressed() {
//   if (key == "s") {
//     brain.saveData()
//   } else if (key == "t") {
//     state = "training"
//     brain.loadData("data.json", trainCompleted)
//   } else if (key == "p") {
//     const modelInfo = {
//       model: "model/model.json",
//       metadata: "model/model_meta.json",
//       weights: "model/model.weights.bin",
//     }
//     brain.load(modelInfo, classifyPose)
//   } else {
//     targetLabel = key
//     console.log(targetLabel)
//     setTimeout(function () {
//       console.log("collecting")
//       state = "collecting"
//       setTimeout(function () {
//         console.log("not collecting")
//         state = "waiting"
//       }, 15000)
//     }, 5000)
//   }
// }

function loadModel555() {
  // console.log("load model ")
  const modelInfo = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  }
  brain.load(modelInfo, classifyPose)
}

// Classificdation
function classifyPose() {
  if (pose && keypointsPose) {
    let inputs = []
    for (let i = 0; i < keypointsPose.length; i++) {
      let x = keypointsPose[i].x
      let y = keypointsPose[i].y
      inputs.push(x)
      inputs.push(y)
    }
    brain.classify(inputs, gotResult)
  } else {
    setTimeout(classifyPose, 100)
  }
}

function gotResult(error, results) {
  if (results && results[0].confidence > 0.75) {
    poseLabel = results ? results[0].label.toUpperCase() : " "
  }
  //console.log(results[0].confidence);
  classifyPose()
}

// Load
function trainCompleted() {
  brain.normalizeData()
  brain.train({ epochs: 100 }, () => {
    state = "waiting"
    brain.save()
  })
}

const videoElement = document.getElementsByClassName("input_video")[0]
videoElement.style.display = "none"

function onPoseResults(results) {
  keypointsPose = results.poseLandmarks
  // console.log(keypointsPose);
  if (keypointsPose && state == "collecting") {
    let inputs = []
    for (let i = 0; i < keypointsPose.length; i++) {
      let x = keypointsPose[i].x
      let y = keypointsPose[i].y
      inputs.push(x)
      inputs.push(y)
    }
    let target = [targetLabel]
    brain.addData(inputs, target)
  }
}

const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
  },
})

pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
})
pose.onResults(onPoseResults)
// console.log(pose);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({ image: videoElement })
  },
  width: 1280,
  height: 1080,
})
camera.start()

function sendData(pose) {
  console.log("Sending...", pose)
  socket.emit("pose", pose)
}

function setup() {
  createCanvas(960, 480)
  videoImage = createGraphics(640, 360)
  brain = ml5.neuralNetwork({
    inputs: 68,
    outputs: 11,
    task: "classification",
    debug: true,
  })

  setTimeout(loadModel555, 1000)
  // ============= Socket ============= //
  // Start a socket connection to the server
  // Some day we would run this server somewhere else

  // socket = io.connect("http://host.docker.internal:3000")
  socket = io.connect("http://0.0.0.0:3000")

  // const io = require("socket.io-client");
  // socket = io("http://localhost:3000", {
  //   withCredentials: true,
  //   extraHeaders: {
  //     "my-custom-header": "abcd",
  //   },
  // })
  // We make a named event called 'mouse' and write an
  // anonymous callback function

  // socket.on('mouse',
  //   // When we receive data
  //   function(data) {
  //     console.log("Got: " + data.x + " " + data.y);
  //     // Draw a blue circle
  //     fill(0,0,255);
  //     noStroke();
  //     ellipse(data.x, data.y, 20, 20);
  //   }
  // );
  // button = createButton('Start Predict');
  // button.position(0, 0);
  // button.mousePressed(loadModel555);
}

function draw() {
  translateText()
  background(255, 255, 255)
  stroke(0, 0, 255)
  strokeWeight(2)
  fill(0, 255, 0)

  videoImage.drawingContext.drawImage(
    videoElement,
    0,
    0,
    videoImage.width,
    videoImage.height
  )

  push()
  if (isFlipped) {
    translate(width, 0)
    scale(-1, 1)
  }
  displayWidth = width
  displayHeight = (width * videoImage.height) / videoImage.width
  if (state != "training") image(videoImage, 0, 0, displayWidth, displayHeight)
  pop()

  if (keypointsPose && keypointsPose.length > 0) {
    for (let i = 0; i < 32; i++) {
      indexTip = keypointsPose[i]
      let xx = (1 - indexTip.x) * displayWidth
      let yy = indexTip.y * displayHeight
      ellipse(xx, yy, 20)
    }
    stroke(0, 0, 255)
    // strokeWeight(w2);
  }
  fill(0, 255, 0)
  noStroke()
  textSize(64)
  textAlign(CENTER, CENTER)
  if (state !== "collecting") text(textShow, width / 2, height / 2)
}
