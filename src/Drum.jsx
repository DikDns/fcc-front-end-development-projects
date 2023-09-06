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
  const [sliderVal, setSliderVal] = useState(50);

  const handleSlider = (e) => {
    if (!power) return;
    setSliderVal(() => e.target.value);
  };

  useEffect(() => {
    const audios = document.querySelectorAll(`.clip`);
    if (!audios) return;
    audios.forEach((audio) => {
      audio.volume = sliderVal / 100;
    });
    setDisplay(() => `volume: ${sliderVal}%`);
  }, [sliderVal]);

  const handlePadClick = (e) => {
    if (!power) return;
    if (!e.target.classList.contains("drum-pad")) return;
    if (sliderVal == 0) {
      setDisplay(() => `volume: muted`);
      return;
    }
    e.preventDefault();
    const audio = e.target.children[0];
    const namePad = currentPadBank.kits.find(
      (sound) => audio.id === sound.keyTrigger
    );
    if (!namePad) return;

    updateDrumPadDisplay(namePad.id);

    audio.currentTime = 0;
    audio.play();

    setDisplay(() => namePad.name);
  };

  useEffect(() => {
    const handlePadKeyDown = (e) => {
      if (!power) return;
      if (sliderVal == 0) {
        setDisplay(() => `volume: muted`);
        return;
      }
      e.preventDefault();
      const namePad = currentPadBank.kits.find(
        (sound) => e.keyCode === sound.keyCode
      );
      if (!namePad) return;
      const audio = document.querySelector(`#${namePad.keyTrigger}`);

      updateDrumPadDisplay(namePad.id);

      audio.currentTime = 0;
      audio.play();

      setDisplay(() => namePad.name);
    };

    document.addEventListener(`keydown`, handlePadKeyDown);
    return () => {
      document.removeEventListener(`keydown`, handlePadKeyDown);
    };
  }, [currentPadBank, sliderVal, power]);

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
    setDisplay(() => (power ? `power: off` : `power: on`));
    if (power) {
      setTimeout(() => {
        setDisplay(() => ``);
      }, 500);
    }
    setPower((state) => !state);
  };

  useEffect(() => {
    setDisplay(() => ``);
  }, []);

  const updateDrumPadDisplay = (namePadId = ``) => {
    const btn = document.querySelector(`#${namePadId}`);
    btn.classList.remove(`shadow-zinc-50`);
    btn.classList.remove(`bg-zinc-50`);
    btn.classList.add(`bg-sky-400`);
    btn.classList.add(`shadow-sky-400`);

    setTimeout(() => {
      btn.classList.remove(`shadow-sky-400`);
      btn.classList.remove(`bg-sky-400`);
      btn.classList.add(`bg-zinc-50`);
      btn.classList.add(`shadow-zinc-50`);
    }, 100);
  };

  return (
    <main
      id="drum-machine"
      className={`flex min-h-screen items-center justify-center bg-violet-400`}
    >
      <div
        id="drum-container"
        className={`flex w-11/12 flex-col items-center justify-between rounded-md bg-zinc-800 p-4 shadow shadow-zinc-800 sm:w-[600px] sm:flex-row`}
      >
        <div
          onClick={(e) => handlePadClick(e)}
          id="drum-pad-container"
          className={`my-2 grid w-11/12 grid-cols-3 justify-items-center gap-2 rounded-md`}
        >
          {currentPadBank.kits.map((kit) => (
            <button
              tabIndex={-1}
              key={kit.id}
              id={kit.id}
              type="button"
              className={
                `drum-pad` +
                ` ` +
                `${
                  !power ? `bg-zinc-400` : `bg-zinc-50`
                } h-20 w-full rounded-md font-display shadow-sm shadow-zinc-50 transition-all duration-200 sm:w-28`
              }
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
        <div
          className={`flex w-full flex-col items-center p-2 sm:w-fit md:p-4`}
        >
          <div
            onClick={(e) => handlePowerClick(e)}
            id="power"
            className={`mb-2 flex flex-col items-center justify-center font-display text-zinc-50`}
          >
            Power
            <div
              className={`${
                !power ? `bg-zinc-400` : `bg-zinc-50 shadow-zinc-50`
              } h-6 w-10 cursor-pointer p-1 shadow-sm transition-all duration-200`}
            >
              <div
                className={`${
                  power ? `translate-x-full` : ``
                } h-full w-1/2 bg-zinc-800 transition-all duration-200`}
              ></div>
            </div>
          </div>
          <div
            id="display"
            className={`${
              !power ? `bg-zinc-400` : `bg-zinc-50 shadow-zinc-50`
            } text-md my-2 h-10 w-full overflow-hidden rounded text-center font-display leading-10 tracking-wide shadow transition-all duration-200 sm:w-48`}
          >
            {display}
          </div>
          <div id="controls" className={`flex w-full flex-col items-center`}>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderVal}
              id="volume"
              onChange={(e) => handleSlider(e)}
              className={`${
                !power ? `bg-zinc-400` : `bg-zinc-50 shadow-zinc-50`
              } my-2 h-2 w-full cursor-pointer appearance-none rounded shadow transition-all duration-200 focus:outline-none`}
            />
            <div
              id="kit"
              onClick={(e) => handleKitClick(e)}
              className={`flex flex-col`}
            >
              {padBank.map((bank) => {
                return (
                  <button
                    key={bank.id}
                    id={bank.id}
                    type="button"
                    disabled={bank.id === currentPadBank.id}
                    className={`${
                      !power
                        ? `bg-zinc-400`
                        : `bg-zinc-50 shadow-zinc-50 disabled:bg-sky-400 disabled:shadow-sky-400`
                    } mt-3 w-full rounded py-2 px-2 font-display text-xs shadow-sm transition-all duration-200`}
                  >
                    {bank.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Drum;
