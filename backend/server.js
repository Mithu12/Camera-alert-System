const express = require("express");

const cors = require('cors')


// needed to use socket.io


const http = require("http");
const app = express();




// const socketio = require("socket.io");


app.use(cors())

const server = http.createServer(app);

// const io = socketio(server)
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });




io.on("connection", socket => {

    socket.join('camera room')
  
    socket.on('sender', async ({cameraId}) =>{
      console.log(cameraId)
      socket.to('camera room').emit('received',{message:cameraId})
    })
  
  
  
    
  
    socket.on("disconnect", () =>console.log("Disconnected"));
  });




const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));