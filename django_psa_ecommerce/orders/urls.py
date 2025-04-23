from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from orders import views


# dev_15
app_name = "orders"

urlpatterns = [path("create/", views.create_orders, name="create_orders")]
