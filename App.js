import React from "react";
import VideoRecorder from "./recordView";
import DisplaySpeed from "./dispalySpeed";
import Permissions from "./permissions";
import "./styles.css";
// import $ from 'jquery';

function App() {

  return (
    <>
      <h1 id="title">Video Recorder</h1>
      <br/>
      <VideoRecorder />
      <DisplaySpeed />
      <Permissions />
    </>
  );
}

export default App;
