from decimal import Decimal
from django.db import models


# Create your models here.
# dev_3


# select * from product, category where Category.id= product.id
# Category.product_set.all()
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


# select * from product, category where Category.id= product.id
# Product.category.all()
class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(
        decimal_places=2, default=Decimal("0"), max_digits=10
    )  # 99999999.99
    description = models.CharField(max_length=250, default="", blank=True, null=True)

    # dev_30 : json 처리를 위해 blank=True, null=True
    image = models.ImageField(upload_to="upload/product/", blank=True, null=True)

    # dev_32 : 역방향 참조를 위해 related_name="products"
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products"
    )

    is_sale = models.BooleanField(default=False)  # dev_6
    sale_price = models.IntegerField(default=0)  # dev_6

    def __str__(self):
        return self.name
