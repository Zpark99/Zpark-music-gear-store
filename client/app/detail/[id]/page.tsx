"use client";

import { useState } from "react";
import { useParams } from "next/navigation"; // 💡 주소창 번호를 읽어오는 마법의 부품!
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, User, Plus, Minus, Heart } from "lucide-react";

type ProductType = {
  brand: string;
  name: string;
  price: number;
  originalPrice: string;
  tag: string;
  image: string;
};

// 임시 데이터베이스 
const productDB: Record<string, ProductType> = {
  "1": { brand: "Beyond", name: "비욘드 일렉기타 Classic Standard-E", price: 198000, originalPrice: "258,000원", tag: "23% SALE", image: "🎸 기타 썸네일" },
  "2": { brand: "YAMAHA", name: "야마하 전자드럼 DTX452K", price: 900000, originalPrice: "925,000원", tag: "2% SALE", image: "🥁 드럼 썸네일" },
  "3": { brand: "Headrush", name: "헤드러쉬 멀티이펙터 Flex Prime", price: 790000, originalPrice: "860,000원", tag: "8% SALE", image: "🎛️ 이펙터 썸네일" },
};

export default function ProductDetailPage() {
  const params = useParams(); // 주소창 정보 가져옴
  const productId = params.id as string; // 주소창의 숫자 (예: "1", "2")
  
  // DB에서 번호에 맞는 상품 꺼내오기 (잘못된 번호면 1번 상품 보여주기)
  const product = productDB[productId] || productDB["1"];

  const [quantity, setQuantity] = useState(1);
  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-white">
      
      {/* 상단 3단 헤더 */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
          <Link href="/" className="text-3xl font-black tracking-tighter shrink-0 text-green-700">MUSIC GEAR</Link>
          <div className="flex-1 max-w-xl relative hidden md:block">
            <Input type="text" placeholder="노마진세일" className="w-full rounded-full pl-6 pr-12 h-11 border-2 border-gray-800 focus-visible:ring-0" />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800 cursor-pointer" />
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <ShoppingBag className="w-7 h-7 text-gray-800 cursor-pointer" />
            <User className="w-7 h-7 text-gray-800 cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* 상품 핵심 정보 영역 */}
        <section className="flex flex-col md:flex-row gap-12 mb-20">
          
          {/* 좌측: 상품 사진 */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-50 rounded-2xl h-[500px] flex items-center justify-center border border-gray-100 relative overflow-hidden text-4xl">
               {product.image}
               <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1">{product.tag}</Badge>
            </div>
          </div>

          {/* 우측: 상품 정보 */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-snug">
                {product.name}
              </h1>
              
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-black text-red-600">{product.price.toLocaleString()}원</span>
                <span className="text-lg font-medium text-gray-400 line-through mb-1">{product.originalPrice}</span>
              </div>
            </div>

            {/* 수량 및 총 결제금액 */}
            <div className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-700">수량</span>
                <div className="flex items-center border border-gray-300 rounded-md bg-white">
                  <button onClick={decrease} className="p-2 hover:bg-gray-100 text-gray-600"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button onClick={increase} className="p-2 hover:bg-gray-100 text-gray-600"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-end justify-between pt-4 border-t border-gray-200">
                <span className="font-bold text-lg">총 상품 금액</span>
                <span className="text-3xl font-black text-black">{(product.price * quantity).toLocaleString()}원</span>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-4">
              <Button variant="outline" className="w-16 h-14 border-2 border-gray-300"><Heart className="w-6 h-6 text-gray-400" /></Button>
              <Button variant="outline" className="flex-1 h-14 text-lg font-bold border-2 border-black text-black">장바구니 담기</Button>
              <Button className="flex-1 h-14 text-lg font-bold bg-black text-white">바로 구매하기</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}