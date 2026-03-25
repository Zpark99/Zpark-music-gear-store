"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // 💡 Link 추가!
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("아이디(이메일)와 비밀번호를 입력해주세요!");
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      alert("로그인 성공!");
      router.push("/");
    } catch {
      alert("로그인 실패: 이메일이나 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 구글 로그인
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`, // 로그인 성공하면 메인페이지로
      }
    });
    if (error) alert("구글 로그인 에러: " + error.message);
  };

  // 카카오 로그인
  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/`,
      }
    });
    if (error) alert("카카오 로그인 에러: " + error.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <h1 className="mb-8 text-2xl font-bold text-center">로그인</h1> 
        
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
              placeholder="비밀번호를 입력하여 주세요." 
              className="h-12" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="saveId" className="h-4 w-4 rounded border-gray-300 cursor-pointer" />
            <label htmlFor="saveId" className="text-sm text-gray-600 cursor-pointer select-none">
              아이디 저장
            </label>        
          </div>

          <Button 
            onClick={handleLogin}
            disabled={isLoading}
            className="h-12 w-full bg-black text-base text-white hover:bg-gray-800 mt-2"
          >
            {isLoading ? "처리 중..." : "로그인"}
          </Button>
        </div>

        <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-200 after:mt-0.5 after:flex-1 after:border-t after:border-gray-200">
          <p className="mx-4 mb-0 text-center text-sm text-gray-500 font-medium">SNS 간편 로그인</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleKakaoLogin} className="h-12 flex-1 font-semibold text-[#391B1B] bg-[#FEE500] hover:bg-[#FEE500]/90 border-none">
            카카오톡
          </Button>
          <Button variant="outline" onClick={handleGoogleLogin} className="h-12 flex-1 font-semibold border-gray-300">
            Google
          </Button>
        </div>
        <div className="mt-8 flex justify-center gap-4 text-sm text-gray-500">
          {/* 회원가입 페이지 이동 */}
          <Link href="/signup" className="hover:text-black hover:underline">회원가입</Link>
          <span className="text-gray-300">|</span>
          <button className="hover:text-black hover:underline">아이디 찾기</button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-black hover:underline">비밀번호 찾기</button>
        </div>
      </div> 
    </div>
  );
}