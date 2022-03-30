// ============= gRPC ============= //
let grpc = require("grpc")
var protoLoader = require("@grpc/proto-loader")
// var readline = require("readline")

//Read terminal Lines
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })

var proto = grpc.loadPackageDefinition(
  // protoLoader.loadSync("./gRPC/proto/chat.proto", {
  protoLoader.loadSync("./gRPC/proto/pose.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
)

const REMOTE_SERVER = "0.0.0.0:5001"

// let username
// let poseName

//Create gRPC client
// let client = new proto.grpc.ChatServer(
let client = new proto.pose.ActionServer(
  REMOTE_SERVER,
  grpc.credentials.createInsecure()
)

//Start the stream between server and client
function startChat() {
  // let channel = client.ChatStream({})
  let channel = client.ActionStream({})

  channel.on("data", onData)

  // rl.on("line", function (text) {
  //   client.SendNote({ name: username, message: text }, (res) => {})
  // })
  // client.SendNote({ name: username, message: poseName }, (res) => {})
}

//When server send a message
function onData(msg) {
  // if (msg.name == username) {
  //   return
  // }
  // console.log(`${msg.name}: ${msg.message}`)
  console.log(`${msg.name}`)
}

//Ask user name than start the chat
// rl.question("What's ur name? ", (answer) => {
//   username = answer

//   startChat()
// })
startChat()

// ============= Server ============= //
// Using express: http://expressjs.com/
var express = require("express")
var cors = require("cors")
// Create the app
var app = express()

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(3000, listen)

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://" + host + ":" + port)
}

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// }
// app.use(cors(corsOptions))
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*") //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
//   res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type")
//   res.setHeader("Access-Control-Allow-Credentials", true)
//   next()
// })
// app.use(express.static("sketch.js"))
// app.use(cors({ origin: "*" }))

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require("socket.io")(server)
// var io = require("socket.io")(server, { origins: "*:*" })
// var io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true,
//   },
// })

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on(
  "connection",
  // We are given a websocket object in our function
  function (socket) {
    console.log("We have a new client: " + socket.id)

    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on("pose", function (data) {
      // Data comes in as whatever was sent, including objects
      console.log("Received: pose " + data)
      poseName = data
      console.log("Sending Note with message", data)
      // client.SendNote({ name: username, message: data }, (res) => {})
      client.ActionStream({ name: data }, (res) => {})

      // Send it to all other clients
      // socket.broadcast.emit("mouse", data)

      // This is a way to send to everyone including sender
      // io.sockets.emit('message', "this goes to everyone");
    })

    socket.on("disconnect", function () {
      console.log("Client has disconnected")
    })
  }
)
