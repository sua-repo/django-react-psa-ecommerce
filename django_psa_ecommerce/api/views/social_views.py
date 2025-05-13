from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

# dev_9_1_fruits

class KakaoLoginView(SocialLoginView) :
    adapter_class = KakaoOAuth2Adapter