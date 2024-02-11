// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import './modal.css';

const App = () => {
  const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [modal, setModal] = useState(false);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      const totalTimeInSeconds = remainingTime.hours * 3600 + remainingTime.minutes * 60 + remainingTime.seconds;
      let countdown = totalTimeInSeconds;
      timer = setInterval(() => {
        if (countdown > 0) {
          countdown--;
          const remainingHours = Math.floor(countdown / 3600);
          const remainingMinutes = Math.floor((countdown % 3600) / 60);
          const remainingSeconds = countdown % 60;
          setRemainingTime({ hours: remainingHours, minutes: remainingMinutes, seconds: remainingSeconds });
        } else {
          clearInterval(timer);
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [remainingTime.hours, remainingTime.minutes, remainingTime.seconds, isRunning]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleToggleStartPause  =  () => {
    setIsRunning(!isRunning) ; 
  }

  const handleSubmit = () => {
    const newHours = parseInt(hours) || 0;
    const newMinutes = parseInt(minutes) || 0;
    const newSeconds = parseInt(seconds) || 0;
    setRemainingTime({ hours: newHours, minutes: newMinutes, seconds: newSeconds });
    toggleModal();
  };

 

  const handleRestart = () => {
    setIsRunning(false);
    setRemainingTime({ hours: 0, minutes: 0, seconds: 0 }); // Reset to initial time
  };

 

  const handleEditTimer = () => {
    toggleModal();
    setIsRunning(false);
  };

  return (
    <div className='main'>
      <div className='timer'>
        <Header>
          {`${remainingTime.hours.toString().padStart(2, '0')}:${remainingTime.minutes
            .toString()
            .padStart(2, '0')}:${remainingTime.seconds.toString().padStart(2, '0')}`}
        </Header>
      </div>
      <div className='buttons'>
        <button className='editTimer' onClick={handleEditTimer}>
          Edit Timer
        </button>
        <button className='restart' onClick={handleRestart}>
          Restart
        </button>
        <button className={isRunning ? 'pause'   : 'start'} onClick={handleToggleStartPause}>
         {isRunning ? 'Pause' : 'Start'}
        </button>
      
        {modal && (
          <div className='modal'>
            <div onClick={toggleModal} className='overlay'></div>
            <div className='modal-content'>
              <div className='editTime'>
                Edit Timer
                <button className='close-modal' onClick={toggleModal}>
                  X
                </button>
              </div>
              <div className='time-input-container'>
                <input
                  type='number'
                  className='time-input'
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder='Hours'
                  min='0'
                  max='23'
                />
                <input
                  type='number'
                  className='time-input'
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  placeholder='Minutes'
                  min='0'
                  max='59'
                />
                <input
                  type='number'
                  className='time-input'
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  placeholder='Seconds'
                  min='0'
                  max='59'
                />
                <button className='submit-btn' onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
