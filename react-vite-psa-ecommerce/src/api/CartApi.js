import http from "./HttpCommon";

// # HTTP       Method              Endpoint          기능
// # GET        /api/cart/          장바구니            조회
// # POST       /api/cart/          장바구니            상품 추가
// # PUT        /api/cart/          장바구니            상품 수량 변경
// # DELETE     /api/cart/                             상품 제거 or 전체 비우기

// # DELETE에서 product_id를 넘기면 해당 상품만 제거, 안 넘기면 전체 비움 처리됩니다.

// dev_6_fruits
export const getCarts = () => {
    return http.get("/api/cart/");
};

// 카트 병합하기
export const mergeCart = (guestCart) => {
    console.log(guestCart)

    return http.post("/api/cart/merge/", {
      cart: guestCart, 
    });
};

