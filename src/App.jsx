import { useState } from "react";

export default function App() {
  return (
    <main
      id="App"
      className="flex flex-col justify-center items-center text-3xl"
    >
      <div className="container">
        <label className="timerLabel" id="timer-label">
          Session
        </label>
        <div className="display" id="time-left">
          25:00
        </div>
        <button id="reset">{`⏹️`}</button>
        <button id="start_stop">{`⏯️`}</button>
      </div>

      <div className="container">
        <div className="breakContainer">
          <label className="breakLabel" id="break-label">
            Break Length
          </label>
          <div className="container flex">
            <button id="break-increment">{`+`}</button>
            <div className="display" id="break-length">
              5
            </div>
            <button id="break-decrement">{`-`}</button>
          </div>
        </div>
        <div className="sessionContainer">
          <label className="sessionLabel" id="session-label">
            Session Length
          </label>
          <div className="container flex">
            <button id="session-increment">{`+`}</button>
            <div className="display" id="session-length">
              5
            </div>
            <button id="session-decrement">{`-`}</button>
          </div>
        </div>
      </div>
    </main>
  );
}
