"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, User, Plus, Minus, X, CheckSquare } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  // 전역 상태
  const { cart, increaseQuantity, decreaseQuantity, removeItem } = useCartStore((state) => state);

  // 금액 계산
  const totalItemPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = totalItemPrice === 0 ? 0 : (totalItemPrice >= 50000 ? 0 : 3000);
  const totalPayPrice = totalItemPrice + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* 헤더 */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
          <Link href="/" className="text-3xl font-black tracking-tighter shrink-0 text-green-700">MUSIC GEAR</Link>
          <div className="flex-1 max-w-xl relative hidden md:block">
            <Input type="text" placeholder="노마진세일" className="w-full rounded-full pl-6 pr-12 h-11 border-2 border-gray-800 focus-visible:ring-0" />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800 cursor-pointer" />
          </div>
          <div className="flex items-center gap-5 shrink-0">
            {/* 장바구니 뱃지 */}
            <div className="relative">
              <Link href="/cart">
                <ShoppingBag className="w-7 h-7 text-green-600 cursor-pointer" />
              </Link>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full pointer-events-none">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
            <Link href="/login"><User className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-600" /></Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-3xl font-extrabold mb-10 text-gray-900">장바구니</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 상품 목록 */}
          <section className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 h-fit">
            
            {/* 전체 선택 */}
            <div className="flex items-center justify-between border-b border-gray-900 pb-4 mb-6">
              <div className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                <CheckSquare className="w-5 h-5 text-green-600" />
                <span>전체선택 ({cart.length}/{cart.length})</span>
              </div>
              <button className="text-sm font-medium text-gray-500 hover:text-black hover:underline">선택삭제</button>
            </div>

            {/* 빈 장바구니 */}
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-gray-500 mb-6 text-lg font-medium">장바구니가 텅 비어있습니다.</p>
                <Link href="/">
                  <Button className="bg-black text-white px-8 font-bold h-12">쇼핑하러 가기</Button>
                </Link>
              </div>
            ) : (
              // 상품 렌더링
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 md:gap-6 items-start py-4 border-b border-gray-100 pb-8 relative group">
                    <CheckSquare className="w-5 h-5 text-green-600 mt-2 cursor-pointer shrink-0" />
                    
                    {/* 썸네일 */}
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl flex items-center justify-center text-3xl border border-gray-200 shrink-0">
                      🎸
                    </div>

                    {/* 상품 정보 */}
                    <div className="flex-1 flex flex-col h-full justify-between">
                      <div>
                        {/* TODO: 브랜드 연동 */}
                        <p className="text-xs md:text-sm font-bold text-gray-500 mb-1">브랜드</p>
                        <Link href={`/detail/${item.id}`} className="font-bold text-gray-800 hover:underline line-clamp-2 md:text-lg">
                          {item.name}
                        </Link>
                      </div>
                      
                      <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        {/* 수량 조절 */}
                        <div className="flex items-center border border-gray-300 rounded-md w-fit bg-white">
                          <button onClick={() => decreaseQuantity(item.id)} className="p-1 md:p-2 hover:bg-gray-100 text-gray-600"><Minus className="w-4 h-4" /></button>
                          <span className="w-8 md:w-12 text-center font-bold text-sm">{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item.id)} className="p-1 md:p-2 hover:bg-gray-100 text-gray-600"><Plus className="w-4 h-4" /></button>
                        </div>
                        <span className="text-xl md:text-2xl font-black">{(item.price * item.quantity).toLocaleString()}원</span>
                      </div>
                    </div>

                    {/* 삭제 버튼 */}
                    <button onClick={() => removeItem(item.id)} className="absolute top-4 right-0 text-gray-400 hover:text-red-500 transition-colors p-1">
                      <X className="w-5 h-5" />
                    </button>
                    
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 결제 정보 */}
          <aside className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
              <h3 className="font-bold text-lg mb-6 text-gray-800">결제예정금액</h3>
              
              <div className="space-y-4 text-sm font-medium text-gray-600 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>총 상품금액</span>
                  <span>{totalItemPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>총 배송비</span>
                  <span>{shippingFee === 0 ? "무료" : `+${shippingFee.toLocaleString()}원`}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>총 할인금액</span>
                  <span>-0원</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-gray-800">최종 결제금액</span>
                <span className="text-3xl font-black text-green-600">{totalPayPrice.toLocaleString()}원</span>
              </div>

              <Button className="w-full h-14 text-lg font-bold bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300" disabled={cart.length === 0}>
                구매하기 ({cart.length}개)
              </Button>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}