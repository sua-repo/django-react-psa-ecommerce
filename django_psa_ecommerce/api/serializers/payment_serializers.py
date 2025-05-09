from rest_framework import serializers
from payment.models import Payment
from orders.models import ShippingAddress

# dev_8_2_fruits
class PaymentSerializer(serializers.ModelSerializer) :
    class Meta : 
        model = Payment
        fields = "__all__"  # 주문 포함


class ShippingAdressSerializer(serializers.ModelSerializer) :
    class Meta : 
        model = ShippingAddress
        exclude = ["user", "order"]
