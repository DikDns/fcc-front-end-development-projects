import { useState, useEffect } from "react";

const STATE_RUNNING = `running`;
const STATE_STOPPED = `stopped`;
const STATE_PAUSED = `paused`;

export default function useTimer(durationArg) {
  const [duration, setDuration] = useState(durationArg);
  const [display, setDisplay] = useState(null);
  const [states, setStates] = useState({
    duration: duration,
    start: false,
    stop: false,
    pause: false,
    reset: false,
  });
  const [currentState, setCurrentState] = useState(STATE_STOPPED);

  const [intervalId, setIntervalId] = useState(null);

  function startTimer(duration) {
    if (intervalId) {
      clearInterval(intervalId);
    }

    let start = Date.now(),
      diff,
      minutes,
      seconds;

    function timer() {
      // get the number of seconds that have elapsed since
      // startTimer() was called
      diff = duration - (((Date.now() - start) / 1000) | 0);

      // does the same job as parseInt truncates the float
      minutes = (diff / 60) | 0;
      seconds = diff % 60 | 0;

      minutes = minutes < 10 ? `0` + minutes : minutes;
      seconds = seconds < 10 ? `0` + seconds : seconds;

      setDisplay(() => minutes + `:` + seconds);
      setDuration(() => diff);

      if (diff <= 0) {
        // add one second so that the count down starts at the full duration
        // example 05:00 not 04:59
        start = Date.now() + 1000;
      }
    }

    // we don't want to wait a full second before the timer starts
    timer();

    const currentIntervalId = setInterval(timer, 1000);

    setIntervalId(() => currentIntervalId);
    setStates((states) => ({
      ...states,
      start: false,
      stop: false,
      pause: false,
      reset: false,
    }));
  }

  function stopTimer() {
    if (!intervalId) return;
    clearInterval(intervalId);
    setIntervalId(() => null);

    setStates((states) => ({
      ...states,
      start: false,
      stop: false,
      pause: false,
      reset: false,
    }));
  }

  function setTimer(stateArgs) {
    let newStates;

    // If passing callback func
    if (typeof stateArgs === `function`) {
      newStates = stateArgs(states);
    } else if (stateArgs === Object(stateArgs)) {
      newStates = { ...stateArgs };
    }

    if (!newStates.hasOwnProperty(`start`)) {
      newStates.start = false;
    }
    if (!newStates.hasOwnProperty(`stop`)) {
      newStates.stop = false;
    }
    if (!newStates.hasOwnProperty(`reset`)) {
      newStates.reset = false;
    }
    if (!newStates.hasOwnProperty(`pause`)) {
      newStates.pause = false;
    }
    if (!newStates.hasOwnProperty(`duration`)) {
      newStates.duration = duration;
    }

    // Prevent multiple states true
    if (newStates.start && (newStates.stop || newStates.reset)) return false;

    setStates(() => newStates);
    setDuration(() => newStates.duration);
    return true;
  }

  useEffect(() => {
    if (duration > 0) return;
    setCurrentState(() => STATE_STOPPED);
    stopTimer();
  }, [duration]);

  useEffect(() => {
    if (states.start && (states.stop || states.reset)) return;

    if (states.start) {
      setCurrentState(() => STATE_RUNNING);
      startTimer(states.duration);
    }

    if (states.pause) {
      setCurrentState(() => STATE_PAUSED);
      stopTimer();
    }

    if (states.stop) {
      setCurrentState(() => STATE_STOPPED);
      stopTimer();
    }

    if (states.reset) {
      setCurrentState(() => STATE_STOPPED);
      stopTimer();
      setDisplay(() => null);
    }
  }, [states]);

  return [{ duration, display, state: currentState }, setTimer];
}

export const TIMER_STATE = {
  RUNNING: STATE_RUNNING,
  STOPPED: STATE_STOPPED,
  PAUSED: STATE_PAUSED,
};
