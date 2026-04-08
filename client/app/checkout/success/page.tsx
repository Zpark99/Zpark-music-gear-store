"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { CheckCircle } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const { clearCart } = useCartStore();

  // 결제 성공 페이지에 도착하면 장바구니 비우기
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center max-w-lg w-full mx-auto mt-20">
      <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
      <h2 className="text-3xl font-black text-gray-900 mb-4">결제가 완료되었습니다!</h2>
      <p className="text-gray-500 mb-8 font-medium">MUSIC GEAR를 이용해 주셔서 감사합니다.</p>
      
      <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500 font-bold">주문번호</span>
          <span className="text-gray-900 font-bold">{orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-bold">결제금액</span>
          <span className="text-green-700 font-black text-lg">
            {Number(amount).toLocaleString()}원
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full h-14 text-lg font-bold">메인으로</Button>
        </Link>
        <Link href="#" className="flex-1">
          <Button className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white">주문내역 보기</Button>
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <Suspense fallback={<div className="text-center mt-20 font-bold">결제 정보 불러오는 중...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}