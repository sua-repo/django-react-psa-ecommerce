from django.core.management.base import BaseCommand
from store.models import Product, Category
from decimal import Decimal
import random
import os
import requests
from django.core.files import File
from django.conf import settings
from decouple import config  # 추가

UNSPLASH_ACCESS_KEY = config("UNSPLASH_ACCESS_KEY")  # 여기에 발급받은 키 입력


class Command(BaseCommand):
    help = "Download product images and seed the database with products."

    category_items = {
        "전자제품": ["냉장고", "컴퓨터", "핸드폰"],
        "패션": ["남성 정장", "여성 정장", "청바지"],
        "도서": ["파이썬", "역사", "SF 소설"],
        "가구": ["원목 식탁", "컴퓨터 책상", "서랍장"],
        "장난감": ["레고 세트", "RC 자동차", "인형"],
        "스포츠": ["축구", "농구", "헬스 장갑"],
        "과일": ["바나나", "오렌지", "포도"],
    }

    def handle(self, *args, **options):
        self.seed_products()

    def download_unsplash_image(self, query, filename, save_dir):
        url = f"https://api.unsplash.com/photos/random?query={query}&client_id={UNSPLASH_ACCESS_KEY}"

        try:
            response = requests.get(url)
            data = response.json()

            image_url = data["urls"]["regular"]
            image_response = requests.get(image_url, stream=True)
            if image_response.status_code == 200:
                os.makedirs(save_dir, exist_ok=True)
                image_path = os.path.join(save_dir, filename)
                with open(image_path, "wb") as f:
                    for chunk in image_response.iter_content(1024):
                        f.write(chunk)
                self.stdout.write(self.style.SUCCESS(f"✔ 이미지 저장 완료: {filename}"))
                return image_path
            else:
                self.stdout.write(
                    self.style.ERROR(f"⚠ 이미지 다운로드 실패: {filename}")
                )
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ 에러 발생: {e}"))
        return None

    def seed_products(self):
        image_dir = os.path.join(settings.MEDIA_ROOT, "upload", "product")

        for category_name, product_names in self.category_items.items():
            category, _ = Category.objects.get_or_create(name=category_name)

            for product_name in product_names:
                price = Decimal(random.randint(5000, 20000)) / 100
                is_sale = random.choice([True, False])
                sale_price = int(price * Decimal("0.8")) if is_sale else None

                product = Product.objects.create(
                    name=product_name,
                    price=price,
                    description=f"{product_name}는(은) {category_name} 카테고리에 속하는 상품입니다.",
                    category=category,
                    is_sale=is_sale,
                    sale_price=sale_price,
                )

                image_filename = f"{product_name}.jpg"
                image_path = os.path.join(image_dir, image_filename)

                if not os.path.exists(image_path):
                    image_path = self.download_unsplash_image(
                        product_name, image_filename, image_dir
                    )
                
                #이미지 넣는 부분 => 이부분 참고 할것
                if image_path and os.path.exists(image_path):
                    with open(image_path, "rb") as f:
                        product.image.save(image_filename, File(f), save=True)
                    self.stdout.write(
                        self.style.SUCCESS(f"📦 상품 생성: {product_name} + 이미지")
                    )
                else:
                    self.stdout.write(
                        self.style.WARNING(f"⚠ 이미지 없음: {product_name}")
                    )