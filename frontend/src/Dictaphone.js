import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import {
  Button,
  Tooltip,
} from '@mui/material';import MicOffIcon from '@mui/icons-material/MicOff';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './ChatPage.css';

const Dictaphone = forwardRef(({ onTranscriptChange }, ref) => {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

// Inside your Dictaphone component
useImperativeHandle(ref, () => ({
  clearTranscript: clearTranscript,
  isRecording: isListening,
}));


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening(!isListening);
  };

  const clearTranscript = () => {
    toggleListening();
    resetTranscript();
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <Tooltip title="Record Speech to Text">
        <Button
          variant="contained"
          color="primary"
          className="circularButton"
          onClick={toggleListening}
          sx={{
            backgroundColor: '#233036',
            '&:hover': {
              backgroundColor: '#447796',
            },
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
          }}
        >
          {isListening ? <MicIcon /> : <MicOffIcon />}
        </Button>
      </Tooltip>
      <Tooltip title="Clear Speech to Text">
        <Button
          sx={{
            backgroundColor: '#233036',
            '&:hover': {
              backgroundColor: '#447796',
            },
          }}
          variant="contained"
          onClick={resetTranscript}
        >
          Clear STT
        </Button>
      </Tooltip>
    </div>
  );
});

export default Dictaphone;
