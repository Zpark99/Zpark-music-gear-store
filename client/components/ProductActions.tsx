'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore'; // 경로 확인 필요

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string; // 스키마에 따라 thumbnail 등으로 변경
  };
}

export default function ProductActions({ product }: ProductActionsProps) {
  // Product 확인용 주석
  // console.log("ProductActions로 넘어온 데이터:", product);
  
  // 로컬 상태: 유저가 화면에서 조작하는 수량
  const [quantity, setQuantity] = useState(1);
  
  // 전역 상태 액션: 스토어에서 addItem 함수만 구독 (렌더링 최적화)
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // 1. 스토어에 Payload 전달
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl,
    });

    // 2. UX 피드백 (추후 Toast UI 등으로 고도화 가능)
    alert(`${product.name}이(가) 장바구니에 담겼습니다! 🎸`);
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* 수량 조절 UI 영역 */}
      <div className="flex items-center gap-4">
        <button onClick={handleDecrement} className="px-3 py-1 border">-</button>
        <span className="font-bold">{quantity}</span>
        <button onClick={handleIncrement} className="px-3 py-1 border">+</button>
      </div>

      {/* 총 결제 금액 실시간 연산 */}
      <div className="text-xl font-bold mt-2">
        총 결제 금액: {(product.price * quantity).toLocaleString()}원
      </div>

      {/* 장바구니 담기 & 구매 버튼 */}
      <div className="flex gap-2 w-full mt-4">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition"
        >
          장바구니 담기
        </button>
        <button className="flex-1 border border-gray-900 py-3 rounded-md hover:bg-gray-100 transition">
          바로 구매
        </button>
      </div>
    </div>
  );
}