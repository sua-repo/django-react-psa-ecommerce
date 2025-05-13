from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


# dev_9
# User 계정을 커스터마이징 시키는 방법은 4가지
# 1) proxy 활용
# 2) AbstractUser 상속하는 방법
# 3) AbstractBaseUser 상속하는 방법
# 4)  <- 비추


class User(AbstractUser):
    class GenderChoices(models.TextChoices):
        MALE = "M", "남성"
        FEMALE = "F", "여성"

    gender = models.CharField(
        verbose_name="성별", max_length=1, choices=GenderChoices.choices
    )  # TextChoices

    JOBS = (
        ("P", "교수/강사(Professor/Lecturer)"),
        ("S", "학생(Student)"),
        ("R", "연구원(Researcher)"),
        ("E", "기타(Etc.)"),
    )

    job = models.CharField(
        verbose_name="직업", max_length=1, choices=JOBS
    )  # 튜플로 입력

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # dev_23
    old_cart = models.CharField(max_length=2, blank=True, null=True)

    # dev_9_1_fruits
    profile_image = models.URLField(blank=True, null=True)