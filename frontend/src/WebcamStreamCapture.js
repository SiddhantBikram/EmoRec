import React, { useState } from "react";
import Webcam from "react-webcam";
import IconButton from "@mui/material/IconButton";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CancelIcon from "@mui/icons-material/Cancel";
import {  Button, Tooltip } from '@mui/material';
import './ChatPage.css';


const WebcamStreamCapture = ({ toggleListening, handleSendMessage, clearTranscript }) => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [isMinimized, setIsMinimized] = useState(false);

    // Function to toggle the webcam on and off
    const toggleWebcam = () => {
      setIsMinimized(!isMinimized);
    };
  
    // Function to close the webcam
    const closeWebcam = () => {
      setIsMinimized(true);
    };
  
    const handleVoiceAndVideoCapture = () =>{
        handleStartCaptureClick(true);
    }
      
    const videoConstraints = {
      width: 200,
      height: 200,
      facingMode: "user"
    };

    const handleStartCaptureClick = React.useCallback((wantVoice) => {
      if(wantVoice){
        toggleListening();
      }
      setCapturing(true);

      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
     
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = () => {
      mediaRecorderRef.current.stop();
      handleSendMessage();
      clearTranscript(true);
      setCapturing(false);
    };
  
    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
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
  
    return (
      <div>
        <div className={isMinimized? "webcam-container webcome-circle-close" : "webcam-container webcome-circle-open" }>
          {isMinimized ? (
            <IconButton aria-label="Maximize Webcam" onClick={toggleWebcam}>
              <VideoCameraFrontIcon/>
            </IconButton>
          ) : (
            <>
            <div style={{height: "200px"}}>
              <Webcam audio={true} ref={webcamRef} muted = {true} mirrored={true}/>
            </div>
            <IconButton
                aria-label="Close Webcam"
                onClick={closeWebcam}
                style={{
                  position: 'absolute',
                  top: 80,
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
        <div style={{ display: "flex", justifyContent: "space-around", gap: "20px"}}>
          {capturing ? (
              <Tooltip title="Stop Capture">
                <Button
                  sx={{
                    backgroundColor: '#233036',
                    '&:hover': {
                      backgroundColor: '#447796',
                    },
                  }}
                  variant="contained"
                  onClick={handleStopCaptureClick}
                >
                  Stop Capture
              </Button>
              </Tooltip>
            ) : (
              <>
              <Tooltip title="Start Capture">
                <Button
                  sx={{
                    backgroundColor: '#233036',
                    '&:hover': {
                      backgroundColor: '#447796',
                    },
                  }}
                  variant="contained"
                  onClick={() => handleStartCaptureClick(false)}
                  >
                  Record Video
              </Button>
              </Tooltip>
              <Tooltip title="Start Capture (With Audio)">
                <Button
                  sx={{
                    backgroundColor: '#233036',
                    '&:hover': {
                      backgroundColor: '#447796',
                    },
                  }}
                  variant="contained"
                  onClick={handleVoiceAndVideoCapture}
                >
                  Record Video + Audio
              </Button>
              </Tooltip>
              </>
            )}
            {recordedChunks.length > 0 && (
              <Tooltip title="Download">
                <Button
                  sx={{
                    backgroundColor: '#233036',
                    '&:hover': {
                      backgroundColor: '#447796',
                    },
                  }}
                  variant="contained"
                  onClick={handleDownload}
                >
                  Download
                </Button>
            </Tooltip>
          )}
        </div>
      </div>
    );
  };

  export default WebcamStreamCapture;