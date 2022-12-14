import { useEffect, useState } from "react";

import { PLUS, MINUS, TIMES, DIVISION, checkSigns } from "./modules/mathSigns";

function App() {
  const [currentNum, setCurrentNum] = useState(`0`);
  const [currentSign, setCurrentSign] = useState(null);
  // TO TRACK DOWN THE useEffect sign Hook when current sign stay the same value
  const [signChanged, setSignChanged] = useState(false);

  const [calculation, setCalculation] = useState([0]);
  const [result, setResult] = useState(null);

  const handleBtnClick = (e) => {
    e.preventDefault();

    const btn = e.target;

    // Prevent other element than btn
    if (!btn.classList.contains(`btn`)) return;

    // Prevent Entering multiple zero
    if (currentNum == `0` && btn.id == `zero`) return;

    // ? AC BTN HANDLER
    if (btn.id === `clear`) {
      setCalculation(() => [0]);
      setCurrentNum(() => `0`);
      setCurrentSign(() => null);
      return;
    }

    // ? UNDO BTN HANDLER
    if (btn.id === `undo`) {
      if (checkSigns(calculation[calculation.length - 1])) {
        setCalculation((prevState) => {
          const newState = [...prevState];

          if (!checkSigns(newState[newState.length - 2])) {
            setCurrentNum(newState[newState.length - 2].toString());
          }

          newState.pop();
          return [...newState];
        });
      } else if (calculation.length > 1 && currentNum.length <= 1) {
        setCalculation((prevState) => {
          const newState = [...prevState];
          setCurrentNum(() => `0`);
          newState.pop();
          return [...newState];
        });
      } else if (currentNum.length > 1) {
        setCurrentNum((prevNum) => prevNum.slice(0, prevNum.length - 1));
      } else {
        setCalculation(() => [0]);
        setCurrentNum(() => `0`);
        setCurrentSign(() => null);
      }

      return;
    }

    // ? SIGNS BTN HANDLER
    switch (btn.innerText) {
      case PLUS:
        setCurrentSign(() => PLUS);
        setSignChanged((prevState) => !prevState);
        return;
      case MINUS:
        setCurrentSign(() => MINUS);
        setSignChanged((prevState) => !prevState);
        return;
      case TIMES:
        setCurrentSign(() => TIMES);
        setSignChanged((prevState) => !prevState);
        return;
      case DIVISION:
        setCurrentSign(() => DIVISION);
        setSignChanged((prevState) => !prevState);
        return;
    }

    // ? DIGIT BTN HANDLER
    // Prevent max intiger length
    if (currentNum.length >= 15) return;

    // Enter Initial Digit
    if (currentNum == `0`) {
      setCurrentNum(() => btn.innerText);
      return;
    }

    // Append Next Digit
    switch (btn.id) {
      case `clear`:
        setCurrentNum(() => `0`);
        return;
      case `zero`:
        setCurrentNum((num) => (num += `0`));
        return;
      case `one`:
        setCurrentNum((num) => (num += `1`));
        return;
      case `two`:
        setCurrentNum((num) => (num += `2`));
        return;
      case `three`:
        setCurrentNum((num) => (num += `3`));
        return;
      case `four`:
        setCurrentNum((num) => (num += `4`));
        return;
      case `five`:
        setCurrentNum((num) => (num += `5`));
        return;
      case `six`:
        setCurrentNum((num) => (num += `6`));
        return;
      case `seven`:
        setCurrentNum((num) => (num += `7`));
        return;
      case `eight`:
        setCurrentNum((num) => (num += `8`));
        return;
      case `nine`:
        setCurrentNum((num) => (num += `9`));
        return;
    }
  };

  useEffect(() => {
    if (!calculation) return;
    if (currentNum == `0`) return;

    const parsedNum = parseFloat(currentNum);

    // APPEND INSTANLY BCZ THE LAST ELEMENT IS JUST A SIGN NOT A NUM
    if (checkSigns(calculation[calculation.length - 1])) {
      setCalculation((prevState) => [...prevState, parsedNum]);
      return;
    }

    // CHANGE ONLY THE LAST ELEMENT
    setCalculation((prevState) => {
      const newState = [...prevState];
      newState.pop();
      return [...newState, parsedNum];
    });
  }, [currentNum]);

  useEffect(() => {
    if (!calculation) return;
    if (!currentSign) return;
    if (currentSign === calculation[calculation.length - 1]) return;

    setCurrentNum(() => `0`);

    // THERE IS A MINUS SIGN NOT SUBTRACT SIGN
    if (
      checkSigns(calculation[calculation.length - 1]) &&
      checkSigns(calculation[calculation.length - 2])
    ) {
      setCalculation((prevState) => {
        const newState = [...prevState];
        // REMOVE THE MINUS SIGN
        newState.pop();
        newState.pop();
        return [...newState, currentSign];
      });
    }

    if (checkSigns(calculation[calculation.length - 1])) {
      setCalculation((prevState) => {
        // ALLOW TO ONLY MINUS CAN APPEND
        if (
          prevState[prevState.length - 1] !== MINUS &&
          currentSign === MINUS
        ) {
          return [...prevState, currentSign];
        }

        // APPEND REMOVE THE LAST SIGN AND ASSIGN NEW ONE
        const newState = [...prevState];
        newState.pop();
        return [...newState, currentSign];
      });
      return;
    }

    // APPEND INSTANLY BCZ THE LAST ELEMENT IS JUST A NUMBER NOT A SIGN
    setCalculation((prevState) => {
      return [...prevState, currentSign];
    });
  }, [signChanged]);

  return (
    <div
      className={`App min-h-screen flex flex-col justify-end font-display bg-zinc-50`}
    >
      <div id="displayContainer" className={`displayContainer`}>
        <div id="calculation" className={`display`}>
          {calculation.join("")}
        </div>
        <div id="result" className={`display display-secondary`}>
          {result ? `= ${result}` : ``}
        </div>
      </div>

      <div
        id="buttonContainer"
        className={`buttonContainer`}
        onClick={(e) => handleBtnClick(e)}
      >
        {/* CONTROLS AREA */}
        <div className={`btn order-[1] btn-span-2 btn-secondary`} id="clear">
          {`AC`}
        </div>
        <div className={`btn order-[2] btn-secondary`} id="undo">
          {`<-`}
        </div>
        <div className={`btn order-[17]`} id="decimal">{`.`}</div>
        <div className={`btn order-[18] btn-primary`} id="equals">{`=`}</div>

        {/* OPERATORS AREA */}
        <div className={`btn order-[3] btn-secondary`} id="divide">
          {DIVISION}
        </div>
        <div className={`btn order-[7] btn-secondary`} id="multiply">
          {TIMES}
        </div>
        <div className={`btn order-[11] btn-secondary`} id="subtract">
          {MINUS}
        </div>
        <div className={`btn order-[15] btn-secondary`} id="add">
          {PLUS}
        </div>

        {/* NUMBERS AREA */}
        <div className={`btn order-[16] btn-span-2`} id="zero">
          0
        </div>
        <div className={`btn order-[12]`} id="one">
          1
        </div>
        <div className={`btn order-[13]`} id="two">
          2
        </div>
        <div className={`btn order-[14]`} id="three">
          3
        </div>
        <div className={`btn order-[8]`} id="four">
          4
        </div>
        <div className={`btn order-[9]`} id="five">
          5
        </div>
        <div className={`btn order-[10]`} id="six">
          6
        </div>
        <div className={`btn order-[4]`} id="seven">
          7
        </div>
        <div className={`btn order-[5]`} id="eight">
          8
        </div>
        <div className={`btn order-[6]`} id="nine">
          9
        </div>
      </div>
    </div>
  );
}

export default App;
