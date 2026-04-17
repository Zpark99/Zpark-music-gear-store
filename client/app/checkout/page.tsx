"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import DaumPostcode from "react-daum-postcode";
import { X } from "lucide-react";
// 토스페이먼츠 SDK 추가
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";


const TOSS_CLIENT_KEY = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const CUSTOMER_KEY = "test_customer_key_1234"; 

export default function CheckoutPage() {
  const { cart } = useCartStore();
  
  // 주소 및 폼 상태
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [addressObj, setAddressObj] = useState({ zonecode: "", address: "", detail: "", name: "", phone: "" });

  // 토스페이먼츠 관련 Ref
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paymentMethodsWidgetRef = useRef<any>(null);

  // 금액 계산
  const totalItemPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = totalItemPrice === 0 ? 0 : (totalItemPrice >= 50000 ? 0 : 3000);
  const totalPayPrice = totalItemPrice + shippingFee;

  // 1. 토스 위젯 렌더링 (화면 켜질 때 딱 한 번)
  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const paymentWidget = await loadPaymentWidget(TOSS_CLIENT_KEY, CUSTOMER_KEY);
        paymentWidgetRef.current = paymentWidget;

        // 결제 UI (카드, 가상계좌 등) 렌더링
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
          "#payment-widget",
          { value: totalPayPrice },
          { variantKey: "DEFAULT" }
        );
        paymentMethodsWidgetRef.current = paymentMethodsWidget;

        // 필수 약관 UI 렌더링
        paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
      } catch (error) {
        console.error("토스 위젯 로드 실패:", error);
      }
    };
    if (totalPayPrice > 0) fetchPaymentWidget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. 장바구니 수량 바뀌어서 결제 금액 달라지면 위젯에 실시간 업데이트
  useEffect(() => {
    if (paymentMethodsWidgetRef.current) {
      paymentMethodsWidgetRef.current.updateAmount(totalPayPrice);
    }
  }, [totalPayPrice]);

  // 주소 검색 완료 핸들러
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddressComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "") extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddressObj({ ...addressObj, zonecode: data.zonecode, address: fullAddress });
    setIsPostcodeOpen(false);
  };

  // 3. 진짜 결제 요청 핸들러 (토스 창 띄우기)
  const handlePayment = async () => {
    if (cart.length === 0) return alert("장바구니가 비어있습니다!");
    if (!addressObj.address || !addressObj.name || !addressObj.phone) return alert("배송지 정보를 모두 입력해주세요!");

    try {
      // 결제창 호출
      await paymentWidgetRef.current?.requestPayment({
        orderId: `ORDER_${new Date().getTime()}`, // 고유 주문번호 생성
        orderName: cart.length > 1 ? `${cart[0].name} 외 ${cart.length - 1}건` : cart[0].name,
        customerName: addressObj.name,
        customerEmail: "customer@test.com",
        customerMobilePhone: addressObj.phone.replace(/-/g, ''), // 하이픈 제거
        // 결제 성공/실패 시 돌아올 페이지 주소 (일단 메인으로 보냄. 나중에 분리 예정)
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 relative">
      <header className="border-b border-gray-200 bg-white h-20 flex items-center px-4">
        <div className="max-w-6xl mx-auto w-full">
          <Link href="/" className="text-3xl font-black tracking-tighter text-green-700">MUSIC GEAR</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-3xl font-extrabold mb-10 text-gray-900">주문서 작성</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 좌측: 폼 & 토스 결제 위젯 */}
          <section className="flex-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-6 border-b pb-4">배송지 정보</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-1 block">수령인</label>
                  <Input placeholder="이름을 입력하세요" value={addressObj.name} onChange={(e) => setAddressObj({...addressObj, name: e.target.value})} className="h-12" />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-1 block">연락처</label>
                  <Input placeholder="010-0000-0000" value={addressObj.phone} onChange={(e) => setAddressObj({...addressObj, phone: e.target.value})} className="h-12" />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-1 block">배송 주소</label>
                  <div className="flex gap-2 mb-2">
                    <Input placeholder="우편번호" value={addressObj.zonecode} readOnly className="h-12 w-28 bg-gray-50" />
                    <Button onClick={() => setIsPostcodeOpen(true)} variant="outline" className="h-12 border-gray-300 font-bold hover:bg-gray-100">주소 검색</Button>
                  </div>
                  <Input placeholder="기본 주소" value={addressObj.address} readOnly className="h-12 mb-2 bg-gray-50" />
                  <Input placeholder="상세 주소를 입력해주세요" value={addressObj.detail} onChange={(e) => setAddressObj({ ...addressObj, detail: e.target.value })} className="h-12" />
                </div>
              </div>
            </div>

            {/* 토스 위젯 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h3 className="font-bold text-lg mb-4">결제 수단</h3>
               <div id="payment-widget" className="w-full" />
            </div>
          </section>

          {/* 우측: 최종 금액 & 결제 버튼 */}
          <aside className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
              <h3 className="font-bold text-lg mb-6 text-gray-800">최종 결제금액</h3>
              
              <div className="space-y-4 text-sm font-medium text-gray-600 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>총 상품금액 ({cart.length}개)</span>
                  <span>{totalItemPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>총 배송비</span>
                  <span>{shippingFee === 0 ? "무료" : `+${shippingFee.toLocaleString()}원`}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-gray-800">최종 결제금액</span>
                <span className="text-3xl font-black text-red-600">{totalPayPrice.toLocaleString()}원</span>
              </div>

              {/* 토스 약관 */}
              <div id="agreement" className="w-full mb-4" />

              <Button onClick={handlePayment} disabled={cart.length === 0} className="w-full h-14 text-lg font-bold bg-black text-white hover:bg-gray-800">
                {totalPayPrice.toLocaleString()}원 결제하기
              </Button>
            </div>
          </aside>
        </div>
      </main>

      {/* 다음 우편번호 모달 */}
      {isPostcodeOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-lg">주소 검색</h3>
              <button onClick={() => setIsPostcodeOpen(false)} className="p-1 hover:bg-gray-100 rounded-md">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <DaumPostcode onComplete={handleAddressComplete} style={{ height: "450px" }} />
          </div>
        </div>
      )}
    </div>
  );
}