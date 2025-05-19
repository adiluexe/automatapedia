import React, { useState } from "react";
import { generateCollatzSequence } from "../sequences/collatz";
import "../App.css";

const CollatzPage: React.FC = () => {
  const [startNumber, setStartNumber] = useState<number>(10);
  const [sequence, setSequence] = useState<number[]>(
    generateCollatzSequence(10)
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(event.target.value, 10);
    if (!isNaN(num) && num > 0) {
      setStartNumber(num);
      setSequence(generateCollatzSequence(num));
    } else if (event.target.value === "") {
      setStartNumber(0);
      setSequence([]);
    }
  };

  return (
    <div className="container">
      <h1>Collatz Sequence</h1>
      <div className="input-container">
        <label htmlFor="startNumber">Enter starting number: </label>
        <input
          type="number"
          id="startNumber"
          value={startNumber === 0 ? "" : startNumber}
          onChange={handleInputChange}
          min="1"
        />
      </div>
      <div className="sequence-container">
        {sequence.map((num, index) => (
          <span key={index} className="sequence-element">
            {num}
            {index < sequence.length - 1 ? " → " : ""}
          </span>
        ))}
      </div>
      <div className="info-container">
        <p>
          The Collatz conjecture is an unsolved conjecture in mathematics. It
          states that if you pick a number, and if it's even, divide it by two
          and if it's odd, multiply it by three and add one, you will eventually
          reach one.
        </p>
      </div>
    </div>
  );
};

export default CollatzPage;
