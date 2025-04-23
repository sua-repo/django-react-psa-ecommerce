from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from cart import views

# dev_15
app_name = "cart"

urlpatterns = [
    path("add/", views.add_cart, name="add_cart"),
    path("", views.summary_cart, name="summary_cart"),  # dev_18
    path("delete/", views.delete_cart, name="delete_cart"),  # dev_19
    path("update/", views.update_cart, name="update_cart"),  # dev_20
]
