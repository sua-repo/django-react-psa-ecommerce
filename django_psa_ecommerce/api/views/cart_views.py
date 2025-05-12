from decimal import Decimal
import json
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from store.models import Product
from api.serializers.product_serializers import ProductSerializer
from rest_framework.response import Response
from cart.cart import CartDRF

# ✅ 카트 API endpoint 예시:
# HTTP       Method           Endpoint     기능
# GET       /api/cart/       장바구니       조회
# POST       /api/cart/       장바구니에    상품 추가
# PUT       /api/cart/       장바구니    상품 수량 변경
# DELETE   /api/cart/       상품 제거 or 전체 비우기
# 🔁 DELETE에서 product_id를 넘기면 해당 상품만 제거, 안 넘기면 전체 비움 처리됩니다.

class CartAPIView(APIView) : 

    def get(self, request) : 
        """
            장바구니 목록 조회
        """
        # DB 안 만들고 old_cart로 처리

        # json을 dictionary 객체로
        cart = json.loads(request.user.old_cart or "{}")
        
        cart_items = []
        total_quantity = 0
        total_price = Decimal("0.00")

        for product_id, item in cart.items() : 
            # product = Product.objects.get(id=product_id)

            try : 
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist : 
                continue    # 없는 상품은 제외

            price = product.sale_price if product.is_sale else product.price

            quantity = item.get("quantity", 0)
            item_total = Decimal(price) * quantity

            cart_items.append(
                {
                    "product": ProductSerializer(product).data,
                    "quantity": quantity,
                    "price": str(price),
                    "total_price": str(item_total),
                }
            )

            total_quantity += quantity
            total_price += item_total

        return Response(
            {
                "cart": cart_items,
                "cart_total_items": total_quantity,
                "cart_total_price": str(total_price),
            }
        )

    def post(self, request) : 
        """
            장바구니에 상품 추가
        """

        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity")

        cart = CartDRF(request)

        try :
            product = Product.objects.get(id=product_id)
            price = product.sale_price if product.is_sale else product.price

            cart.add_to_old_cart(request.user, product.id, price, quantity)
            
            return Response({"message" : "상품이 장바구니에서 제거되었습니다."})
        
        except Product.DoesNotExist : 
            return Response({"error" : "상품이 존재하지 않습니다."}, status=404)

            


    def put(self, request) : 
        pass

    def delete(self, request) : 
        """
            old_cart에서 상품 제거 또는 전체 삭제
        """
    
        user = request.user
        print("user =========", user)

        product_id = request.data.get("product_id")
        print("product_id =========", product_id)

        cart = CartDRF(request)

        # 특정 상품 제외
        if product_id :
            try :
                product = Product.objects.get(id=product_id)
                cart.remove_from_old_cart(user, product_id)
                return Response({"message" : "상품이 장바구니에서 제거되었습니다."})
            
            except Product.DoesNotExist : 
                return Response({"error" : "상품이 존재하지 않습니다."}, status=404)
        
        # 전체 삭제
        else : 
            user.old_cart = "{}"
            user.save()
            return Response({"message" : "장바구니가 비워졌습니다."})

#dev_6_fruits
# POST       /api/cart/merge      장바구니에 상품 추가
class CartMergeAPIView(APIView):

    permission_classes = [IsAuthenticated]  # 로그인된 사람만 아래 함수가 실행되도록
    def post(self, request) : 

        """
            localStorage의 장바구니를 서버 old_cart에 병합
        """
        user = request.user

        local_storage_cart = request.data.get("cart", "{}")
        local_storage_cart = json.loads(local_storage_cart or "{}")

        old_cart = json.loads(user.old_cart or "{}")

        # 병합 : 같은 상품이 있다면 수량 증가
        for product_id, item in local_storage_cart.items():
            quantity = int(item.get("quantity", 0))
            if product_id in old_cart:
                old_cart[product_id]["quantity"] += quantity
            else:
                old_cart[product_id] = {"quantity": quantity}

        user.old_cart = json.dumps(old_cart)    # json을 string으로 만들어서 집어넣어야 함
        user.save()

        return Response({"message": "장바구니가 병합되었습니다."})