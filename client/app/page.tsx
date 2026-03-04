"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Menu, ShoppingBag, User } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  tag?: string;
}

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('일렉기타');

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const itemWidth = scrollRef.current.children[0].clientWidth + 16; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -itemWidth : itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const quickLinks = ['일렉기타', '베이스기타', '이펙터', '전자드럼', '신상품'];

  const newArrivals = [
    { id: 1, name: "Epiphone Inspired Gibson 에피폰 일렉기타 1959 Les Paul Washed Bourbon Burst", price: "1,799,000", discount: "30%" },
    { id: 2, name: "Epiphone 일렉기타 Kirk Hammet Greeny 1959 Les Paul Standard", price: "1,850,000", discount: "14%" },
    { id: 3, name: "Gibson USA Original Collection Les Paul Special", price: "2,399,000", discount: "24%" },
    { id: 4, name: "Gibson USA 레스폴 일렉기타 Les Paul Studio Session Bourbon Burst", price: "2,899,000", discount: "15%" },
    { id: 5, name: "Epiphone 에피폰 일렉기타 Les Paul Traditional Pro IV Metallic Gold", price: "801,000", discount: "41%", tag: "" }
  ];

  // 💡 비어있던 전자드럼과 멀티이펙터 데이터 꽉꽉 채워넣었습니다!
  const bestProducts: Record<string, Product[]> = {
    '일렉기타': [
      { id: 11, brand: "Beyond", name: "비욘드 일렉기타 Classic Standard-E", price: "198,000", originalPrice: "258,000", discount: "23%", tag: "" },
      { id: 12, brand: "Squier", name: "일렉기타 Classic Vibe 50s Stratocaster", price: "637,000", originalPrice: "764,400", discount: "16%", tag: "품절" },
      { id: 13, brand: "Beyond", name: "비욘드 일렉기타 Classic Standard-Y", price: "338,000", originalPrice: "460,000", discount: "26%", tag: "" },
      { id: 14, brand: "SPEAR", name: "2026 NEW SPEAR", price: "432,500", originalPrice: "574,000", discount: "24%", tag: "" },
    ],
    '베이스': [
      { id: 1, brand: "Beyond", name: "비욘드 베이스기타 Modern Jazz Bass Standard-X (Black)", price: "318,000", originalPrice: "397,500", discount: "20%", tag: "" },
      { id: 2, brand: "YAMAHA", name: "야마하 베이스 YAMAHA TRBX174 4-Colors", price: "320,000", originalPrice: "", discount: "", tag: "" },
      { id: 3, brand: "Beyond", name: "Beyond 베이스기타 Cement Gray(액티브 베이스)", price: "448,000", originalPrice: "546,000", discount: "17%", tag: "" },
      { id: 4, brand: "SPEAR", name: "Spear 스피어 일렉베이스 SAJ-250P", price: "439,000", originalPrice: "526,000", discount: "16%", tag: "" },
    ],
    '통기타': [
      { id: 5, brand: "Gopherwood", name: "고퍼우드 Gopher wood 어쿠스틱기타 G100 NS", price: "210,000", originalPrice: "260,000", discount: "19%", tag: "품절" },
      { id: 6, brand: "Cort", name: "콜트기타 Cort 통기타 Earth100 OM RW", price: "359,000", originalPrice: "450,000", discount: "20%", tag: "" },
      { id: 7, brand: "Peerless", name: "Peerless 피어리스 어쿠스틱기타 PD-70", price: "770,000", originalPrice: "1,100,000", discount: "30%", tag: "" },
      { id: 8, brand: "Cort", name: "콜트기타 Cort 통기타 Arium", price: "199,000", originalPrice: "238,800", discount: "16%", tag: "" }
    ],
    '전자드럼': [
      { id: 21, brand: "YAMAHA", name: "Yamaha 야마하 전자드럼 DTX452K", price: "900,000", originalPrice: "925,000", discount: "2%", tag: "" },
      { id: 22, brand: "Samick", name: "Samick 삼익 전자드럼 비트 마스터 SED-20 (악세사리 포함 풀패키지)", price: "499,000", originalPrice: "", discount: "", tag: "" },
      { id: 23, brand: "YAMAHA", name: "야마하 전자드럼 Yamaha DTX6K3-X", price: "3,035,000", originalPrice: "3,400,000", discount: "10%", tag: "" },
      { id: 24, brand: "EFNOTE", name: "EFNOTE 전자드럼 EFNOTE3 이에프노트 5pcs 5기통", price: "2,890,000", originalPrice: "", discount: "", tag: "" }
    ],
    '멀티이펙터': [
      { id: 31, brand: "Headrush", name: "Headrush 헤드러쉬 멀티이펙터 Flex Prime", price: "790,000", originalPrice: "860,000", discount: "8%", tag: "" },
      { id: 32, brand: "HOTONE", name: "HOTONE 핫톤 Ampero II Stomp 멀티이펙터", price: "645,000", originalPrice: "774,000", discount: "16%", tag: "" },
      { id: 33, brand: "LINE 6", name: "Line6 멀티이펙터 POD GO", price: "880,000", originalPrice: "", discount: "", tag: "" },
      { id: 34, brand: "MOOER", name: "MOOER AUDIO 무어오디오 기타 멀티이펙터 GS1000", price: "639,000", originalPrice: "766,000", discount: "16%", tag: "" }
    ]
  };

  const categoryTabs = ['일렉기타', '베이스', '통기타', '전자드럼', '멀티이펙터'];

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

        {/* 서비스 바로가기 */}
        <section className="mb-20">
          <h3 className="text-2xl font-extrabold mb-8 text-left">서비스 바로가기</h3>
          <div className="flex justify-start md:justify-center gap-4 md:gap-8 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden">
            {quickLinks.map((link, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:border-black group-hover:shadow-md transition-all">
                   <span className="text-xs text-gray-400">아이콘</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">{link}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 새로 들어왔습니다!! */}
        <section className="mb-24 text-left relative group/slider">
          <h3 className="text-xl font-extrabold mb-6">새로 들어왔습니다!!</h3>
          <div onClick={() => handleScroll('left')} className="absolute top-1/2 left-[-20px] z-10 bg-[#222] text-white w-10 h-10 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 cursor-pointer transition-opacity shadow-md rounded-full">{"<"}</div>
          <div onClick={() => handleScroll('right')} className="absolute top-1/2 right-[-20px] z-10 bg-[#222] text-white w-10 h-10 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 cursor-pointer transition-opacity shadow-md rounded-full">{">"}</div>
          
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {newArrivals.map((item) => (
              <Card key={item.id} className="min-w-[220px] md:min-w-[260px] snap-start cursor-pointer border-none shadow-none group shrink-0">
                <CardContent className="p-0 relative">
                  <div className="bg-gray-100 rounded-sm h-64 mb-4 flex items-center justify-center text-gray-400 text-sm group-hover:bg-gray-200 transition-colors">
                    상품 이미지
                  </div>
                  {item.discount && (
                    <div className="absolute top-2 right-2 bg-[#222] text-white text-[11px] font-bold w-10 h-10 flex items-center justify-center rounded-full">
                      {item.discount}
                    </div>
                  )}
                  <div className="px-1 space-y-1">
                    <h4 className="font-medium text-sm line-clamp-2 leading-snug mb-2 text-gray-600 group-hover:underline">
                      {item.name}
                    </h4>
                    <p className="text-lg font-extrabold text-black">{item.price}원</p>
                    {item.tag && (
                      <Badge variant="secondary" className="mt-1 text-[10px] bg-gray-500 text-white hover:bg-gray-600">
                        {item.tag}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 카테고리별 BEST  */}
        <section className="mb-20">
          <h3 className="text-2xl font-extrabold mb-6 text-left">카테고리별 BEST</h3>
          
          <div className="flex justify-start gap-2 mb-10 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categoryTabs.map((tab) => (
              <Button 
                key={tab}
                onClick={() => setActiveCategory(tab)}
                variant={activeCategory === tab ? "default" : "secondary"}
                className={`rounded-full px-6 font-bold ${
                  activeCategory === tab 
                    ? "bg-black text-white" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-left min-h-[400px]">
            {bestProducts[activeCategory]?.length > 0 ? (
              bestProducts[activeCategory].map((item) => (
                 <Card key={item.id} className="cursor-pointer border-none shadow-none group relative">
                   <CardContent className="p-0">
                     <div className="bg-gray-100 rounded-sm h-64 mb-4 flex items-center justify-center text-gray-400 text-sm relative group-hover:bg-gray-200 transition-colors">
                       상품 이미지
                       {item.discount && (
                         <div className="absolute top-3 right-3 bg-[#111] text-white text-xs font-bold w-10 h-10 flex items-center justify-center rounded-full">
                           {item.discount}
                         </div>
                       )}
                     </div>
                     <div className="px-1 space-y-1 relative">
                       <p className="text-xs font-semibold text-gray-500">{item.brand}</p>
                       <h4 className="font-medium text-sm line-clamp-2 leading-snug mb-2 text-gray-800 group-hover:underline h-10">
                         {item.name}
                       </h4>
                       <p className="text-lg font-extrabold text-black">{item.price}원</p>
                       {item.originalPrice && (
                         <p className="text-sm font-medium text-gray-400 line-through">{item.originalPrice}원</p>
                       )}
                       {item.tag === "품절" && (
                         <Badge variant="destructive" className="mt-1 text-[10px]">SOLD OUT</Badge>
                       )}
                     </div>
                   </CardContent>
                 </Card>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400 font-medium">
                아직 {activeCategory} 상품이 준비되지 않았습니다 🎸
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}