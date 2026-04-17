"use client"; // 에러 컴포넌트는 use client

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("🚨 메인 페이지 데이터 로딩 에러:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertCircle className="w-16 h-16 text-red-500" />
      </div>
      
      <h2 className="text-3xl font-black text-gray-900 mb-4">창고 문이 박살났습니다 ㅠ 🎸</h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto font-medium leading-relaxed">
        데이터를 불러오는 중 문제가 발생했습니다.<br />
        인터넷 연결을 확인하시거나 잠시 후 다시 시도해 주세요.
      </p>
      
      <div className="flex gap-4">
        <Button 
          onClick={() => reset()} 
          className="bg-black text-white hover:bg-gray-800 h-12 px-8 font-bold rounded-full"
        >
          다시 시도하기
        </Button>
        <Link href="/">
          <Button variant="outline" className="h-12 px-8 font-bold rounded-full border-2 border-gray-200 text-gray-700">
            홈으로 가기
          </Button>
        </Link>
      </div>
    </div>
  );
}