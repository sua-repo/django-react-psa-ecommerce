from django.db import models

from store.models import Product

# Create your models here.


# dev_24
class Order(models.Model):
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    amount_paid = models.PositiveBigIntegerField(default=0)  # 계산 총액
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Order - {str(self.id)}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=True, blank=True
    )
    quantity = models.PositiveBigIntegerField(default=1)  # 수량
    price = models.PositiveBigIntegerField(default=0)  # 가격

    def __str__(self):
        return f"Order - {str(self.id)}"

    def get_cost(self):
        return self.price * self.quantity


# dev_25
# dev_26_2
# 일반적인 상거래 에서는 주문과 배송지는 1:1 관계 이나
# 배송지 변경(또는 명절 등)을 위한 히스토리를 남기기 위해 1:N 으로 하는 케이스도 있음

# ShippingAddress
# +----+--------+---------------------+
# | id | order_id (unique) | address |
# +----+--------+---------------------+
# | 1  |   1    | 서울특별시 강남구    |
# +----+--------+---------------------+


class ShippingAddress(models.Model):
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)

    # dev_26_2
    order = models.OneToOneField(Order, on_delete=models.CASCADE)

    full_name = models.CharField(max_length=125)
    phone = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    address1 = models.CharField(max_length=255)
    address2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255, null=True, blank=True)
    zipcode = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Dont' plurallize address
    # 어드민 패널을 만지다 보면 내가 등록한 모델 이름을 장고 어드민이 알아서 복수로 만들어 주는 것을 알 수 있다.
    # 그럴때 가끔 -y 로 끝나는 단어의 끝에도 그냥 s를 붙이는 경우가 있는데,
    # 이때 메타 클래스의 verbose_name을 이용해서 바꿔줄 수 있다.

    # verbose_name_plural 옵션
    # 사용자가 읽기 쉬운 모델 객체의 이름으로 관리자 화면 등에서 표시되는 것은 동일하나 영어를 기준으로 복수형이다.
    # 한국어에서는 굳이 단수와 복수를 구별해 사용하지 않으므로 verbose_name과 동일하게 쓸 수 있다.
    # verbose_name_plural 옵션을 지정하지 않으면 verbose_name에 s를 붙인다.

    class Meta:
        verbose_name_plural = "배송주소"

    def __str__(self):
        return f"{self.user.username} - {self.address1}"
