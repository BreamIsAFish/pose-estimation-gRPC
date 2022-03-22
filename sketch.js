// ================== gRPC Section ================== //

// import grpc from "grpc"
// import protoLoader from "@grpc/proto-loader"
// import readline from "readline"

// var grpc = require("@grpc/grpc-js")
// var protoLoader = require("@grpc/proto-loader")
// var readline = require("readline")

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })

// var proto = grpc.loadPackageDefinition(
//   protoLoader.loadSync("proto/chat.proto", {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true,
//   })
// )

// const REMOTE_SERVER = "0.0.0.0:5001"

// let username

// //Create gRPC client
// let client = new proto.grpc.ChatServer(
//   REMOTE_SERVER,
//   grpc.credentials.createInsecure()
// )

// //Start the stream between server and client
// function startChat() {
//   let channel = client.ChatStream({})

//   channel.on("data", onData)

//   rl.on("line", function (text) {
//     client.SendNote({ name: username, message: text }, (res) => {})
//   })
// }

// //When server send a message
// function onData(msg) {
//   if (msg.name == username) {
//     return
//   }
//   console.log(`${msg.name}: ${msg.message}`)
// }

// //Ask user name than start the chat
// rl.question("What's ur name? ", (answer) => {
//   username = answer

//   startChat()
// })

// ================== ml5 Section ================== //

const isFlipped = true
let keypointsPose = []
let videoImage
let poseLabel = " "

let state = "waiting"
let brain
let newTextShow = " "
let textShow = " "

function translateText() {
  if (poseLabel == "1") {
    newTextShow = "Tree"
  } else if (poseLabel == "2") {
    newTextShow = "Triangle"
  } else if (poseLabel == "3") {
    newTextShow = "Worrior"
  } else if (poseLabel == "4") {
    newTextShow = "X-pose"
  } else if (poseLabel == "5") {
    newTextShow = "Squat"
  } else if (poseLabel == "6") {
    newTextShow = "Standing"
  } else {
    newTextShow = " "
  }
  // if (newTextShow != textSh ername, message: newTextShow }, (res) => {})
  textShow = newTextShow
}

function keyPressed() {
  if (key == "s") {
    brain.saveData()
  } else if (key == "t") {
    state = "training"
    brain.loadData("data.json", trainCompleted)
  } else if (key == "p") {
    const modelInfo = {
      model: "model/model.json",
      metadata: "model/model_meta.json",
      weights: "model/model.weights.bin",
    }
    brain.load(modelInfo, classifyPose)
  } else {
    targetLabel = key
    console.log(targetLabel)
    setTimeout(function () {
      console.log("collecting")
      state = "collecting"
      setTimeout(function () {
        console.log("not collecting")
        state = "waiting"
      }, 15000)
    }, 5000)
  }
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
  brain.train({ epochs: 50 }, () => {
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

function setup() {
  createCanvas(960, 480)
  videoImage = createGraphics(640, 360)
  brain = ml5.neuralNetwork({
    inputs: 68,
    outputs: 6,
    task: "classification",
    debug: true,
  })
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
