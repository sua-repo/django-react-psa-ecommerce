from django.contrib import admin

from accounts.models import User

# Register your models here.

# dev_9
# 기본적인 관리자 페이지에서 기본적인 등록
# admin.site.register(User)

# dev_12
# admin 페이지 등록 방법 3가지


# 1. 기본적인 관리자 페이지에서 기본적인 등록
# 커스텀 기능 (검색, 필터, 필드 설정 등)을 추가할 수 없음
# admin.site.register(User)


# 2. ModelAdmin 클래스를 활용하는 방법 (커스텀 가능)
@admin.register(User)
class UserAccountsAdmin(admin.ModelAdmin):
    list_display = ["username", "email", "job", "gender"]

    search_fields = ["username", "email", "job", "gender"]

    list_filter = ["username", "email", "job", "gender"]


# admin.site.register(User, UserAccountsAdmin)


# 3. @admin.register 데코레이터 사용
