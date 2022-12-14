import { useEffect, useState } from "react";

import { PLUS, MINUS, TIMES, DIVISION, isOperand } from "./modules/operand";

function App() {
  const [number, setNumber] = useState(`0`);
  const [operand, setOperand] = useState(null);
  // TO TRACK DOWN THE useEffect sign Hook when current sign stay the same value
  const [operandChange, setOperandChange] = useState(false);

  const [calculation, setCalculation] = useState([0]);
  const [result, setResult] = useState(null);

  const handleBtnClick = (e) => {
    e.preventDefault();

    const btn = e.target;

    // Prevent other element than btn
    if (!btn.classList.contains(`btn`)) return;

    // Prevent Entering multiple zero
    if (number == `0` && btn.id == `zero`) return;

    // ? AC BTN HANDLER
    if (btn.id === `clear`) {
      setCalculation(() => [0]);
      setNumber(() => `0`);
      setOperand(() => null);
      return;
    }

    // ? UNDO BTN HANDLER
    if (btn.id === `undo`) {
      if (isOperand(calculation[calculation.length - 1])) {
        setCalculation((prevState) => {
          const newState = [...prevState];

          if (!isOperand(newState[newState.length - 2])) {
            setNumber(newState[newState.length - 2].toString());
          }

          newState.pop();
          return [...newState];
        });
      } else if (calculation.length > 1 && number.length <= 1) {
        setCalculation((prevState) => {
          const newState = [...prevState];
          setNumber(() => `0`);
          newState.pop();
          return [...newState];
        });
      } else if (number.length > 1) {
        setNumber((prevNum) => prevNum.slice(0, prevNum.length - 1));
      } else {
        setCalculation(() => [0]);
        setNumber(() => `0`);
        setOperand(() => null);
      }

      return;
    }

    // ? SIGNS BTN HANDLER
    switch (btn.innerText) {
      case PLUS:
        setOperand(() => PLUS);
        setOperandChange((prevState) => !prevState);
        return;
      case MINUS:
        setOperand(() => MINUS);
        setOperandChange((prevState) => !prevState);
        return;
      case TIMES:
        setOperand(() => TIMES);
        setOperandChange((prevState) => !prevState);
        return;
      case DIVISION:
        setOperand(() => DIVISION);
        setOperandChange((prevState) => !prevState);
        return;
    }

    // ? DIGIT BTN HANDLER
    // Prevent max intiger length
    if (number.length >= 15) return;

    // Enter Initial Digit
    if (number == `0`) {
      setNumber(() => btn.innerText);
      return;
    }

    // Append Next Digit
    switch (btn.id) {
      case `zero`:
        setNumber((num) => (num += `0`));
        return;
      case `one`:
        setNumber((num) => (num += `1`));
        return;
      case `two`:
        setNumber((num) => (num += `2`));
        return;
      case `three`:
        setNumber((num) => (num += `3`));
        return;
      case `four`:
        setNumber((num) => (num += `4`));
        return;
      case `five`:
        setNumber((num) => (num += `5`));
        return;
      case `six`:
        setNumber((num) => (num += `6`));
        return;
      case `seven`:
        setNumber((num) => (num += `7`));
        return;
      case `eight`:
        setNumber((num) => (num += `8`));
        return;
      case `nine`:
        setNumber((num) => (num += `9`));
        return;
    }
  };

  useEffect(() => {
    if (!calculation) return;
    if (number == `0`) return;

    const parsedNum = parseFloat(number);

    // APPEND INSTANLY BCZ THE LAST ELEMENT IS JUST A SIGN NOT A NUM
    if (isOperand(calculation[calculation.length - 1])) {
      setCalculation((prevState) => [...prevState, parsedNum]);
      return;
    }

    // CHANGE ONLY THE LAST ELEMENT
    setCalculation((prevState) => {
      const newState = [...prevState];
      newState.pop();
      return [...newState, parsedNum];
    });
  }, [number]);

  useEffect(() => {
    if (!calculation) return;
    if (!operand) return;
    if (operand === calculation[calculation.length - 1]) return;

    setNumber(() => `0`);

    // THERE IS A MINUS SIGN NOT SUBTRACT SIGN
    if (
      isOperand(calculation[calculation.length - 1]) &&
      isOperand(calculation[calculation.length - 2])
    ) {
      setCalculation((prevState) => {
        const newState = [...prevState];
        // REMOVE THE MINUS SIGN
        newState.pop();
        newState.pop();
        return [...newState, operand];
      });
    }

    if (isOperand(calculation[calculation.length - 1])) {
      setCalculation((prevState) => {
        // ALLOW TO ONLY MINUS CAN APPEND
        if (prevState[prevState.length - 1] !== MINUS && operand === MINUS) {
          return [...prevState, operand];
        }

        // APPEND REMOVE THE LAST SIGN AND ASSIGN NEW ONE
        const newState = [...prevState];
        newState.pop();
        return [...newState, operand];
      });
      return;
    }

    // APPEND INSTANLY BCZ THE LAST ELEMENT IS JUST A NUMBER NOT A SIGN
    setCalculation((prevState) => {
      return [...prevState, operand];
    });
  }, [operandChange]);

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
