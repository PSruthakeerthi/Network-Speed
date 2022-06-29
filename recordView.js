import React from "react";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import "./styles.css";
function VideoRecorder() {
  const [timer, setTimer] = useState(0);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);
  const [btnIsDisabled,setBtnIsDisabled] = useState(true);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef,handleDataAvailable]);

  

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const enableWebCam = () => {
    setIsWebCamEnabled(true);
    setBtnIsDisabled(!btnIsDisabled);
  
  };
  let interval = useRef(null);
  const timerHandler = () => {
    interval.current = setInterval(() => {
      interval = setTimer((timer) => timer + 1);
    }, 1000);
  };

  const stopTimerHandler = () => {
    clearInterval(interval.current);
    setTimer(0);
  };

   const stopWebcam = () => {
    webcamRef.current.stream.getTracks().forEach((track) => track.stop());
  };
  return (
    <>
       {isWebCamEnabled ? <> 
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <p id="timer">{timer}s</p></>: (
        <button id = "enableBtn" onClick={enableWebCam}>Enable Webcam</button>
      )}
      
     <div id="Btndiv"> {capturing ? (
        <button id="stopBtn" onClick={()=>{

        handleStopCaptureClick();
        stopTimerHandler()}}>Stop</button>
      ) : (
        <button id="startBtn" onClick={()=>{
            
        handleStartCaptureClick();
        timerHandler()}} disabled={btnIsDisabled}>Start</button>
      )}
      <button id="selfieBtn" onClick={capture} disabled = {btnIsDisabled}>Capture</button>

      {recordedChunks.length > 0 && (
        <button id="downloadBtn" onClick={handleDownload}>Download</button>
        
      )}
      
      <button id="disableBtn" onClick={stopWebcam}>Disable WebCam</button></div>
      {imgSrc && <img id="myPic" src={imgSrc} alt="" />}
    </>
  );
}
export default VideoRecorder;
