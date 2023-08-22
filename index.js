import express from "express"
import https from "https"
import cors from "cors"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, "./test", "dist")))
app.get("*", (req, res, next) => {
   if (req.path.endsWith(".mjs") || req.path.endsWith(".js")) {
      next() // This is a request for a JavaScript file, let the static file handler handle it
   } else {
      res.sendFile(path.join(__dirname, "./test", "dist", "index.html")) // Serve index.html for all other routes
   }
})
let server
// if (process.env.NODE_ENV === "production") {
   // server = https.createServer(
   //    {
   //       key: fs.readFileSync(path.join(__dirname, "./certs/cert.key")),
   //       cert: fs.readFileSync(path.join(__dirname, "./certs/cert.crt"))
   //    },
   //    app
   // )
// } else {
   server = http.createServer(app)
// }
const PORT = 8080 // process.env.PORT || 8080;
server.listen(PORT, () => {
   console.log("PROTOCOL", process.env.NODE_ENV)
})

// import express from "express"
// import http from "http"
// import { Server } from "socket.io";
// import cors from "cors";

// import Router from "./routes/index.js";

// const PORT = 3001

// const app = express();
// app.use(cors());

// app.use("/", Router)

// const server = http.createServer(app)

// const io = new Server(server, {
//     cors: {
//     origin: "*",
//     methods: ["GET", "POST"]}
// })

// io.on("connection", (socket) =>{

//     socket.on("refresh", (data) =>{
//         socket.broadcast.emit("got refresh", data)
//     })

//     socket.on("navClick", (data) =>{
//         socket.broadcast.emit("got navClick", data)
//     })

//     socket.on("introClick", (data) =>{
//         socket.broadcast.emit("got introClick", data)
//     })

//     socket.on("introSwipe", (data) =>{
//         socket.broadcast.emit("got introSwipe", data)
//     })

//     socket.on("mapsClick", (data) =>{
//         socket.broadcast.emit("got mapsClick", data)
//     })

//     socket.on("mapsScroll", (data) =>{
//         socket.broadcast.emit("got mapsScroll", data)
//     })

//     socket.on("mapsTouch", (data) =>{
//         socket.broadcast.emit("got mapsTouch", data)
//     })

//     socket.on("storyScroll", (data) =>{
//         socket.broadcast.emit("got storyScroll", data)
//     })

//     socket.on("storyTouch", (data) =>{
//         socket.broadcast.emit("got storyTouch", data)
//     })

//     socket.on("logoClick", (data) =>{
//         socket.broadcast.emit("got logoClick", data)
//     })

//     socket.on("goFav", (data) =>{
//         socket.broadcast.emit("got goFav", data)
//     })

//     socket.on("favClick", (data) =>{
//         socket.broadcast.emit("got favClick", data)
//     })

//     socket.on("shareClick", (data) =>{
//         socket.broadcast.emit("got shareClick", data)
//     })
// })

// server.listen(PORT, () =>{
//     console.log("Server listening at: ", PORT)
// })
