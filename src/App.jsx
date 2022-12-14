import { useState } from "react";

import { PLUS, MINUS, TIMES, DIVISION } from "./modules/mathSigns";

function App() {
  const [calculation, setCalculation] = useState([
    4,
    PLUS,
    5,
    DIVISION,
    5,
    MINUS,
    4,
    TIMES,
    10,
  ]);
  const [result, setResult] = useState(null);

  const handleBtnClick = (e) => {
    e.preventDefault();
  };

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
        <div className={`btn order-[20]`} id="decimal">{`.`}</div>
        <div className={`btn order-[21] btn-primary`} id="equals">{`=`}</div>

        {/* OPERATORS AREA */}
        <div className={`btn order-[3] btn-secondary`} id="divide">
          {`\u00f7`}
        </div>
        <div className={`btn order-[10] btn-secondary`} id="multiply">
          {`\u00d7`}
        </div>
        <div className={`btn order-[18] btn-secondary`} id="subtract">
          {`\u002b`}
        </div>
        <div className={`btn order-[14] btn-secondary`} id="add">
          {`\u2212`}
        </div>

        {/* NUMBERS AREA */}
        <div className={`btn order-[19] btn-span-2`} id="zero">
          0
        </div>
        <div className={`btn order-[15]`} id="one">
          1
        </div>
        <div className={`btn order-[16]`} id="two">
          2
        </div>
        <div className={`btn order-[17]`} id="three">
          3
        </div>
        <div className={`btn order-[11]`} id="four">
          4
        </div>
        <div className={`btn order-[12]`} id="five">
          5
        </div>
        <div className={`btn order-[13]`} id="six">
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
