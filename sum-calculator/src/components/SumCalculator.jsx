// src/components/SumCalculator.jsx

import React, { useState } from 'react';

/**
 * A component that allows users to input two numbers and calculate their sum.
 * It includes validation for empty or non-numeric inputs.
 */
function SumCalculator() {
  // --- STATE MANAGEMENT ---
  // State to store the value of the first number input. Initialized as an empty string.
  const [number1, setNumber1] = useState('');
  
  // State to store the value of the second number input. Initialized as an empty string.
  const [number2, setNumber2] = useState('');
  
  // State to store the calculated sum. Initialized as null to indicate no calculation has been made yet.
  const [sum, setSum] = useState(null);
  
  // State to hold any validation error messages. Initialized as an empty string.
  const [error, setError] = useState('');

  // --- EVENT HANDLERS ---
  /**
   * Handles the 'onChange' event for the first input field.
   * Updates the 'number1' state with the new value.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
   */
  const handleNumber1Change = (e) => {
    setNumber1(e.target.value);
  };

  /**
   * Handles the 'onChange' event for the second input field.
   * Updates the 'number2' state with the new value.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
   */
  const handleNumber2Change = (e) => {
    setNumber2(e.target.value);
  };
  
  /**
 * Handles the click event of the "Calculate Sum" button.
 * It validates the inputs before performing the calculation.
 * It now also handles commas as decimal separators.
 */
const handleCalculateSum = () => {
    // Reset previous results and errors
    setSum(null);
    setError('');

    // 1. Check if either input is empty
    if (number1.trim() === '' || number2.trim() === '') {
        setError('Please enter both numbers.');
        return;
    }

    // Replace comma with a period to handle European decimal format
    const sanitizedNumber1 = number1.replace(',', '.');
    const sanitizedNumber2 = number2.replace(',', '.');

    // 2. Convert sanitized input strings to numbers
    const num1 = parseFloat(sanitizedNumber1);
    const num2 = parseFloat(sanitizedNumber2);

    // 3. Check if the converted values are valid numbers
    if (isNaN(num1) || isNaN(num2)) {
        setError('Please enter valid numbers. Characters and symbols are not allowed.');
        return;
    }

    // If validation passes, calculate the sum and update the state
    setSum(num1 + num2);
};

  // --- RENDER ---
  return (
    <div className="calculator-container">
      <h1>Sum Calculator</h1>
      
      <div className="input-group">
        <label htmlFor="number1">Number 1:</label>
        <input
          type="text"
          inputMode='decimal'
          id="number1"
          value={number1}
          onChange={handleNumber1Change}
          placeholder="Enter first number"
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="number2">Number 2:</label>
        <input
          type="text"
          inputMode='decimal'
          id="number2"
          value={number2}
          onChange={handleNumber2Change}
          placeholder="Enter second number"
        />
      </div>

      {/* Display error message if the 'error' state is not empty */}
      {error && <p className="error-message">{error}</p>}
      
      <button onClick={handleCalculateSum}>Calculate Sum</button>
      
      <div className="result-area">
        {/* Conditionally render the result only if 'sum' is not null */}
        {sum !== null ? (
          <h2>Result: {sum}</h2>
        ) : (
          <h2>Result: --</h2>
        )}
      </div>
    </div>
  );
}

export default SumCalculator;
