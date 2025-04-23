# dev_17
from cart.cart import Cart


def cart(request):

    # 세션 확인 테스트
    # cart.decrypt_all_sessions()

    print("카트 함수 호출")

    return {"cart": Cart(request)}
