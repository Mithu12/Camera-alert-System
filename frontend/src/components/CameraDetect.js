
import io from "socket.io-client";

import {createRef, useEffect, useState} from "react";

const CameraDetect = (props) => {


    const video = createRef();
    const video1 = createRef();
    const video2 = createRef();


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





    // useEffect(() => {
    //
    //     navigator.mediaDevices.enumerateDevices().then(devices => {
    //         devices.map(device => {
    //             if (device.kind === 'videoinput') {
    //                 setCameras([...cameras, device.deviceId])
    //             }
    //         })
    //
    //     })
    //
    // }, []);

    // console.log(cameras)


    useEffect(() => {
        let currentNumber = 1
        // navigator.mediaDevices.enumerateDevices().then(devices => {
        //     console.log(devices)
        //     devices.map((device, index) => {
        //                 if (device.kind === 'videoinput') {
        //                     console.log(device)
        //                 }
        //     })
        // })
        navigator.mediaDevices.enumerateDevices().then(devices => {
            devices.map((device, index) => {
                if (device.kind === 'videoinput') {
                    console.log(device.deviceId)
                    navigator.mediaDevices.getUserMedia({
                        video: {
                            deviceId: {
                                exact: device.deviceId
                            }
                        },
                        audio: true,
                    }).then(stream => {
                        console.log(stream)
                        // video1.sinkId = device.deviceId
                        let v = (currentNumber === 1 ? video : (currentNumber === 2 ? video1 : video2))
                        // const v = video
                        currentNumber++;
                        console.log(v)
                        v.current.srcObject = stream;
                        v.current.defaultMuted = true;
                        v.current.muted = true;
                        v.current.onloadedmetadata = function (e) {
                            v.current.play();
                        }

                    }).catch(e => {
                        console.log(e)
                    })
                }
            })

        }).catch(e=>{
            console.log(e)
        })
        // navigator.mediaDevices.getUserMedia({
        //     video: true,
        //     audio: true
        // }).then(stream => {
        //     console.log(stream)
        //     // addVideo(myVideo, stream)
        //     // myVideo?.current?.srcObject = (stream)
        //     // myVideo?.current?.addEventListener('loadedmetadata', ()=>{
        //     //     myVideo?.current.play()
        //     // })
        //     video.current.srcObject = stream;
        //     video.current.defaultMuted = true;
        //     video.current.muted = true;
        //     video.current.onloadedmetadata = function (e) {
        //         video.current.play();
        //     };
        //
        //
        //     // video1.current.srcObject = stream;
        //     // video1.current.defaultMuted  = true;
        //     // video1.current.muted = true;
        //     // video1.current.onloadedmetadata = function(e) {
        //     //     video1.current.play();
        //     // }
        //
        //     // videoGrid.append(myVideo)
        // })
    }, [])











    const style = {border: '5px solid red'}

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
           {/*<div className={cameraId ===1 ?"camera active" :  "camera"}>*/}
           {/*     <h2 className="ctext">Camera 1</h2>*/}
           {/*</div>*/}
           {/*<div className={cameraId ===2 ?"camera active" :  "camera"}>*/}
           {/*     <h2 className="ctext">Camera 2</h2>*/}
           {/*</div>*/}
           {/*<div className={cameraId ===3 ?"camera active" :  "camera"}>*/}
           {/*     <h2 className="ctext">Camera 3</h2>*/}
           {/*</div>*/}
           {/*<div className={cameraId ===4 ?"camera active" :  "camera"}>*/}
           {/*     <h2 className="ctext">Camera 4</h2>*/}
           {/*</div>*/}


            <video ref={video1} width={'300px'} autoPlay style={ cameraId === 1 ? style : {} }></video>

            <video ref={video}  width={'300px'} autoPlay style={ cameraId === 2 ? style : {} }></video>

            <video ref={video2}  width={'300px'} autoPlay style={ cameraId === 3 ? style : {} }></video>





            {/* <button onClick={yoyo}>click</button> */}
        </div>
    )
};

export default CameraDetect;


