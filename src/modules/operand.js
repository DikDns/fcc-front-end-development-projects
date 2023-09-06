const PLUS = `\u002b`;
const MINUS = `\u2212`;
const TIMES = `\u00d7`;
const DIVISION = `\u00f7`;

function isOperand(sign) {
  if (sign === PLUS || sign === MINUS || sign === TIMES || sign === DIVISION) {
    return true;
  }
  return false;
}

export { PLUS, MINUS, TIMES, DIVISION, isOperand };
