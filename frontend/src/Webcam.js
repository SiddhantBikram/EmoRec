import React, { useState } from "react";
import Webcam from "react-webcam";
import IconButton from "@mui/material/IconButton";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CancelIcon from "@mui/icons-material/Cancel";
import "./ChatPage.css"; // Import your custom CSS file for styling
import WebcamStreamCapture from './WebcamStreamCapture';

const videoConstraints = {
  width: 200,
  height: 200,
  facingMode: "user"
};

const WebcamComp = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);

  // Function to toggle the webcam on and off
  const toggleWebcam = () => {
    setIsMinimized(!isMinimized);
  };

  // Function to close the webcam
  const closeWebcam = () => {
    setIsMinimized(true);
  };

  return (
    <div>
      {isMinimized ? (
        <IconButton aria-label="Maximize Webcam" onClick={toggleWebcam}>
          <VideoCameraFrontIcon/>
        </IconButton>
      ) : (
        <>
          <WebcamStreamCapture/>
          <IconButton
            aria-label="Close Webcam"
            onClick={closeWebcam}
            style={{
              position: 'absolute',
              top: 65,
              right: -10,
              backgroundColor: 'white',
              borderRadius: '50%'
            }}
          >
            <CancelIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default WebcamComp;
