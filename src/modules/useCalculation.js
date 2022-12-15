import { useEffect, useState } from "react";

import { PLUS, MINUS, TIMES, DIVISION, isOperand } from "./operand";

const DEFAULT_NUMBER = `0`;
const DEFAULT_OPERAND = null;
const DEFAULT_CALCULATION = [0];

export default function (defaultProp) {
  const [currentNumber, setCurrentNumber] = useState(DEFAULT_NUMBER);
  const [currentOperand, setCurrentOperand] = useState(DEFAULT_OPERAND);

  // TO TRACK DOWN THE useEffect sign Hook when current sign stay the same value
  const [currentOperandChange, setCurrentOperandChange] = useState(false);

  const [calculation, setCalculation] = useState(
    defaultProp || DEFAULT_CALCULATION
  );

  function reset(target = `all`) {
    if (target === `number`) {
      setCurrentNumber(() => DEFAULT_NUMBER);
      return true;
    }

    if (target === `operand`) {
      setCurrentOperand(() => DEFAULT_OPERAND);
      return true;
    }

    if (target === `calculation`) {
      setCalculation(() => defaultProp || DEFAULT_CALCULATION);
      return true;
    }

    if (target === `all`) {
      setCalculation(() => defaultProp || DEFAULT_CALCULATION);
      setCurrentNumber(() => DEFAULT_NUMBER);
      setCurrentOperand(() => DEFAULT_OPERAND);
      return true;
    }

    return false;
  }

  function undo() {
    if (isOperand(calculation[calculation.length - 1])) {
      setCalculation((prevState) => {
        const newState = [...prevState];

        if (!isOperand(newState[newState.length - 2])) {
          setCurrentNumber(newState[newState.length - 2].toString());
        }

        newState.pop();
        return [...newState];
      });
    } else if (calculation.length > 1 && number.length <= 1) {
      setCalculation((prevState) => {
        const newState = [...prevState];
        reset(`number`);
        newState.pop();
        return [...newState];
      });
    } else if (number.length > 1) {
      setCurrentNumber((prevNum) => prevNum.slice(0, prevNum.length - 1));
    } else {
      reset(`all`);
    }
    return true;
  }

  function operand(target) {
    if (!isOperand(target)) return false;

    switch (target) {
      case PLUS:
        setCurrentOperand(() => PLUS);
        break;
      case MINUS:
        setCurrentOperand(() => MINUS);
        break;
      case TIMES:
        setCurrentOperand(() => TIMES);
        break;
      case DIVISION:
        setCurrentOperand(() => DIVISION);
        break;
      default:
        return false;
    }

    setCurrentOperandChange((prevState) => !prevState);

    return true;
  }

  function number(target) {
    // Prevent max intiger length
    if (number.length >= 15) return false;

    // Prevent Entering multiple zero
    if (currentNumber == `0` && target == `zero`) return false;

    // Enter Initial Digit
    if (number == `0`) {
      setCurrentNumber(() => target);
      return true;
    }

    // Append Next Digit
    switch (target) {
      case `zero`:
        setCurrentNumber((num) => (num += `0`));
        break;
      case `one`:
        setCurrentNumber((num) => (num += `1`));
        break;
      case `two`:
        setCurrentNumber((num) => (num += `2`));
        break;
      case `three`:
        setCurrentNumber((num) => (num += `3`));
        break;
      case `four`:
        setCurrentNumber((num) => (num += `4`));
        break;
      case `five`:
        setCurrentNumber((num) => (num += `5`));
        break;
      case `six`:
        setCurrentNumber((num) => (num += `6`));
        break;
      case `seven`:
        setCurrentNumber((num) => (num += `7`));
        break;
      case `eight`:
        setCurrentNumber((num) => (num += `8`));
        break;
      case `nine`:
        setCurrentNumber((num) => (num += `9`));
        break;
      default:
        return false;
    }

    return true;
  }

  useEffect(() => {
    if (!calculation) return;
    if (currentNumber == `0`) return;

    const parsedNum = parseFloat(currentNumber);

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
  }, [currentNumber]);

  useEffect(() => {
    if (!calculation) return;
    if (!currentOperand) return;
    if (currentOperand === calculation[calculation.length - 1]) return;

    reset(`number`);

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
        return [...newState, currentOperand];
      });
    }

    if (isOperand(calculation[calculation.length - 1])) {
      setCalculation((prevState) => {
        // ALLOW TO ONLY MINUS CAN APPEND
        if (
          prevState[prevState.length - 1] !== MINUS &&
          currentOperand === MINUS
        ) {
          return [...prevState, currentOperand];
        }

        // APPEND REMOVE THE LAST SIGN AND ASSIGN NEW ONE
        const newState = [...prevState];
        newState.pop();
        return [...newState, currentOperand];
      });
      return;
    }

    // APPEND INSTANLY BCZ THE LAST ELEMENT IS JUST A NUMBER NOT A SIGN
    setCalculation((prevState) => {
      return [...prevState, currentOperand];
    });
  }, [currentOperandChange]);

  return [calculation, { reset, undo, operand, number }];
}
