// src/components/Stopwatch.js
import React, { useState, useRef } from "react";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);

  // Format time into mm:ss:ms
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  // Start stopwatch
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);

      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
  };

  // Pause stopwatch
  const handlePause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  // Reset stopwatch
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Record lap
  const handleLap = () => {
    if (isRunning) {
      setLaps((prev) => [formatTime(time), ...prev]);
    }
  };

  return (
    <div className="stopwatch-container">
      <h1 className="title">Stopwatch App</h1>

      <div className="time-display">{formatTime(time)}</div>

      <div className="buttons">
        <button onClick={handleStart} className="btn start">
          Start
        </button>

        <button onClick={handlePause} className="btn pause">
          Pause
        </button>

        <button onClick={handleReset} className="btn reset">
          Reset
        </button>

        <button onClick={handleLap} className="btn lap">
          Lap
        </button>
      </div>

      {/* Lap Times */}
      <div className="laps-section">
        <h2>Laps</h2>

        {laps.length === 0 ? (
          <p className="no-laps">No laps recorded yet.</p>
        ) : (
          <ul className="laps-list">
            {laps.map((lap, index) => (
              <li key={index}>
                Lap {laps.length - index} → {lap}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
