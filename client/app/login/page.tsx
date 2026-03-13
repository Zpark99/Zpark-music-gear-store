import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    // 1. 전체 화면 정렬 
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      
      {/* 2. 하얀색 로그인 박스 */}
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        
        {/* 상단 타이틀 */}
        <h1 className="mb-8 text-2xl font-bold text-center">로그인</h1> 
        
        {/* 3. 입력 폼 영역  */}
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">아이디</label>
            <Input type="email" placeholder="아이디를 입력 해 주세요." className="h-12"/>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">비밀번호</label>
            <Input type="password" placeholder="비밀번호를 입력하여 주세요." className="h-12" />
          </div>

          {/* 아이디 저장 체크박스 */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="saveId" className="h-4 w-4 rounded border-gray-300 cursor-pointer" />
            <label htmlFor="saveId" className="text-sm text-gray-600 cursor-pointer select-none">
              아이디 저장
            </label>        
          </div>

          {/* 메인 로그인 버튼 */}
          <Button className="h-12 w-full bg-black text-base text-white hover:bg-gray-800 mt-2">
            로그인
          </Button>
        </div>

        {/* 구분선 */}
        <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-200 after:mt-0.5 after:flex-1 after:border-t after:border-gray-200">
          <p className="mx-4 mb-0 text-center text-sm text-gray-500 font-medium">
            SNS 간편 로그인
          </p>
        </div>

        {/* SNS 버튼 영역 */}
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 flex-1 font-semibold">카카오톡</Button>
          <Button variant="outline" className="h-12 flex-1 font-semibold">Google</Button>
        </div>

        {/* 회원가입, 아이디 찾기, 비밀번호 찾기 */}
        <div className="mt-8 flex justify-center gap-4 text-sm text-gray-500">
          <button className="hover:text-black hover:underline">회원가입</button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-black hover:underline">아이디 찾기</button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-black hover:underline">비밀번호 찾기</button>
        </div>

      </div> {/* <-- 하얀색 로그인 박스는 여기서 닫혀야 함 */}
      
    </div>
  );
}