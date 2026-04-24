'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useStore } from '@/hooks/useStore';

export default function Header() {
  // 1. 일반적인 Zustand 호출 방식 (SSR에서 Hydration 에러 발생 위험 존재)
  // const items = useCartStore((state) => state.items);

  // 2. Hydration 안전 장치(useStore hook)를 통과한 데이터 호출 방식
  const items = useStore(useCartStore, (state) => state.items) || [];

  // 3. 파생 상태 연산: 장바구니에 담긴 총 악기 수량 계산
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="flex justify-between items-center p-4 border-b">
      {/* 로고 영역 */}
      <Link href="/" className="text-xl font-bold">
        🎸 Music Gear Store
      </Link>

      {/* 네비게이션 영역 */}
      <nav>
        <Link href="/cart" className="relative p-2">
          장바구니 🛒
          
          {/* 수량 뱃지 UI (0개 초과일 때만 렌더링) */}
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {totalQuantity}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}