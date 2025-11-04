// src/components/SumCalculator.jsx

import React, { useState, useRef, useEffect } from 'react';

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

  // Ref để truy cập result area
  const resultAreaRef = useRef(null);

  // Effect để scroll về đầu khi có kết quả mới
  useEffect(() => {
    if (sum !== null && resultAreaRef.current) {
      resultAreaRef.current.scrollTop = 0;
      resultAreaRef.current.scrollLeft = 0; // Đảm bảo scroll ngang về đầu
    }
  }, [sum]);

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
   * Parses a string input into a number.
   * Handles integers, decimals (with '.' or ','), and fractions (like 'a/b').
   * @param {string} inputStr The string to parse.
   * @returns {number} The parsed number, or NaN if invalid.
   */
  const parseNumberInput = (inputStr) => {
    // 1. Chuẩn hóa chuỗi: loại bỏ khoảng trắng và thay thế dấu phẩy
    // Chỉ thay thế dấu phẩy bằng dấu chấm.
    const sanitizedStr = inputStr.trim().replace(',', '.');

    // Nếu sau khi thay thế, chuỗi vẫn còn dấu phẩy (vd: "1,000.5"), đó là lỗi format
    if (sanitizedStr.includes(',')) {
        return NaN;
    }

    // 2. Kiểm tra xem có phải là phân số không
    if (sanitizedStr.includes('/')) {
        const parts = sanitizedStr.split('/');
        if (parts.length === 2) {
            const numerator = parseFloat(parts[0]);
            const denominator = parseFloat(parts[1]);
            
            if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                return numerator / denominator;
            }
        }
        return NaN; // Format phân số không hợp lệ
    }
    
    // 3. Nếu không phải phân số, dùng logic parseFloat như cũ
    return parseFloat(sanitizedStr);
  };

  /**
 * Handles the click event of the "Calculate Sum" button.
 * It validates the inputs before performing the calculation.
 * It now also handles commas as decimal separators and uses BigInt for large integers.
 */
  const handleCalculateSum = () => {
    setSum(null);
    setError('');

    const input1 = number1.trim();
    const input2 = number2.trim();

    if (input1 === '' || input2 === '') {
        setError('Please enter both numbers.');
        return;
    }

    // Biểu thức chính quy để kiểm tra một chuỗi có phải là số nguyên (có thể có dấu phẩy)
    const bigIntRegex = /^-?\d{1,3}(,\d{3})*$|^-?\d+$/;

    try {
        // Ưu tiên xử lý BigInt nếu cả hai input đều là số nguyên lớn
        if (bigIntRegex.test(input1.replace(/,/g, '')) && bigIntRegex.test(input2.replace(/,/g, ''))) {
            // Xóa dấu phẩy để BigInt có thể hiểu
            const bigNum1 = BigInt(input1.replace(/,/g, ''));
            const bigNum2 = BigInt(input2.replace(/,/g, ''));
            const result = bigNum1 + bigNum2;
            setSum(result.toString());
        } 
        // Nếu không, xử lý như số thập phân/phân số thông thường
        else {
            const num1 = parseNumberInput(input1); // parseNumberInput đã xử lý dấu phẩy đúng cách
            const num2 = parseNumberInput(input2);

            if (isNaN(num1) || isNaN(num2)) {
                // Đặt thông báo lỗi khớp với bài test
                setError('Please enter valid numbers. Characters and symbols are not allowed.');
                return;
            }
            setSum(num1 + num2);
        }
    } catch (e) {
        // Trường hợp lỗi cú pháp nặng (ví dụ: '1,2,3'), trả về lỗi khớp với test
        setError('Please enter valid numbers. Characters and symbols are not allowed.');
    }
  };

  // --- HÀM ĐỊNH DẠNG SỐ VỚI DẤU PHẨY ---
  const formatNumber = (num) => {
    if (num === null || num === undefined) return '--';
    
    // Nếu num là string (từ BigInt), xử lý trực tiếp
    let numStr = typeof num === 'string' ? num : num.toString();
    
    // Xử lý ký pháp khoa học (e+/e-)
    if (numStr.includes('e')) {
      return numStr;
    }
    
    // Xử lý số âm
    const isNegative = numStr.startsWith('-');
    if (isNegative) {
      numStr = numStr.substring(1);
    }
    
    // Tách phần nguyên và phần thập phân
    const parts = numStr.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Thêm dấu phẩy vào phần nguyên
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Kết hợp lại
    let result = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    
    return isNegative ? `-${result}` : result;
  };

  // --- LOGIC CHỌN CLASSNAME CHO KẾT QUẢ ---
  let resultClassName = '';
  if (sum !== null) {
    // Tính độ dài thực của số (không tính dấu phẩy format)
    const sumStr = typeof sum === 'string' ? sum : sum.toString();
    const actualLength = sumStr.replace(/,/g, '').length;
    
    if (actualLength > 20) {
      resultClassName = 'result-xlarge'; // Rất dài (>20 ký tự)
    } else if (actualLength > 12) {
      resultClassName = 'result-large'; // Hơi dài (>12 ký tự)
    }
  }
  // ---------------------------------------------

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
      
      <div className="result-area" ref={resultAreaRef}>
        {/* Conditionally render the result only if 'sum' is not null */}
        {sum !== null ? (
          <h2 className={resultClassName}>
            Result: {formatNumber(sum)}
          </h2>
        ) : (
          <h2>Result: --</h2>
        )}
      </div>
    </div>
  );
}

export default SumCalculator;
