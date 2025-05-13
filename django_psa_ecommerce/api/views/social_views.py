from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

# 소셜 로그인 시점에 Allauth 내부에서 자동으로 호출
# 사용자 생성, 로그인 전 처리 등을 커스터마이징할 수 있는 핵심 지점
# 전체 흐름 순서 요약
# 1. Provider callback → views.py
# 2. complete_social_login(request, sociallogin)
# 3. get_adapter(request) → DefaultSocialAccountAdapter
# 4. adapter.pre_social_login()
# 5. adapter.populate_user()
# 6. adapter.save_user()
# 7. login(request, user)

# dev_9_1_fruits
class KakaoLoginView(SocialLoginView):
    adapter_class = KakaoOAuth2Adapter

    def post(self, request, *args, **kwargs):
        print("🔥 request.data:", request.data)

        try:
            response = super().post(request, *args, **kwargs)

            # 정상 응답이면서도 오류 코드인 경우 (잘 발생하지 않지만 대비)
            if response.status_code == 400:
                print("🔥 소셜 로그인 실패 시 응답 내용:")
                print(response.data)

            return response

        except Exception as e:
            print("❌ 예외 발생:", str(e))
            import traceback
            traceback.print_exc()  # 전체 에러 스택 출력

            # 오류 내용도 같이 반환해보자 (디버깅용)
            from rest_framework.response import Response
            return Response({"error": str(e)}, status=400)
