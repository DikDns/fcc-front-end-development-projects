import { useState } from "react";

function Drum() {
  const [currentPadBank, setCurrentPadBank] = useState([
    { id: `Heater-1`, keyCode: 81, keyTrigger: `Q`, audio: new Audio() },
  ]);
  const [currentPadBankId, setCurrentPadBankId] = useState(`heater-kit`);
  const [display, setDisplay] = useState(`Heater Kit`);
  const [power, setPower] = useState(true);
  const [sliderVal, setSliderVal] = useState(0.3);

  return (
    <main id="drum-machine">
      <div id="drum-container">
        <div id="display"></div>
        <div id="drum-pad-container">
          <button type="button" className={`drum-pad`} id="Heater-1">
            <audio id="Q" src="#"></audio>Q
          </button>
          <button type="button" className={`drum-pad`} id="Heater-2">
            <audio id="W" src="#"></audio>W
          </button>
          <button type="button" className={`drum-pad`} id="Heater-3">
            <audio id="E" src="#"></audio>E
          </button>
          <button type="button" className={`drum-pad`} id="Heater-4">
            <audio id="A" src="#"></audio>A
          </button>
          <button type="button" className={`drum-pad`} id="Heater-5">
            <audio id="S" src="#"></audio>S
          </button>
          <button type="button" className={`drum-pad`} id="Heater-6">
            <audio id="D" src="#"></audio>D
          </button>
          <button type="button" className={`drum-pad`} id="Heater-7">
            <audio id="Z" src="#"></audio>Z
          </button>
          <button type="button" className={`drum-pad`} id="Heater-8">
            <audio id="X" src="#"></audio>X
          </button>
          <button type="button" className={`drum-pad`} id="Heater-9">
            <audio id="C" src="#"></audio>C
          </button>
        </div>
      </div>
    </main>
  );
}

export default Drum;
