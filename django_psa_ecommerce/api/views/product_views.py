from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers.product_serializers import ProductSerializer
from store.models import Product, Category
from django.shortcuts import get_object_or_404
from rest_framework import status

from django.db.models import Max

# http://127.0.0.1:8000/api/products/
# 방식   url         기능
# GET   products/    list
# POST  products/   create


# dev_29
@api_view(["GET", "POST"])
def products_api(request):

    if request.method == "GET":
        products = Product.objects.all()
        # many=True ➜ 여러 개의 인스턴스 (QuerySet, 리스트 등)
        # many=False (기본값) ➜ 단일 인스턴스
        serializer = ProductSerializer(products, many=True)
        # print(serializer.data)
        return Response(serializer.data)

    # dev_30
    # 디시리얼라이져
    # if request.method == "POST":
    #     print("데이터", request.data)  # json , dic
    #     print("타입", type(request.data))  # json , dic

    #     serializer = ProductSerializer(data=request.data)

    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()

    #     return Response(serializer.data)

    # dev_33 view 에서 직접 처리
    if request.method == "POST":

        # request.data 는 기본적으로 불변임
        data = request.data.copy()

        # category 정보 추출 후 제거
        category_data = data.pop("category")
        category_data = request.data["category"]

        # get_or_create 는 dict 형식으로 받기 때문에 category_data는 리스트일 수 있어서 주의
        if isinstance(category_data, list):
            category_data = category_data[0]

        # 카테고리 저장 조회
        category, _ = Category.objects.get_or_create(**category_data)

        serializer = ProductSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(category=category)

        return Response(serializer.data)




# dev_30
@api_view(["GET", "DELETE", "PUT"])
def product_api(request, pk):
    product = get_object_or_404(Product, id=pk)

    if request.method == "GET":
        # many=True ➜ 여러 개의 인스턴스 (QuerySet, 리스트 등)
        # many=False (기본값) ➜ 단일 인스턴스
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = ProductSerializer(product, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    elif request.method == "DELETE":
        product.delete()
        return Response("SUCCESS", status=status.HTTP_204_NO_CONTENT)
    

# dev_10_fruits
# 페이지네이션 클래스 (옵션)

# /api/product-list/ 뒤에는 url이 아니라 query string임 (url 설계 중 하나)
# 1. 정렬이나 검색은 get 방식으로 url에 ? 달고 보냄
# 2. 장고에서 검색은 search 정렬은 ordering을 많이 씀

# GET   /api/product-list/
# 검색 조건이 URL에 있으므로 즐겨찾기 / 공유 가능
# 조회는 GET으로 한다
# 브라우저 및 서버에서 캐싱 가능

# 요청 예시
# /api/product-list/?page=2             페이지 2
# /api/product-list/?search=포도        '포도' 포함 검색
# /api/product-list/?category=4         카테고리 ID가 4번인 상품 필터링
# /api/product-list/?ordering=price     가격 오름차순 정렬
# /api/product-list/?ordering=-id       최신순 정렬

from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

# http://127.0.0.1:8000/api/product-list/?page_size=5
# http://127.0.0.1:8000/api/product-list/?page=2&page_size=25
class ProductPagination(PageNumberPagination) :
    page_size = 10  # 기본 페이지 크기
    page_size_query_param = "page_size" # 클라이언트가 지정할 수 있는 파라미터
    max_page_size = 100 # 최대 페이지 크기


# Django에서 Query String 필터 만들기
import django_filters

# GET /api/products-list/?min_price=1000&max_price=3000
class ProductFilter(django_filters.FilterSet) : 
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta : 
        model = Product 
        fields = ['category', 'min_price', 'max_price']

from rest_framework.decorators import action

# ModelViewSet
class ProductViewSet(viewsets.ModelViewSet) : 
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # 페이징 2가지 방법
    # 1. settings.py에서 REST_FRAMEWORK에 DEFAULT_PAGINATION_CLASS 설정
    # REST_FRAMEWORK = {
    #     'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    #     'PAGE_SIZE': 10,
    # }

    # 2. ViewSet에서 pagination_class 설정
    pagination_class = ProductPagination

    filterset_class = ProductFilter
    # 필터링 항목 (URL에서 ?category=값 으로 필터링 가능)
    filterset_fields = ['category']

    # 정렬 / 검색
    # 요청을 가로채서 필터셋(filterset_class)을 확인
    # 정의된 필드와 비교해 유효한 필터만 추출
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]

    # 정렬 필드 (?ordering=price)
    # http://127.0.0.1:8000/api/product-list/?ordering=-price
    ordering_fields = ['id', 'price', 'name']
    ordering = ['id']

    # 검색 필드
    # http://127.0.0.1:8000/api/product-list/?search=컴퓨터 
    # Product.objects.filter(name__icontains='컴퓨터')
    search_fields = ['name', 'description']     # 필요에 따라 수정


    # @action 이라는 데코레이터를 사용해서 해당 ViewSet에서 URL 추가
    # detail = True : /api/resource/<pk>/custom     특정 객체에 대해 작동 (pk 필요)
    # detail = False : /api/resource/custom         전체 또는 리스트 대상으로 작동 (pk 필요 없음)
    @action(detail=False, methods=['get'], url_path='max-price')
    def max_price(self, request) : 
        # aggregate() : 집계 합수
        # SELECT max(price) as price__max FROM product

        # Product.objects.aggregate(Max('price')) 는 딕셔너리
        # {'price__max' : 10000} / 'price__max' 값이 없으면 (null) 0을 넣어라
        max_price = Product.objects.aggregate(Max('price'))['price__max'] or 0
        return Response({'max_price' : max_price})
        