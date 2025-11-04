// src/components/SumCalculator.test.jsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SumCalculator from './SumCalculator';

describe('SumCalculator Component', () => {

  // Test 1: Kiểm tra component render đúng ban đầu
  it('should render the initial UI correctly', () => {
    render(<SumCalculator />);
    
    // Kiểm tra tiêu đề có tồn tại
    expect(screen.getByRole('heading', { name: /sum calculator/i })).toBeInTheDocument();
    
    // Kiểm tra 2 ô input có tồn tại
    expect(screen.getByLabelText(/number 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number 2/i)).toBeInTheDocument();
    
    // Kiểm tra nút bấm có tồn tại
    expect(screen.getByRole('button', { name: /calculate sum/i })).toBeInTheDocument();
    
    // Kiểm tra khu vực kết quả ban đầu
    expect(screen.getByText(/result: --/i)).toBeInTheDocument();
  });

  // Test 2: Kiểm tra chức năng tính tổng với số hợp lệ
  it('should calculate and display the sum for valid inputs', () => {
    render(<SumCalculator />);

    // Lấy các element
    const number1Input = screen.getByLabelText(/number 1/i);
    const number2Input = screen.getByLabelText(/number 2/i);
    const calculateButton = screen.getByRole('button', { name: /calculate sum/i });

    // Giả lập người dùng nhập liệu
    fireEvent.change(number1Input, { target: { value: '10' } });
    fireEvent.change(number2Input, { target: { value: '5' } });

    // Giả lập người dùng nhấn nút
    fireEvent.click(calculateButton);

    // Kiểm tra kết quả hiển thị đúng
    expect(screen.getByRole('heading', { name: /result: 15/i })).toBeInTheDocument();
  });

  // Test 3: Kiểm tra xử lý lỗi khi input rỗng
  it('should show an error message if one or both inputs are empty', () => {
    render(<SumCalculator />);

    const calculateButton = screen.getByRole('button', { name: /calculate sum/i });
    fireEvent.click(calculateButton);

    // Kiểm tra thông báo lỗi xuất hiện
    expect(screen.getByText(/please enter both numbers/i)).toBeInTheDocument();
  });

  // Test 4: Kiểm tra xử lý lỗi khi input không phải là số
  it('should show an error message for non-numeric inputs', () => {
    render(<SumCalculator />);
    
    const number1Input = screen.getByLabelText(/number 1/i);
    const number2Input = screen.getByLabelText(/number 2/i);
    const calculateButton = screen.getByRole('button', { name: /calculate sum/i });

    fireEvent.change(number1Input, { target: { value: 'abc' } });
    fireEvent.change(number2Input, { target: { value: '10' } });
    fireEvent.click(calculateButton);

    // Kiểm tra thông báo lỗi xuất hiện
    expect(screen.getByText(/please enter valid numbers/i)).toBeInTheDocument();
  });

  // Test 5 (Nâng cao): Kiểm tra tính toán đúng với dấu phẩy
  it('should correctly calculate sum when inputs use a comma as decimal separator', () => {
    render(<SumCalculator />);
    
    const number1Input = screen.getByLabelText(/number 1/i);
    const number2Input = screen.getByLabelText(/number 2/i);
    const calculateButton = screen.getByRole('button', { name: /calculate sum/i });

    fireEvent.change(number1Input, { target: { value: '2,5' } });
    fireEvent.change(number2Input, { target: { value: '3.5' } });
    fireEvent.click(calculateButton);
    
    // 2,5 + 3.5 = 6
    expect(screen.getByRole('heading', { name: /result: 6/i })).toBeInTheDocument();
  });

  // Test 6 (Nâng cao): Kiểm tra tính toán đúng với dấu chia
  it('should correctly calculate sum when inputs use a slash as decimal separator', () => {
    render(<SumCalculator />);
    
    const number1Input = screen.getByLabelText(/number 1/i);
    const number2Input = screen.getByLabelText(/number 2/i);
    const calculateButton = screen.getByRole('button', { name: /calculate sum/i });

    fireEvent.change(number1Input, { target: { value: '2/5' } });
    fireEvent.change(number2Input, { target: { value: '3/5' } });
    fireEvent.click(calculateButton);

    // 2/5 + 3/5 = 1
    expect(screen.getByRole('heading', { name: /result: 1/i })).toBeInTheDocument();
  });

});