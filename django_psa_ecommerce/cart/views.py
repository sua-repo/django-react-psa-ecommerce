from django.shortcuts import render, get_object_or_404, redirect
from cart.cart import Cart
from store.models import Product
from django.http import JsonResponse
from django.contrib import messages

# Create your views here.


# dev_15
def add_cart(request):
    cart = Cart(request)

    print("카트======", cart)

    if request.POST.get("action") == "post":

        # 상품 받아오기
        product_id = int(request.POST.get("product_id"))
        print("product_id", product_id)

        # 상품 개수
        product_qty = int(request.POST.get("product_qty"))
        print("product_qty", product_qty)

        # DB에서 찾아서 product 객체로 변환
        product = get_object_or_404(Product, id=product_id)

        # 세션에 저장
        cart.add(product, product_qty)

        # 카트 전체 개수 가져 오기
        cart_qty = cart.__len__()
        response = JsonResponse({"qty": cart_qty})

        # 세션확인 테스트
        cart.decrypt_all_sessions()

        # dev_22
        messages.success(request, "장바구니에 해당 상품이 추가 되었습니다.")
        # messages.error(request, "장바구니에 해당 상품이 추가 되었습니다.")

        return response


# dev_18
def summary_cart(request):

    # 카트객체 받아 오기
    cart = Cart(request)

    return render(
        request,
        "cart/summary.html",
        {
            "cart": cart,
            "totals": cart.get_product_total,
        },  # dev_21     # 함수 호출 아님 주의
    )


# dev_19
def delete_cart(request):

    # 카트객체 받아 오기
    cart = Cart(request)

    if request.POST.get("action") == "post":
        product_id = int(request.POST.get("product_id"))

        product = Product.objects.get(id=product_id)

        cart.remove(product)

        # dev_22
        messages.success(request, "장바구니에 해당 상품이 삭제 되었습니다.")

        return JsonResponse({"삭제_상품": product_id})


# dev_20
def update_cart(request):

    cart = Cart(request)

    if request.POST.get("action") == "update":
        product_id = int(request.POST.get("product_id"))
        product_qty = int(request.POST.get("product_qty"))

        product = Product.objects.get(id=product_id)

        # 카트 추가가 아닌 업데이트
        cart.add(product, product_qty, True)

        # dev_22
        messages.success(request, "장바구니에 해당 상품이 업데이트 되었습니다.")
        return JsonResponse({"상품 업데이트": product_id})
