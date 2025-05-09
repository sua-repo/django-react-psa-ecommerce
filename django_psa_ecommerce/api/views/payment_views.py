from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status

from rest_framework import viewsets
from api.serializers.payment_serializers import PaymentSerializer, ShippingAdressSerializer
from orders.models import Order, OrderItem
from payment.models import Payment

# dev_8_2_fruits
# GET /api/payments/ – 전체 결제 내역
# POST /api/payments/ – 결제 내역 생성
# GET /api/payments/<id>/ – 단일 결제 조회
# PUT/PATCH /api/payments/<id>/ – 수정
# DELETE /api/payments/<id>/ – 삭제

class PaymentViewSet(viewsets.ModelViewSet) : 
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    # create 커스터마이징
    # POST /api/payments/ – 결제 내역 생성 커스터마이징
    def create(self,  request, *args, **kwargs) : 

        # 1. 주문 생성
        # 2. 배송지 저장 (user, order 를 함께 저장)
        # 3. 결제 저장 (serializer 사용 가능)
        try : 
            user = request.user
            imp_uid = request.data.get("imp_uid")
            paid_amount = request.data.get("paid_amount")
            shippingData = request.data.get("shippingData")

            print("서버 결제 처리 =====", user, imp_uid, paid_amount, shippingData)

            # 1. 주문 생성
            order = Order.objects.create(
                user = user,
                amount_paid = paid_amount,
            )
            print("1. 주문 생성 완료", order)


            # 2. 배송지 저장 (user, order 를 함께 저장)
            shipping_serializer = ShippingAdressSerializer(data=shippingData)
            shipping_serializer.is_valid(raise_exception=True)
            shipping = shipping_serializer.save(user=user, order=order) # serializer에서 exclude 했음

            print("2. 배송지 저장 완료", shipping)


            # 3. 결제 저장 (serializer 사용 가능)
            # self.get_serializer에서 self는 ModelViewSet를 상속하는 PaymentViewSet 객체 자체 / get_serializer를 통해 serializer 하나 생성해줌
            payment_serializer = self.get_serializer(
                data = {
                    "imp_uid" : imp_uid,
                    "user" : user.id,
                    "order" : order.id,
                    "paid_amount" : paid_amount,
                }
            )
            payment_serializer.is_valid(raise_exception=True)
            payment = payment_serializer.save()

            print("3. 결제 저장 완료", payment)

            # 4. 응답 반환

            return Response(
                {
                    "message" : "결제 및 주문 저장 성공",
                    "order_id" : order.id,
                    "payment_id" : payment.id,
                },
                status = status.HTTP_201_CREATED    # 201 or status = 201 도 가능
            )

        except Exception as e :
            print(e)
            return Response({
                "error" : str(e),
                "detail" : "❌ 결제 처리 중 오류가 발생했습니다.",
            },
            status = status.HTTP_400_BAD_REQUEST,
            )
