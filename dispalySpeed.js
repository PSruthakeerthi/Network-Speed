import { useEffect, useState } from "react";
import "./styles.css";
// import $ from 'jquery';

function DisplaySpeed() {
  const [bps, setBps] = useState("");
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [endTime, setEndTime] = useState(0);
 
  var userImageLink =
    "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
  var downloadSize = 5616998;
  var downloadImgSrc = new Image();
  useEffect(()=>{
    const interval = setInterval(downloadImgSrc.onload,2000);
    return ()=> clearInterval(interval);
  })


    
   downloadImgSrc.onload = function () {
    console.log("I am called");
      setEndTime(new Date().getTime());
      setStartTime(startTime);
      displaySpeed();

    };
    downloadImgSrc.src = userImageLink;
    const displaySpeed = () => {
      var timeDuration = (endTime - startTime) / 1000;
      var loadedBits = downloadSize * 8;
      setBps((((loadedBits / timeDuration)/1024)/1024).toFixed(2));
    };
   

  return (
  <>
 
  <p id="speed">Network Bandwidth:{bps}Mbps</p>
 
  </>
  );
}

export default DisplaySpeed;
