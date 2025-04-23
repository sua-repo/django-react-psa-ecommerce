from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


# dev_28
# from api.views import hello_world, hello_world_json, hello_world_drf
from .views import base_views, product_views, category_views

app_name = "api"


# dev_38
from rest_framework import routers

router = routers.DefaultRouter()
router.register("categories", category_views.CategoryViewSet)
# 이렇게 하면 다음 경로들이 자동으로 만들어집니다.
# GET       /categories/        # list
# POST      /categories/        # create
# GET       /categories/<pk>/   # retrieve
# PUT       /categories/<pk>/   # update
# PATCH     /categories/<pk>/   # partial_update
# DELETE    /categories/<pk>/   # destrpy

category_list = category_views.CategoryViewSet.as_view(
    {"get": "list", "post": "create"}
)

category_detail = category_views.CategoryViewSet.as_view(
    {"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}
)

urlpatterns = [
    # path("hello-world/", base_views.hello_world),
    # path("hello-world-json/", base_views.hello_world_json),
    # path("hello-world-drf/", base_views.hello_world_drf),
    # dev_29 proudct_view.py
    # http://127.0.0.1:8000/api/products/
    # 방식      url                 기능
    # GET       products/           list
    # POST      products/           create
    # Get       product/{id}        product
    # PUT       product/{id}        modify product
    # DELETE    product/{id}        delete product
    path("products/", product_views.products_api),
    path("product/<int:pk>/", product_views.product_api),
    # dev_32
    # path("categories/", category_views.categories_api),
    # dev_35
    # 방식      url                 기능
    # GET       categories/         list
    # POST      categories/         create
    # Get       category/{id}       category
    # PUT       category/{id}       modify category
    # DELETE    category/{id}       delete category
    # path("categories/", category_views.CategoriesAPI.as_view()),
    # path("category/<int:pk>/", category_views.CategoryAPI.as_view()),
    # dev_36
    # path("categories/", category_views.CategoriesCustomMixins.as_view()),
    # path("categories/", category_views.CategoriesMixins.as_view()),
    # path("categories/", category_views.CategoryMixins.as_view()),
    # path("category/<int:pk>/", category_views.CategoryMixins.as_view()),
    # path("category/<str:name>/", category_views.CategoryMixins.as_view()),
    # dev_37
    # path("categories/", category_views.CategoriesGenericView.as_view()),
    # path("category/<int:pk>/", category_views.CategoryGenericView.as_view()),
    # dev_38
    path("", include(router.urls)),
    # path("categories/", category_list),
    # path("category/<int:pk>/", category_detail),
]
