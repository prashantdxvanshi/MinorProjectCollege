const express = require('express')
const mongoose=require('mongoose');



const { courseRoutes } = require('./routes/course');
const { adminRoutes } = require('./routes/admin');
const app = express();
require("dotenv").config();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const port = 4000
const cors = require("cors");
const multer = require('multer');
app.use(cors());






app.use("/course",courseRoutes);
// in above case courseRoutes should be router means express router mostly used
// courseRoutes(app); in this case also courseRoutes should be function
app.use("/admin",adminRoutes);


async function main(){
await mongoose.connect(process.env.MONGODB_URL);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}
main();




const { WebSocketServer, WebSocket }=require ("ws");
const wss = new WebSocketServer({ port: 8080 });

let allsockets = [
  {
    socket: WebSocket,
    room: String,
  },
];
wss.on("connection", function (socket) {

  console.log("connected user ");
  socket.on("message", (msg) => {
    const parsedmsg = JSON.parse(msg);
    console.log("parsedmsg", parsedmsg);

    if (parsedmsg.type === "join") {
      // console.log("joined the room");
      allsockets.push({
        socket,
        room: parsedmsg.payload.room,
      });
    }
    if (parsedmsg.type === "chat") {
      console.log("want to chat ");
      let currentUserRoom = null;

      for (let i = 0; i < allsockets.length; i++) {
        if (allsockets[i].socket == socket) {
            //   console.log("inside socket checking")
            currentUserRoom = allsockets[i].room;
              console.log(allsockets[i].room)
        }
      
      }
      for (let i = 0; i < allsockets.length; i++) {
        console.log(currentUserRoom);
        if (allsockets[i].room == currentUserRoom) {
          allsockets[i].socket.send(JSON.stringify(parsedmsg));
        }
      }
    }
  });
});
