"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Menu, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  originalPrice?: string;
  discount?: string;
  tag?: string;
  category: string;
  image?: string;
}

export default function HomePage() {

  const [activeCategory, setActiveCategory] = useState('일렉기타');

  // DB에서 가져옴
  const [products, setProducts] = useState<Product[]>([]);

  // 상태창 추가
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // 화면 켜지면 DB 가져옴
  useEffect(() => {
    const fetchProducts = async () => {
      try {
      const { data, error } = await supabase
        .from('Products')
        .select('*');

      if (error) throw error;

      console.log("Supabase가 준 데이터:", data);
      
      if (data) setProducts(data);
    } catch (err) {
      setErrorMsg("상품을 불러오는데 실패 했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  fetchProducts();
  }, []);


  const categoryTabs = ['일렉기타', '베이스', '통기타', '이펙터', '드럼'];

  const filteredProducts = products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* 3단 헤더 */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="border-b border-gray-100 hidden md:block">
          <div className="max-w-6xl mx-auto px-4 h-8 flex items-center justify-end text-[11px] text-gray-500 font-medium">
            <div className="flex gap-4">
              <Link href="/login" className="hover:text-black">로그인</Link>
              <Link href="#" className="hover:text-black">회원가입</Link>
              <Link href="#" className="hover:text-black">고객센터</Link>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
          <div className="text-3xl font-black tracking-tighter shrink-0 text-green-700">MUSIC GEAR</div>
          <div className="flex-1 max-w-xl relative hidden md:block">
            <Input type="text" placeholder="검색" className="w-full rounded-full pl-6 pr-12 h-11 border-2 border-gray-800 focus-visible:ring-0" />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800 cursor-pointer" />
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <ShoppingBag className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-600" />
            <User className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-600" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center gap-8 text-sm font-bold text-gray-800">
          <div className="flex items-center gap-2 cursor-pointer hover:text-green-600">
            <Menu className="w-5 h-5" />
            <span>전체카테고리</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="hover:text-green-600">기타</Link>
            <Link href="#" className="hover:text-green-600">드럼</Link>
            <Link href="#" className="hover:text-green-600">레코딩</Link>
            <Link href="#" className="hover:text-green-600">건반</Link>
            <Link href="#" className="hover:text-green-600">음향장비</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-24 text-center mt-8">
        
        {/* 메인 롤링 배너 */}
        <section className="mb-16 w-full">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md">
             <Image 
               src="/images/music-gear-welcome-final_2026.png" 
               alt="웰컴 배너" 
               width={1200} 
               height={400} 
               className="w-full h-auto object-cover block" 
               priority
             />
          </div>
        </section>

       {/* 카테고리별 BEST (실시간 db연동)*/}
        <section className="mb-20 mt-24">
          <h3 className="text-2xl font-extrabold mb-6 text-left">카테고리별 BEST</h3>
          
          <div className="flex justify-start gap-2 mb-10 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categoryTabs.map((tab) => (
              <Button 
                key={tab}
                onClick={() => setActiveCategory(tab)}
                variant={activeCategory === tab ? "default" : "secondary"}
                className={`rounded-full px-6 font-bold ${activeCategory === tab ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}
              >
                {tab}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-left min-h-[400px]">
            {/* 로딩 중 일때 */}
            {isLoading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-500">
                <p className="font-bold text-lg animate-pulse">악기 창고 문 여는 중</p>
              </div>
            // 에러 났을때 
            ) : errorMsg ? (
              <div className="col-span-full py-20 text-center text-red-500 font-bold">
                {errorMsg}
              </div>
            // DB에서 걸러낸 filteredProducts를 맵핑 
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                 <Link href={`/detail/${item.id}`} key={item.id}>
                   <Card className="cursor-pointer border-none shadow-none group relative h-full">
                     <CardContent className="p-0">
                       <div className="bg-gray-100 rounded-sm h-64 mb-4 flex items-center justify-center text-3xl relative group-hover:bg-gray-200 transition-colors">
                         {item.image || "🎸"}
                         {item.discount && <div className="absolute top-3 right-3 bg-[#111] text-white text-xs font-bold w-10 h-10 flex items-center justify-center rounded-full">{item.discount}</div>}
                       </div>
                       <div className="px-1 space-y-1 relative">
                         <p className="text-xs font-semibold text-gray-500">{item.brand}</p>
                         <h4 className="font-medium text-sm line-clamp-2 leading-snug mb-2 text-gray-800 group-hover:underline h-10">{item.name}</h4>
                         {/* 가격에 콤마(,) 적용 */}
                         <p className="text-lg font-extrabold text-black">{item.price?.toLocaleString()}원</p>
                         {item.originalPrice && <p className="text-sm font-medium text-gray-400 line-through">{item.originalPrice}</p>}
                         {item.tag === "품절" && <Badge variant="destructive" className="mt-1 text-[10px]">SOLD OUT</Badge>}
                       </div>
                     </CardContent>
                   </Card>
                 </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400 font-medium">
                아직 {activeCategory} 상품이 창고에 없습니다
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}