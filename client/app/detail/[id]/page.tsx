"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, User, Plus, Minus, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useCartStore } from "@/store/cartStore";

// Product 인터페이스
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

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string; 

  // 컴포넌트 상태
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [quantity, setQuantity] = useState(1);

  // 전역 상태
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 상품 상세 데이터 패치
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const { data, error } = await supabase
          .from('Products')
          .select('*')
          .eq('id', productId)
          .single();

        if (error) throw error;
        if (data) setProduct(data);
      } catch (err) {
        console.error(err);
        setErrorMsg("상품 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  // 수량 변경 함수
  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // 장바구니 추가 함수
  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: quantity,
    });
    
    alert("장바구니에 담겼습니다.");
  };

  // 로딩 UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-bold text-gray-500">기다려주세요 ㅠㅠ</p>
      </div>
    );
  }

  // 에러 UI
  if (errorMsg || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <p className="text-xl font-bold text-red-500 mb-4">{errorMsg}</p>
        <Link href="/"><Button>메인으로 도망가기</Button></Link>
      </div>
    );
  }

  // 정상 UI
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
          <Link href="/" className="text-3xl font-black tracking-tighter shrink-0 text-green-700">MUSIC GEAR</Link>
          <div className="flex-1 max-w-xl relative hidden md:block">
            <Input type="text" placeholder="검색" className="w-full rounded-full pl-6 pr-12 h-11 border-2 border-gray-800 focus-visible:ring-0" />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800 cursor-pointer" />
          </div>
          <div className="flex items-center gap-5 shrink-0">
            {/* 헤더 뱃지 적용 */}
            <div className="relative">
              <Link href="/cart">
                <ShoppingBag className="w-7 h-7 text-gray-800 cursor-pointer" />
              </Link>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full pointer-events-none">
                  {totalQuantity}
                </span>
              )}
            </div>
            <User className="w-7 h-7 text-gray-800 cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="flex flex-col md:flex-row gap-12 mb-20">
          
          {/* 상품 이미지 */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-50 rounded-2xl h-[500px] flex items-center justify-center border border-gray-100 relative overflow-hidden text-7xl">
               {product.image || "🎸"}
               {product.tag && <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1">{product.tag}</Badge>}
            </div>
          </div>

          {/* 상품 정보 */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-snug">
                {product.name}
              </h1>
              
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-black text-red-600">{product.price?.toLocaleString()}원</span>
                {product.originalPrice && <span className="text-lg font-medium text-gray-400 line-through mb-1">{product.originalPrice}</span>}
              </div>
            </div>

            {/* 수량 계산 */}
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

            {/* 버튼 그룹 */}
            <div className="flex gap-4">
              <Button variant="outline" className="w-16 h-14 border-2 border-gray-300"><Heart className="w-6 h-6 text-gray-400" /></Button>
              {/* 장바구니 버튼 이벤트 연결 */}
              <Button onClick={handleAddToCart} variant="outline" className="flex-1 h-14 text-lg font-bold border-2 border-black text-black">장바구니 담기</Button>
              <Button className="flex-1 h-14 text-lg font-bold bg-black text-white">바로 구매하기</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}