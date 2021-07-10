const express = require("express");
const path = require("path");

// dotenv.config()

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

// const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('REST is active')
    })
}




const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));