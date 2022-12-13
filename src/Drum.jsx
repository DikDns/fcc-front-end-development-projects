import { useEffect, useState } from "react";

const HEATER = {
  id: `heater-kit`,
  name: `Heater Kit`,
  kits: [
    `Heater-1.mp3`,
    `Heater-2.mp3`,
    `Heater-3.mp3`,
    `Heater-4.mp3`,
    `Clap.mp3`,
    `Open-hh.mp3`,
    `Kick-n-hat.mp3`,
    `Kick.mp3`,
    `Close-hh.mp3`,
  ],
};

const SMOOTH_PIANO = {
  id: `smooth-piano-kit`,
  name: `Smooth Piano Kit`,
  kits: [
    `Chord-1.mp3`,
    `Chord-2.mp3`,
    `Chord-3.mp3`,
    `Shaker.mp3`,
    `Open-hh.mp3`,
    `Close-hh.mp3`,
    `Punchy-kick.mp3`,
    `Side-stick.mp3`,
    `Snare.mp3`,
  ],
};

const SOUND_KIT = [HEATER, SMOOTH_PIANO];
const KEYS = [
  [81, `Q`],
  [87, `W`],
  [69, `E`],
  [65, `A`],
  [83, `S`],
  [68, `D`],
  [90, `Z`],
  [88, `X`],
  [67, `C`],
];

function Drum() {
  const [padBank, setPadBank] = useState(
    SOUND_KIT.map((kit) => ({
      id: kit.id,
      name: kit.name,
      kitsTotal: kit.kits.length,
      kits: kit.kits.map((sound, i) => {
        return {
          id: sound.split(`.`)[0],
          name: sound.split(`.`)[0].split(`-`).join(` `),
          url: `./assets/sounds/${kit.id}/${sound}`,
          keyCode: KEYS[i][0],
          keyTrigger: KEYS[i][1],
        };
      }),
    }))
  );
  const [currentPadBank, setCurrentPadBank] = useState(padBank[0]);
  const [display, setDisplay] = useState(`Heater Kit`);
  const [power, setPower] = useState(true);
  const [sliderVal, setSliderVal] = useState(0.5);

  const handleSlider = (e) => {
    if (!power) return;
    setSliderVal(() => e.target.value / 100);
  };

  useEffect(() => {
    const audios = document.querySelectorAll(`.clip`);
    if (!audios) return;
    audios.forEach((audio) => {
      audio.volume = sliderVal;
    });
    const vol = Math.round(sliderVal * 100);
    setDisplay(() => `volume: ${vol}%`);
  }, [sliderVal]);

  const handlePadClick = (e) => {
    if (!power) return;
    if (!e.target.classList.contains("drum-pad")) return;
    if (sliderVal === 0) {
      setDisplay(() => `volume: muted`);
      return;
    }
    e.preventDefault();
    const audio = e.target.children[0];
    const namePad = currentPadBank.kits.find(
      (sound) => audio.id === sound.keyTrigger
    );
    if (!namePad) return;

    audio.currentTime = 0;
    audio.play();

    setDisplay(() => namePad.name);
  };

  useEffect(() => {
    const handlePadKeyDown = (e) => {
      if (!power) return;
      if (sliderVal === 0) {
        setDisplay(() => `volume: muted`);
        return;
      }
      e.preventDefault();
      const namePad = currentPadBank.kits.find(
        (sound) => e.keyCode === sound.keyCode
      );
      if (!namePad) return;
      const audio = document.querySelector(`#${namePad.keyTrigger}`);

      audio.currentTime = 0;
      audio.play();

      setDisplay(() => namePad.name);
    };

    document.addEventListener(`keydown`, handlePadKeyDown);
    return () => {
      document.removeEventListener(`keydown`, handlePadKeyDown);
    };
  }, [sliderVal, power]);

  const handleKitClick = (e) => {
    if (!power) return;
    if (e.target.type !== "button") return;
    e.preventDefault();
    const selectedPadBank = padBank.find((bank) => bank.id === e.target.id);
    if (!selectedPadBank) return;
    setCurrentPadBank(() => selectedPadBank);
    setDisplay(() => selectedPadBank.name);
  };

  const handlePowerClick = (e) => {
    e.preventDefault();
    setPower((state) => !state);
    setDisplay(() => (!power ? `Power: On` : `Power: Off`));
  };

  useEffect(() => {
    setDisplay(() => ``);
  }, []);

  return (
    <main
      id="drum-machine"
      className={`flex min-h-screen items-center justify-center`}
    >
      <div
        id="drum-container"
        className={`flex w-11/12 flex-col items-center justify-between rounded-md bg-red-400 p-4 sm:w-[600px] md:flex-row`}
      >
        <div
          onClick={(e) => handlePadClick(e)}
          id="drum-pad-container"
          className={`my-2 grid w-11/12 grid-cols-3 justify-items-center gap-2 rounded-md sm:w-[400px]`}
        >
          {currentPadBank.kits.map((kit) => (
            <button
              tabIndex={-1}
              key={kit.id}
              id={kit.id}
              type="button"
              className={`drum-pad h-20 w-full rounded-md bg-red-200 font-display sm:w-28`}
            >
              <audio
                className={`clip`}
                id={kit.keyTrigger}
                src={kit.url}
              ></audio>
              {kit.keyTrigger}
            </button>
          ))}
        </div>
        <div className={`flex flex-col items-center p-4`}>
          <div
            onClick={(e) => handlePowerClick(e)}
            id="power"
            className={`mb-2 flex flex-col items-center justify-center`}
          >
            Power
            <div className={`h-6 w-10 cursor-pointer bg-red-200 p-1`}>
              <div
                className={`${
                  power ? `float-right` : `float-left`
                } h-full w-1/2 bg-green-400 transition-all duration-500`}
              ></div>
            </div>
          </div>
          <div
            id="display"
            className={`text-md h-10 w-48 overflow-hidden rounded bg-red-200 text-center font-display leading-10 tracking-wide`}
          >
            {display}
          </div>
          <div id="controls">
            <input
              type="range"
              min={0}
              max={100}
              value={sliderVal * 100}
              id="volume"
              onChange={(e) => handleSlider(e)}
            />
            <div id="kit" onClick={(e) => handleKitClick(e)}>
              <button
                type="button"
                id="heater-kit"
                className={`mx-2 rounded bg-red-200 px-1`}
              >
                Heater Kit
              </button>
              <button
                type="button"
                id="smooth-piano-kit"
                className={`mx-2 rounded bg-red-200 px-1`}
              >
                Smooth Piano Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Drum;
