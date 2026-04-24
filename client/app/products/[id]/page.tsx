/**
 * @file app/products/[id]/page.tsx
 * @description Supabase 실데이터 연동 및 상세 페이지 UI 바인딩
 */

import ProductActions from "@/components/ProductActions";
import { notFound } from "next/navigation";
// 프로젝트 구조에 맞게 supabase 클라이언트 경로를 수정.
import { supabase } from "@/lib/supabase"; 
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  // 1. Supabase에서 해당 id의 상품 데이터 단건 조회
  const { data: Products, error } = await supabase
    .from("Products")
    .select("*")
    .eq("id", id)
    .single();

  // 2. 예외 처리: 에러가 발생했거나 해당 상품이 없으면 404 Not Found 페이지로 이동
  if (error || !Products) {
    console.error("Fetch Error:", error?.message);
    notFound(); 
  }

  // 3. 정상적으로 데이터를 받아왔다면 UI에 바인딩
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* 왼쪽: 상품 이미지 영역 */}
        <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden relative">
          {Products.image_url ? (
            <Image
              src={Products.image_url} 
              alt={Products.name || "상품 이미지"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw" 
              className="object-cover" 
            />
          ) : (
            <span className="text-gray-400 font-medium">No Image</span>
          )}
        </div>

        {/* 오른쪽: 상품 정보 및 액션 영역 */}
        <div className="flex flex-col space-y-6">
          <header>
            {/* DB에서 가져온 상품명 바인딩 */}
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {Products.name}
            </h1>
            {/* DB에서 가져온 가격 바인딩 (천 단위 콤마) */}
            <p className="mt-4 text-2xl font-semibold text-blue-600">
              ₩ {Products.price?.toLocaleString()}
            </p>
          </header>

          <section className="border-t border-b py-6 text-gray-600">
            {/* DB에서 가져온 상세 설명 바인딩 */}
            <p className="leading-relaxed whitespace-pre-wrap">
              {Products.description || "상세 설명이 없습니다."}
            </p>
          </section>

          {/* 수량 및 구매 액션 */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <ProductActions product={Products.id}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}