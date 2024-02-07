import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function App() {
  return (
    <div className="app-container">
      <Title />
      <TipCalculator />
    </div>
  );
}

function Title() {
  return (
    <div>
      <h1>
        <span style={{ display: "block" }}>Spli</span>
        <span style={{ display: "block" }}>tter</span>
      </h1>
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [numberPeople, setNumberPeople] = useState("");
  const [tipPercentage, setTipPercentage] = useState(null);

  const tipAmountByPerson =
    bill && numberPeople && tipPercentage
      ? ((Number(bill) * (tipPercentage / 100)) / Number(numberPeople)).toFixed(
          2
        )
      : "0.00";

  const totalByPerson =
    bill && numberPeople && tipPercentage
      ? (
          (Number(bill) + Number(bill) * (tipPercentage / 100)) /
          Number(numberPeople)
        ).toFixed(2)
      : "0.00";

  function handleBill(e) {
    setBill(e.target.value);
  }

  function handleNumberPeople(e) {
    setNumberPeople(e.target.value);
  }

  function handleReset() {
    setBill("");
    setNumberPeople("");
    setTipPercentage(null);
  }

  return (
    <div className="calculator-container">
      <TipInput
        bill={bill}
        setBill={handleBill}
        numberPeople={numberPeople}
        setNumberPeople={handleNumberPeople}
        setTipPercentage={setTipPercentage}
        tipPercentage={tipPercentage}
      />
      <TipInformativePanel
        tipAmountByPerson={tipAmountByPerson}
        totalByPerson={totalByPerson}
        onReset={handleReset}
      />
    </div>
  );
}
function TipInput({
  bill,
  setBill,
  numberPeople,
  setNumberPeople,
  setTipPercentage,
  tipPercentage,
}) {
  return (
    <div className="tipInput-container">
      <InputComponent
        input={bill}
        handleInput={setBill}
        icon={<FontAwesomeIcon icon={faDollarSign} />}
      >
        Bill
      </InputComponent>
      <TipSelection
        setTipPercentage={setTipPercentage}
        tipPercentage={tipPercentage}
      />
      <InputComponent
        input={numberPeople}
        handleInput={setNumberPeople}
        icon={<FontAwesomeIcon icon={faUser} />}
      >
        Number of People
      </InputComponent>
    </div>
  );
}
function TipSelection({ setTipPercentage, tipPercentage }) {
  return (
    <div className="selection-container tip-selection-container">
      <label>Select Tip %</label>
      <div className="tipselection-container">
        <button
          className={tipPercentage === 5 ? "activeBtn" : ""}
          onClick={() => setTipPercentage(5)}
        >
          5%
        </button>
        <button
          className={tipPercentage === 10 ? "activeBtn" : ""}
          onClick={() => setTipPercentage(10)}
        >
          10%
        </button>
        <button
          className={tipPercentage === 15 ? "activeBtn" : ""}
          onClick={() => setTipPercentage(15)}
        >
          15%
        </button>
        <button
          className={tipPercentage === 25 ? "activeBtn" : ""}
          onClick={() => setTipPercentage(25)}
        >
          25%
        </button>
        <button
          className={tipPercentage === 50 ? "activeBtn" : ""}
          onClick={() => setTipPercentage(50)}
        >
          50%
        </button>
        <input
          value={tipPercentage}
          placeholder="Custom"
          onChange={(e) => setTipPercentage(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

function InputComponent({ icon, children, input, handleInput }) {
  return (
    <div className="selection-container">
      <label>{children}</label>
      <div className="input-container">
        <input
          type="text"
          placeholder="0"
          value={input}
          onChange={(e) => handleInput(e)}
        ></input>
        <span className="input-icon">{icon}</span>
      </div>
    </div>
  );
}

function TipInformativePanel({ tipAmountByPerson, totalByPerson, onReset }) {
  return (
    <div className="tipInformativePanel-container">
      <div>
        <div className="tipAmount">
          <div>
            <span style={{ display: "block" }}>Tip Amount</span>
            <span
              style={{ display: "block", color: "rgba(255, 255, 255, 0.3)" }}
            >
              / person
            </span>
          </div>
          <span className="tipAmount-Numbers">${tipAmountByPerson}</span>
        </div>
        <div className="tipAmount">
          <div>
            <span style={{ display: "block" }}>Total</span>
            <span
              style={{ display: "block", color: "rgba(255, 255, 255, 0.3)" }}
            >
              / person
            </span>
          </div>
          <span className="tipAmount-Numbers">${totalByPerson}</span>
        </div>
      </div>
      <div className="tipReset">
        <button onClick={onReset}>RESET</button>
      </div>
    </div>
  );
}
