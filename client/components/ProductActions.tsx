/**
 * @file components/ProductActions.tsx
 * @description 수량 조절 및 장바구니 담기 클라이언트 컴포넌트
 */
"use client";

import { useState } from "react";

type Props = {
  productId: number; // DB ID 타입에 맞게 string 또는 number로 지정
  price: number;
};

export default function ProductActions({ productId, price }: Props) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    // 최대 수량 제한이 필요하다면 여기서 로직 추가 가능
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    alert(`상품 ID ${productId}을(를) ${quantity}개 장바구니에 담았습니다. (총액: ₩ ${(price * quantity).toLocaleString()})`);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* 수량 조절기 */}
      <div className="flex items-center space-x-4">
        <span className="font-medium">수량</span>
        <div className="flex items-center border rounded-md h-10 w-32 bg-white">
          <button onClick={handleDecrease} className="w-10 h-full flex items-center justify-center hover:bg-gray-100 transition">-</button>
          <span className="flex-1 text-center font-medium">{quantity}</span>
          <button onClick={handleIncrease} className="w-10 h-full flex items-center justify-center hover:bg-gray-100 transition">+</button>
        </div>
      </div>

      {/* 총 금액 표시 (옵션) */}
      <div className="text-right text-sm text-gray-500">
        총 금액: <span className="font-bold text-gray-900 text-lg">₩ {(price * quantity).toLocaleString()}</span>
      </div>

      {/* 장바구니 버튼 */}
      <button 
        onClick={handleAddToCart}
        className="w-full h-14 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition"
      >
        장바구니 담기
      </button>
    </div>
  );
}