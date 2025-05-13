from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.account.utils import user_email, perform_login
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth import get_user_model

#{"id": 2111783846, "connected_at": "2022-02-08T09:17:28Z", 
# "properties": {"nickname": "Tom", 
# "profile_image": "http://k.kakaocdn.net/dn/wN4qJ/btsBiRUEgPl/zyHgk69z4W53BPhOgyNV41/img_640x640.jpg", 
# "thumbnail_image": "http://k.kakaocdn.net/dn/wN4qJ/btsBiRUEgPl/zyHgk69z4W53BPhOgyNV41/img_110x110.jpg"}, 
# "kakao_account": {"profile_nickname_needs_agreement": false, "profile_image_needs_agreement": false, 
# "profile": {"nickname": "Tom", "thumbnail_image_url": 
# "http://k.kakaocdn.net/dn/wN4qJ/btsBiRUEgPl/zyHgk69z4W53BPhOgyNV41/img_110x110.jpg", 
# "profile_image_url": "http://k.kakaocdn.net/dn/wN4qJ/btsBiRUEgPl/zyHgk69z4W53BPhOgyNV41/img_640x640.jpg", "is_default_image": false, "is_default_nickname": false}, "has_email": true, "email_needs_agreement": false, "is_email_valid": true, "is_email_verified": true, "email": "nqwrt@ymail.com", "has_gender": true, "gender_needs_agreement": false, "gender": "male"}}

#소셜 로그인 시점에 Allauth 내부에서 자동으로 호출
#사용자 생성, 로그인 전 처리 등을 커스터마이징할 수 있는 핵심 지점
# 전체 흐름 순서 요약
#=========================================
# 1. Provider callback → views.py
# 2. complete_social_login(request, sociallogin)
#=========================================
#=========================================
# 3. get_adapter(request) → DefaultSocialAccountAdapter
# 4. adapter.pre_social_login()
# 5. adapter.populate_user()
# 6. adapter.save_user()
#=========================================

# 7. login(request, user)


User = get_user_model()


class KakaoSocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        email = user_email(sociallogin.user)
        if not email:
            return

        try:
            existing_user = User.objects.get(email=email)

            # 로그인 처리
            perform_login(request, existing_user, email_verification="optional")

            # 소셜 계정 연결 (필요한 경우)
            if not SocialAccount.objects.filter(user=existing_user, provider=sociallogin.account.provider).exists():
                sociallogin.connect(request, existing_user)

        except User.DoesNotExist:
            pass  # 신규 가입 계속 진행

    def populate_user(self, request, sociallogin, data):
        user = super().populate_user(request, sociallogin, data)

        kakao_data = sociallogin.account.extra_data
        kakao_account = kakao_data.get("kakao_account", {})
        profile = kakao_account.get("profile", {})

        user.email = kakao_account.get("email", "")
        user.profile_image = profile.get("profile_image_url", "")

        gender = kakao_account.get("gender")
        if gender == "male":
            user.gender = "M"
        elif gender == "female":
            user.gender = "F"
        else:
            user.gender = "O"

        if not user.job:
            user.job = "E"

        return user