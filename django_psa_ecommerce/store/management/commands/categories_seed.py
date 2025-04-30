from django.core.management import BaseCommand
from store.models import Category

class Command(BaseCommand) : 
    help = "카테고리 DB 데이터 생성"

    def handle(self, *args, **options):
        categories = ["전자제품", "패션", "도서", "가구", "장난감", "스포츠", "과일"]

        for name in categories:
            obj, created = Category.objects.get_or_create(name=name)
            if created:
                self.stdout.write(self.style.SUCCESS(f"✔ Created category: {name}"))
            else:
                self.stdout.write(f"… Already exists: {name}")