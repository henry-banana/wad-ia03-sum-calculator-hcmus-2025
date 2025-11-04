# Sum Calculator - React App - WAD_IA03

# 23120262 - Tống Dương Thái Hòa

## 🚀 Demo Trực Tiếp

Trải nghiệm ứng dụng trực tiếp tại:
[**Calculator Sum**](https://wad-ia03-sum-calculator-23120262.vercel.app/)

---

## ✨ Tính Năng Nổi Bật

*   **Nhập Liệu Linh Hoạt:** Tính toán tổng của số nguyên, số thập phân, và cả phân số.
    *   **Hỗ trợ Số Thập Phân:** Chấp nhận cả dấu `.` và dấu `,` làm dấu ngăn cách thập phân (ví dụ: `3.14` và `3,14`).
    *   **Hỗ trợ Phân Số:** Hiểu và tính toán được các đầu vào dạng phân số (ví dụ: `1/2 + 3/4`).
*   **Giao diện Trực quan & Hiện đại (UI/UX):**
    *   Thiết kế **glassmorphism** ấn tượng với nền thiên hà có hiệu ứng chuyển động.
    *   Các hiệu ứng (animation) mượt mà khi người dùng tương tác.
    *   Tương thích với di động, tự động hiển thị bàn phím số phù hợp (`inputMode="decimal"`).
*   **Validation Mạnh Mẽ:** Cung cấp phản hồi rõ ràng, tức thì cho các đầu vào không hợp lệ như ô trống hoặc ký tự không phải là số.

## 🛠️ Trình Diễn Kỹ Thuật

Dự án này thể hiện sự thành thạo trong một loạt các phương pháp phát triển web hiện đại:

*   **Nền tảng React:** Xây dựng bằng functional component và sử dụng hook `useState` để quản lý trạng thái.
*   **Controlled Components:** Toàn bộ các ô nhập liệu được kiểm soát hoàn toàn bởi state của React, đảm bảo hành vi nhất quán và dễ dự đoán.
*   **CSS Nâng Cao:**
    *   Sử dụng **CSS Variables** để dễ dàng quản lý và thay đổi giao diện.
    *   Hiệu ứng **Glassmorphism** sử dụng `backdrop-filter`.
    *   Các animation phức tạp với `@keyframes` cho nền và các yếu tố tương tác.
*   **Kiểm Thử (Testing):**
    *   Các bài test unit và integration được viết bằng **Vitest** và **React Testing Library**.
    *   Độ bao phủ test (test coverage) cao cho việc render giao diện, tính toán, và các trường hợp validation đặc biệt.
*   **Công Cụ Hiện Đại:**
    *   Dự án được khởi tạo với **Vite** để mang lại trải nghiệm phát triển nhanh và hiệu quả.
    *   Triển khai liên tục (CI/CD) thông qua **Vercel/Netlify**.

## ⚙️ Hướng Dẫn Chạy Dự Án Tại Chỗ

Để cài đặt và chạy dự án trên máy của bạn, hãy làm theo các bước sau:

1.  **Clone repository này về:**
    ```sh
    git clone https://github.com/henry-banana/wad-ia03-sum-calculator-hcmus-2025.git
    ```

2.  **Di chuyển vào thư mục dự án:**
    ```sh
    cd wad-ia03-sum-calculator-hcmus-2025/sum-calculator
    ```

3.  **Cài đặt các dependencies:**
    ```sh
    npm install
    ```

4.  **Chạy server phát triển:**
    ```sh
    npm run dev
    ```
    Ứng dụng sẽ có sẵn tại địa chỉ `http://localhost:5173`.

## 🧪 Chạy Bộ Kiểm Thử

Để chạy bộ kiểm thử tự động và xác minh các chức năng của ứng dụng:

```sh
npm run test
```

# WAD_IA03-SumCalculator
Exercise IA03 Web Application Development - Sum Calculator using React

## **🧮 Assignment: Build a Sum Calculator App using React**

### **🎯 Objective**

Students will create a simple **React application** that allows users to input two numbers and display their sum dynamically.  
 This exercise helps you understand:

* How to handle **state** with React Hooks (`useState`)  
* How to create **controlled components** (form inputs)  
* How to handle **events** (onChange, onClick)  
* How to structure a **React component** and render dynamic UI

---

### **🧠 Requirements**

#### **1\. Functional Requirements**

Your React app must include:

* Two input boxes for user input (`number1` and `number2`)  
* A button labeled **"Calculate Sum"**  
* A display area showing the result of the sum  
* Proper validation: if inputs are empty or not numbers, show an error message

#### **2\. Technical Requirements**

* Built using **React functional components**  
* Use **useState** to manage input values and the sum  
* Code should be properly formatted and commented  
* The project must be **hosted publicly** using any hosting platform (e.g. Vercel, Netlify, GitHub Pages)

---

### **📁 Project Structure Example**

`sum-app/`  
`├── src/`  
`│   ├── components/`  
`│   │   └── SumCalculator.jsx`  
`│   ├── App.jsx`  
`│   ├── index.js`  
`│   └── App.css`  
`├── package.json`  
`└── README.md`

---

### **🧩 Sample UI (Concept)**

`----------------------------`  
 `Sum Calculator`  
`----------------------------`  
 `Number 1: [   10   ]`  
 `Number 2: [   20   ]`  
 `[ Calculate Sum ]`  
`----------------------------`  
 `Result: 30`  
`----------------------------`

---

### **🧱 Grading Rubric**

| Criteria | Description | Points |
| ----- | ----- | ----- |
| UI Functionality | Inputs, button, and output work correctly | 30 |
| State Management | Correct use of `useState` and React component structure | 25 |
| Validation | Handles invalid input gracefully | 15 |
| Code Quality | Well-structured, readable, and commented code | 20 |
| Public Hosting | App is deployed and accessible via a public link | 10 |
| **Total** |  | **100** |