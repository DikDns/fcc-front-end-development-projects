import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faPlayCircle,
  faStopCircle,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons";

import useTimer, { TIMER_STATE } from "./hooks/useTimer";

// Default Duration in Seconds
const DEFAULT_DURATION_UNIT = 60;
// 25 Minutes = 1500 Seconds
const DEFAULT_DURATION_SESSION = 1500;
// 5 Minutes = 300 Seconds
const DEFAULT_DURATION_BREAK = 300;

const ID_SESSION_INCREMENT = "session-increment";
const ID_SESSION_DECREMENT = "session-decrement";
const ID_BREAK_INCREMENT = "break-increment";
const ID_BREAK_DECREMENT = "break-decrement";

export default function App() {
  const beep = useRef(null);

  const [timer, setTimer] = useTimer(DEFAULT_DURATION_SESSION);
  const [type, setType] = useState(`Session`);

  const [breakLength, setBreakLength] = useState(DEFAULT_DURATION_BREAK / 60);
  const [sessionLength, setSessionLength] = useState(
    DEFAULT_DURATION_SESSION / 60
  );

  const handleBtnClick = (e) => {
    if (timer.state === TIMER_STATE.RUNNING) return;

    e.preventDefault();
    const btn = e.target;

    if (btn.id === ID_BREAK_INCREMENT) {
      if (breakLength >= 60) return;
      setBreakLength((prevState) => prevState + 1);
    }

    if (btn.id === ID_BREAK_DECREMENT) {
      if (breakLength <= 1) return;
      setBreakLength((prevState) => prevState - 1);
    }

    if (btn.id === ID_SESSION_INCREMENT) {
      if (sessionLength >= 60) return;
      setSessionLength((prevState) => prevState + 1);
    }

    if (btn.id === ID_SESSION_DECREMENT) {
      if (sessionLength <= 1) return;
      setSessionLength((prevState) => prevState - 1);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();

    beep.current.pause();
    beep.current.currentTime = 0;
    beep.current.volume = 1;

    setType(() => `Session`);
    setSessionLength(() => DEFAULT_DURATION_SESSION / 60);
    setBreakLength(() => DEFAULT_DURATION_BREAK / 60);
    setTimer(() => ({ reset: true }));
  };

  const handleStartStop = (e) => {
    e.preventDefault();

    if (timer.state === TIMER_STATE.STOPPED) {
      const duration = sessionLength * DEFAULT_DURATION_UNIT;
      setTimer(() => ({ start: true, duration }));
    }

    if (timer.state === TIMER_STATE.PAUSED) {
      setTimer(() => ({ start: true }));
    }

    if (timer.state === TIMER_STATE.RUNNING) {
      setTimer(() => ({ pause: true }));
    }
  };

  useEffect(() => {
    if (timer.duration > 0) return;

    beep.current.currentTime = 0;
    beep.current.volume = 1;
    beep.current.play();

    if (type === `Session`) {
      const duration = breakLength * DEFAULT_DURATION_UNIT;
      setTimer(() => ({ start: true, duration }));
      setType(() => `Break`);
      return;
    }

    if (type === `Break`) {
      const duration = sessionLength * DEFAULT_DURATION_UNIT;
      setTimer(() => ({ start: true, duration }));
      setType(() => `Session`);
      return;
    }
  }, [timer.duration]);

  return (
    <main
      id="App"
      className="flex flex-col justify-center items-center text-3xl"
    >
      <audio src="./assets/sounds/beep.mp3" id="beep" ref={beep}></audio>

      <div className="container">
        <div className="breakContainer">
          <label className="breakLabel" id="break-label">
            Break Length
          </label>
          <div className="container flex">
            <button
              id={ID_BREAK_DECREMENT}
              onClick={(e) => handleBtnClick(e)}
              className="btn"
            >
              <FontAwesomeIcon icon={faMinusCircle} />
            </button>
            <div className="display" id="break-length">
              {breakLength || `5`}
            </div>
            <button
              id={ID_BREAK_INCREMENT}
              onClick={(e) => handleBtnClick(e)}
              className="btn"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
          </div>
        </div>
        <div className="sessionContainer">
          <label className="sessionLabel" id="session-label">
            Session Length
          </label>
          <div className="container flex">
            <button
              id={ID_SESSION_DECREMENT}
              onClick={(e) => handleBtnClick(e)}
              className="btn"
            >
              <FontAwesomeIcon icon={faMinusCircle} />
            </button>
            <div className="display" id="session-length">
              {sessionLength || `25`}
            </div>
            <button
              id={ID_SESSION_INCREMENT}
              onClick={(e) => handleBtnClick(e)}
              className="btn"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <label className="timerLabel" id="timer-label">
          {type || `Session`}
        </label>
        <div className="display" id="time-left">
          {timer.display ||
            `${sessionLength < 10 ? `0` + sessionLength : sessionLength}:00`}
        </div>
        <button id="reset" onClick={(e) => handleReset(e)}>
          <FontAwesomeIcon icon={faStopCircle} />
        </button>
        <button id="start_stop" onClick={(e) => handleStartStop(e)}>
          <FontAwesomeIcon icon={faPlayCircle} />
        </button>
      </div>
    </main>
  );
}
