"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

function FailContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "결제 중 알 수 없는 오류가 발생했습니다.";
  const code = searchParams.get("code") || "UNKNOWN_ERROR";

  return (
    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center max-w-lg w-full mx-auto mt-20">
      <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
      <h2 className="text-3xl font-black text-gray-900 mb-4">결제에 실패했습니다</h2>
      <p className="text-red-500 mb-8 font-bold">{message}</p>
      
      <div className="bg-red-50 rounded-xl p-6 mb-8 text-left">
        <p className="text-sm text-red-800 font-medium break-words">
          <span className="font-bold">에러코드:</span> {code}
        </p>
      </div>

      <div className="flex gap-4">
        <Link href="/cart" className="flex-1">
          <Button variant="outline" className="w-full h-14 text-lg font-bold">장바구니로</Button>
        </Link>
        <Link href="/checkout" className="flex-1">
          <Button className="w-full h-14 text-lg font-bold bg-black hover:bg-gray-800 text-white">다시 결제하기</Button>
        </Link>
      </div>
    </div>
  );
}

export default function FailPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <Suspense fallback={<div className="text-center mt-20 font-bold">결제 실패 정보 불러오는 중...</div>}>
        <FailContent />
      </Suspense>
    </div>
  );
}