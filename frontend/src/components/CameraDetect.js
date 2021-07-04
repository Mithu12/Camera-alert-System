
import io from "socket.io-client";

import {useEffect, useState} from "react";

const CameraDetect = (props) => {

    const socket = io("http://localhost:5000")

    const [cameraId, setCameraId] = useState(0);

    useEffect(() => {
    // console.log(socket)
        socket.emit('sender',{cameraId, sId:socket.id})
        socket.on('received',({message})=> {
            setCameraId(message)
        })
    }, [cameraId]);

    const yoyo = () => {
        setCameraId(cameraId+1)
    }
    // const style = {
    //     width:'200px',
    //     height:'200px',
    //     background: 'black',
    //     float: 'left',
    //     margin: '20px'
    // }

    // const style2 = {
    //     width:'200px',
    //     height:'200px',
    //     background: 'red',
    //     float: 'left',
    //     margin: '20px'
    // }

    // console.log(cameraId)

    return (
        <div className="main-container">
            {/* <div style={cameraId !== 1 ? style : style2}>1</div>
            <div style={cameraId !== 2 ? style : style2}>2</div>
            <div style={cameraId !== 3 ? style : style2}>a3</div>
            <div style={cameraId !== 4 ? style : style2}>4</div>
            <button onClick={yoyo}>click</button> */}
           <div className={cameraId ===1 ?"camera active" :  "camera"}>
                <h2 className="ctext">Camera 1</h2>
           </div>
           <div className={cameraId ===2 ?"camera active" :  "camera"}>
                <h2 className="ctext">Camera 2</h2>
           </div>
           <div className={cameraId ===3 ?"camera active" :  "camera"}>
                <h2 className="ctext">Camera 3</h2>
           </div>
           <div className={cameraId ===4 ?"camera active" :  "camera"}>
                <h2 className="ctext">Camera 4</h2>
           </div>
            {/* <button onClick={yoyo}>click</button> */}
        </div>
    )
};

export default CameraDetect;