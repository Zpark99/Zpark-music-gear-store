"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 확인용
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSignup = async () => {
    if (!email || !password || !passwordConfirm) return alert("모든 칸을 입력해주세요");
    if (password !== passwordConfirm) return alert("비밀번호가 서로 다릅니다");
    if (password.length < 6) return alert("비밀번호는 최소 6자리 이상이어야 합니다.");

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      
      alert("가입 성공했습니다. 로그인 해주세요.");
      router.push("/login"); // /가입 성공시 로그인 페이지로 이동
      
    } catch (error) {
      if (error instanceof Error) {
        alert("회원가입 실패: " + error.message);
    } else {
      alert("회원가입 실패: 알 수 없는 오류가 발생 했습니다.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <h1 className="mb-8 text-2xl font-bold text-center">회원가입</h1> 
        
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">아이디 (이메일)</label>
            <Input 
              type="email" 
              placeholder="hello@musicgear.com" 
              className="h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">비밀번호</label>
            <Input 
              type="password" 
              placeholder="6자리 이상 입력해주세요" 
              className="h-12" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">비밀번호 확인</label>
            <Input 
              type="password" 
              placeholder="비밀번호를 한 번 더 입력해주세요" 
              className="h-12" 
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleSignup}
            disabled={isLoading}
            className="h-12 w-full bg-black text-base text-white hover:bg-gray-800 mt-6"
          >
            {isLoading ? "가입 중..." : "회원가입 완료"}
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="font-bold text-black hover:underline">
            로그인하기
          </Link>
        </div>
      </div> 
    </div>
    );
  }
};