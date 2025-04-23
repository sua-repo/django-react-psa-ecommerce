from django.contrib import admin
from orders.models import Order, OrderItem, ShippingAddress

# Register your models here.

# dev_24
admin.site.register(Order)
admin.site.register(OrderItem)


# dev_25
admin.site.register(ShippingAddress)
