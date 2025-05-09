import http from "./HttpCommon";

// dev_8_2_fruits
// http://127.0.0.1:8000/api/payments/
// # GET /api/payments/ – 전체 결제 내역
// # POST /api/payments/ – 결제 내역 생성
// # GET /api/payments/<id>/ – 단일 결제 조회
// # PUT/PATCH /api/payments/<id>/ – 수정
// # DELETE /api/payments/<id>/ – 삭제
// 결제 후 주문 저장

export const createPayment = (shippingData, imp_uid, paid_amount) => {
    return http.post('/api/payments/', {
        shippingData : shippingData, 
        imp_uid : imp_uid, 
        paid_amount : paid_amount,
    });
}