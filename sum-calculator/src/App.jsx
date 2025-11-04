import React, { useState, useEffect } from 'react';
import SumCalculator from './components/SumCalculator';
import './App.css';

// --- HÀM TỰ ĐỘNG SINH SAO ---
/**
 * Tạo ra một chuỗi box-shadow với các ngôi sao ngẫu nhiên.
 * @param {number} count - Số lượng sao cần tạo.
 * @param {number} width - Chiều rộng của khu vực bầu trời.
 * @param {number} height - Chiều cao của khu vực bầu trời.
 * @returns {string} - Một chuỗi CSS hợp lệ cho thuộc tính box-shadow.
 */
const generateStars = (count, width, height) => {
  let shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    shadows.push(`${x}px ${y}px #FFF`);
  }
  return shadows.join(', ');
};


function App() {
  // --- STATE ĐỂ LƯU CÁC LỚP SAO ---
  const [stars1, setStars1] = useState('');
  const [stars2, setStars2] = useState('');
  const [stars3, setStars3] = useState('');

  // --- EFFECT ĐỂ SINH SAO KHI COMPONENT MOUNT ---
  useEffect(() => {
    // Kích thước của "bầu trời". Lớn hơn màn hình để khi sao di chuyển không bị thiếu.
    const skyWidth = 3000;
    const skyHeight = 3000;

    // *** BẠN CÓ THỂ THAY ĐỔI SỐ LƯỢNG SAO Ở ĐÂY ***
    const numStarsLayer1 = 2020; // Lớp xa nhất, nhiều sao nhỏ
    const numStarsLayer2 = 1000; // Lớp giữa
    const numStarsLayer3 = 100;  // Lớp gần nhất, ít sao lớn

    setStars1(generateStars(numStarsLayer1, skyWidth, skyHeight));
    setStars2(generateStars(numStarsLayer2, skyWidth, skyHeight));
    setStars3(generateStars(numStarsLayer3, skyWidth, skyHeight));

  }, []); // Mảng rỗng `[]` đảm bảo effect này chỉ chạy 1 lần duy nhất

  return (
    <div className="starfield">
      {/* ÁP DỤNG STYLE ĐỘNG VÀO CÁC DIV */}
      <div className="stars-layer1" style={{ boxShadow: stars1 }}></div>
      <div className="stars-layer2" style={{ boxShadow: stars2 }}></div>
      <div className="stars-layer3" style={{ boxShadow: stars3 }}></div>
      
      <div className="App">
        <SumCalculator />
      </div>
    </div>
  );
}

export default App;