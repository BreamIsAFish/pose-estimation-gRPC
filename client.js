let grpc = require("grpc")
var protoLoader = require("@grpc/proto-loader")
var readline = require("readline")

//Read terminal Lines
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

var proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("proto/chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
)

const REMOTE_SERVER = "0.0.0.0:5001"

let username

//Create gRPC client
let client = new proto.grpc.ChatServer(
  REMOTE_SERVER,
  grpc.credentials.createInsecure()
)

//Start the stream between server and client
function startChat() {
  let channel = client.ChatStream({})

  channel.on("data", onData)

  rl.on("line", function (text) {
    client.SendNote({ name: username, message: text }, (res) => {})
  })
}

//When server send a message
function onData(msg) {
  if (msg.name == username) {
    return
  }
  console.log(`${msg.name}: ${msg.message}`)
}

//Ask user name than start the chat
rl.question("What's ur name? ", (answer) => {
  username = answer

  startChat()
})
