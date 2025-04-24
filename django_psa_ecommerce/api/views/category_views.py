from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.generics import GenericAPIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated


from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import filters

from store.models import Category


# dev_32
from api.serializers.category_serializers import (
    CategorySerializer,
    CategorySimpleSerializer,
)


# dev_35
from rest_framework.views import APIView


from rest_framework.mixins import (
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)

# http://127.0.0.1:8000/api/categories/
# 방식   url         기능
# GET   categories/    list


# dev_32
@api_view(["GET"])
def categories_api(request):

    if request.method == "GET":
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


# dev_35


class CategoriesAPI(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySimpleSerializer(data=request.data)
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data)

    def put(self, request):
        pass

    def delete(self, request):
        pass


class CategoryAPI(APIView):

    def get(self, request, pk):
        category = get_object_or_404(Category, id=pk)
        serializer = CategorySimpleSerializer(category)
        return Response(serializer.data)

    def put(self, request, pk):
        category = get_object_or_404(Category, id=pk)
        serializer = CategorySimpleSerializer(category, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        category = get_object_or_404(Category, id=pk)
        category.delete()
        return Response("삭제 성공", status=status.HTTP_204_NO_CONTENT)


# dev_36
# GenericAPIView: self.get_queryset()과 self.get_serializer()를 제공
# ListModelMixin: self.list() 내부에서 위의 메서드들을 호출
# 주의
# 기본적으로는 queryset, serializer_classs는 약속된 이름
# 대신 커스텀 마이징은 가능

# class CategoriesCustomMixins(ListModelMixin, CreateModelMixin, GenericAPIView):
#     categories = Category.objects.all()
#     category_serializer = CategorySimpleSerializer

#     def get_queryset(self):
#         return self.categories  # 오타 수정: cataegories → categories

#     def get_serializer_class(self):
#         return self.category_serializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)


class CategoriesMixins(ListModelMixin, CreateModelMixin, GenericAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


# http://127.0.0.1:8000/api/category/{name}/
# http://127.0.0.1:8000/api/category/sports/


class CategoryMixins(
    RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericAPIView
):
    queryset = Category.objects.all()
    serializer_class = CategorySimpleSerializer
    # lookup_field = "name"   # 디폴트가 pk

    def get(self, request, *args, **kwargs):
        print("args : ", args)
        print("kwargs : ", kwargs)  # kwargs로 넘어옴
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


# dev_37

# generics.CreateAPIView : 생성
# generics.ListAPIView : 목록
# generics.RetrieveAPIView : 조회
# generics.DestroyAPIView : 삭제
# generics.UpdateAPIView : 수정
# generics.RetrieveUpdateAPIView : 조회/수정
# generics.RetrieveDestroyAPIView : 조회/삭제
# generics.ListCreateAPIView : 목록/생성
# generics.RetrieveUpdateDestroyAPIView : 조회/수정/삭제


# ListCreateAPIView가 Mixin에서 사용했던 걸 미리 정의해둠
# ListCreateAPIView = CategoryMixins이라 class CategoriesGeneric(CategoryMixins)와 같음


# 권한
# AllowAny : 누구나 접근 가능 (기본값)
# IsAuthenticated : 로그인한 사용자만 접근 가능
# IsAdminUser : is_staff=True인 관리자만 접근 가능
# IsAuthenticatedOrReadOnly : 로그인 한 사용자만 수정 가능, 비로그인 사용자는 읽기만 가능
class CategoriesGenericView(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySimpleSerializer
    # permission_classes = [IsAuthenticated]

    # create 함수를 오버라이딩
    def create(self, request, *args, **kwargs):

        name = request.data.get("name")

        # 같은 이름의 카테고리가 이미 존재할 경우 오류 메세지
        if Category.objects.filter(name=name).exists():
            raise ValidationError({"message": "같은 이름의 카테고리가 존재합니다."})

        response = super().create(request, *args, **kwargs)

        response.data = {
            "message": "카테고리가 성공적으로 생성되었습니다.",
            "category": response.data,
        }

        return response


class CategoryGenericView(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySimpleSerializer

    # 조회 시 로그 찍기
    def retrieve(self, request, *args, **kwarg):
        instance = self.get_object()
        print(f"조회 카테고리 ID : {instance.id} - {instance.name}")
        return super().retrieve(request, *args, **kwarg)

    # 수정 시 로깅 및 응답 커스터마이징
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        print(f"수정 카테고리 이름 : {instance.name} -> {request.data.get('name')}")
        response = super().update(request, *args, **kwarg)  # update 쿼리 날아감
        response.data = {
            "message": f"수정 카테고리 이름 : {instance.name} -> {request.data.get('name')}",
            "category": response.data,
        }

        return response

    # class DestroyModelMixin:
    #     """
    #     Destroy a model instance.
    #     """
    #     def destroy(self, request,args, kwargs):
    #         instance = self.get_object()
    #         self.perform_destroy(instance)
    #         return Response(status=status.HTTP_204_NO_CONTENT)

    #     def perform_destroy(self, instance):
    #         instance.delete()

    # HTTP DELETE 요청 →
    # → destroy() 실행 →
    # → perform_destroy(instance) 호출 →
    # → 객체 삭제

    # 카테고리 자바는 삭제 되지 않도록 처리
    def perform_destroy(self, instance):

        if instance.name == "자바":
            raise ValidationError("이 카테고리는 관리자만이 삭제 가능 합니다.")

        print(f"[삭제] 카테고리 {instance.name} 삭제됨")
        instance.delete()

    # 삭제 응답 커스터마이징
    def destroy(self, request, *args, kwargs):
        self.perform_destroy(self.get_object())

        return Response(
            {"message": "카테고리가 삭제 되었습니다."},
            status=status.HTTP_204_NO_CONTENT,
        )

# dev_3_fruits
class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySimpleSerializer

    # # http://127.0.0.1:8000/api/categories/?search=%EC%9E%90%EB%B0%94
    # # 검색 필터  사용
    # filter_backends = [filters.SearchFilter]
    # search_fields = ["name"]  # ?search=검색어

    # # http://127.0.0.1:8000/api/categories/?ordering=name
    # # 정렬 필터 사용
    # filter_backends = [filters.OrderingFilter]
    # search_fields = ["name"]  # ?search=검색어

    # # http://127.0.0.1:8000/api/categories/1/products/ 라는 URL로 호출
    # # detail=True    /api/resource/<pk>/custom/    특정 객체에 대해 작동 (PK 필요)
    # # detail=False    /api/resource/custom/    전체 또는 리스트 대상 (PK 불필요)
    # # @action을 통해 url과 매핑
    # # detail이 true이면 /categories/<pk>/ false면 /categories/ + products/
    # @action(detail=True, methods=["get"])
    # def products(self, request, pk=None):
    #     category = self.get_object()
    #     products = category.products.all()
    #     data = [{"name": p.name, "price": p.price} for p in products]
    #     return Response({"category": category.name, "products": data})

    # # GET   /api/categories/?search=검색어      쿼리 스트링 방식
    # # GET   /api/categories/{search}            restful 방식
    # # 검색 기능 추가 (쿼리 파라미터 : ?search=검색어)
    # def get_gueryset(self):
    #     queryset = Category.objects.all()
    #     search = self.request.query_params.get("search")

    #     if search:
    #         queryset = queryset.filter(name__icontains=search)

    #     return queryset
