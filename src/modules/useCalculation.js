import { useEffect, useState } from "react";

import { PLUS, MINUS, TIMES, DIVISION, isOperand } from "./operand";

const DEFAULT_NUMBER = null;
const DEFAULT_OPERAND = null;
const DEFAULT_CALCULATION = [0];

function calculate(n1 = 0, operand, n2 = 0) {
  switch (operand) {
    case PLUS:
      return n1 + n2;
    case MINUS:
      return n1 - n2;
    case TIMES:
      return n1 * n2;
    case DIVISION:
      return n1 / n2;
    default:
      return undefined;
  }
}

function perfomCalculation(passedArr = []) {
  const tempArr = [];
  let currentResult;
  let currentResultIndex;
  let isNegative = false;

  if (passedArr.length <= 2) {
    return passedArr[0];
  }

  for (let i = 0; i < passedArr.length; i++) {
    if (passedArr[i] === TIMES || passedArr[i] === DIVISION) {
      const operand = passedArr[i];
      let n1 = parseFloat(passedArr[i - 1]) || 1;
      let n2 = parseFloat(passedArr[i + 1]) || 1;
      if (passedArr[i + 1] === MINUS) {
        isNegative = true;
        n2 = parseFloat(passedArr[i + 2]) * -1 || 1;
      }

      currentResult = calculate(n1, operand, n2);
      currentResultIndex = i;
      break;
    }
  }

  if (currentResult && isNegative) {
    passedArr.forEach((item, index) => {
      if (index === currentResultIndex - 1) {
        tempArr.push(currentResult);
      } else if (
        index !== currentResultIndex &&
        index !== currentResultIndex + 1 &&
        index !== currentResultIndex + 2
      ) {
        tempArr.push(item);
      }
    });
    return perfomCalculation(tempArr);
  }

  if (currentResult) {
    passedArr.forEach((item, index) => {
      if (index === currentResultIndex - 1) {
        tempArr.push(currentResult);
      } else if (
        index !== currentResultIndex &&
        index !== currentResultIndex + 1
      ) {
        tempArr.push(item);
      }
    });
    return perfomCalculation(tempArr);
  }

  for (let i = 0; i < passedArr.length; i++) {
    if (passedArr[i] === PLUS || passedArr[i] === MINUS) {
      const operand = passedArr[i];
      let n1 = parseFloat(passedArr[i - 1]) || 0;
      let n2 = parseFloat(passedArr[i + 1]) || 0;
      if (passedArr[i + 1] === MINUS) {
        isNegative = true;
        n2 = parseFloat(passedArr[i + 2]) * -1 || 0;
      }
      currentResult = calculate(n1, operand, n2);
      currentResultIndex = i;
      break;
    }
  }

  if (currentResult && isNegative) {
    passedArr.forEach((item, index) => {
      if (index === currentResultIndex - 1) {
        tempArr.push(currentResult);
      } else if (
        index !== currentResultIndex &&
        index !== currentResultIndex + 1 &&
        index !== currentResultIndex + 2
      ) {
        tempArr.push(item);
      }
    });
    return perfomCalculation(tempArr);
  }

  if (currentResult) {
    passedArr.forEach((item, index) => {
      if (index === currentResultIndex - 1) {
        tempArr.push(currentResult);
      } else if (
        index !== currentResultIndex &&
        index !== currentResultIndex + 1
      ) {
        tempArr.push(item);
      }
    });
    return perfomCalculation(tempArr);
  }

  return `0`;
}

export default function (defaultProp) {
  const [currentNumber, setCurrentNumber] = useState(DEFAULT_NUMBER);
  const [currentOperand, setCurrentOperand] = useState(DEFAULT_OPERAND);

  // TO TRACK DOWN THE useEffect sign Hook when current sign stay the same value
  const [currentOperandChange, setCurrentOperandChange] = useState(false);

  const [calculation, setCalculation] = useState(
    defaultProp || DEFAULT_CALCULATION
  );

  const [result, setResult] = useState(null);

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
    if (currentNumber === DEFAULT_NUMBER && calculation.length <= 1) return;

    if (isOperand(calculation[calculation.length - 1])) {
      setCalculation((prevState) => {
        const newState = [...prevState];

        if (!isOperand(newState[newState.length - 2])) {
          setCurrentNumber(newState[newState.length - 2].toString());
        }

        newState.pop();
        return [...newState];
      });
    } else if (calculation.length > 1 && currentNumber.length <= 1) {
      setCalculation((prevState) => {
        const newState = [...prevState];
        reset(`number`);
        newState.pop();
        return [...newState];
      });
    } else if (currentNumber.length > 1) {
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
    // Enter Initial Digit
    if (currentNumber === DEFAULT_NUMBER) {
      setCurrentNumber(() => target);
      return true;
    }

    // Prevent max intiger length
    if (currentNumber.length >= 15) return false;

    // Prevent Entering multiple zero
    if (currentNumber == `0` && target == `0` && calculation.length < 2) {
      return false;
    }

    // Change from initial zero to whatever it is
    if (currentNumber == `0`) {
      setCurrentNumber(() => target);
      return true;
    }

    // Append Next Digit
    switch (target) {
      case `0`:
        setCurrentNumber((num) => (num += `0`));
        break;
      case `1`:
        setCurrentNumber((num) => (num += `1`));
        break;
      case `2`:
        setCurrentNumber((num) => (num += `2`));
        break;
      case `3`:
        setCurrentNumber((num) => (num += `3`));
        break;
      case `4`:
        setCurrentNumber((num) => (num += `4`));
        break;
      case `5`:
        setCurrentNumber((num) => (num += `5`));
        break;
      case `6`:
        setCurrentNumber((num) => (num += `6`));
        break;
      case `7`:
        setCurrentNumber((num) => (num += `7`));
        break;
      case `8`:
        setCurrentNumber((num) => (num += `8`));
        break;
      case `9`:
        setCurrentNumber((num) => (num += `9`));
        break;
      default:
        return false;
    }

    return true;
  }

  function decimal() {
    // Enter Initial Digit
    if (currentNumber === DEFAULT_NUMBER) {
      setCurrentNumber(() => `0.`);
      return true;
    }

    // Prevent max float length
    if (currentNumber.length >= 20) return false;

    // Prevent multiple decimal
    if (currentNumber.includes(`.`)) return false;

    setCurrentNumber((num) => (num += `.`));

    return true;
  }

  function evaluate() {
    if (!calculation) return false;
    if (!result) return false;
    if (currentNumber === DEFAULT_NUMBER) return false;
    if (calculation.length <= 1) return false;

    reset(`operand`);
    setCurrentNumber(() => result.toString());
    setCalculation(() => [result.toString()]);
    return true;
  }

  // ? TRACK CHANGES ON: currentNumber
  useEffect(() => {
    if (!calculation) return;

    if (currentNumber === DEFAULT_NUMBER) return;

    // APPEND INSTANLY BCZ THE LAST ELEMENT IS JUST A SIGN NOT A NUM
    if (isOperand(calculation[calculation.length - 1])) {
      setCalculation((prevState) => [...prevState, currentNumber]);
      return;
    }

    // CHANGE ONLY THE LAST ELEMENT
    setCalculation((prevState) => {
      const newState = [...prevState];
      newState.pop();
      return [...newState, currentNumber];
    });
  }, [currentNumber]);

  // ? TRACK CHANGES ON: currentOperandChange
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

  // ? TRACK CHANGES ON: calculation
  useEffect(() => {
    if (!calculation) return;
    let tempResult;
    const calculated = perfomCalculation(calculation);
    const calculatedStr = calculated.toString();
    if (calculatedStr.includes(`.`)) {
      const maxDecimal = 100000000000;
      tempResult = Math.round(calculated * maxDecimal) / maxDecimal;
    } else {
      tempResult = calculated;
    }

    if (!isFinite(tempResult)) {
      tempResult = `Can't Divide by Zero`;
    }

    setResult(() => tempResult);
  }, [calculation]);

  return [
    calculation,
    {
      result,
      reset,
      undo,
      decimal,
      operand,
      number,
      evaluate,
    },
  ];
}
