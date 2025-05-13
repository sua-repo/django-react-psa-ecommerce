import json
from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

# from .forms import RegisterUserForm   # 상대 경로
from accounts.forms import RegisterUserForm
from accounts.models import User
from cart.cart import Cart
from store.models import Product  # 절대 경로


# Create your views here.

# class HTTPRequest :
#   POST = {"username" : "admin", "password" : "1234"}


# dev_9
def login_user(request):

    if request.method == "POST":
        # username = request.POST.get("username", "") 가 더 안전 / username이 없으면 빈 칸으로 대체
        username = request.POST["username"]  # username이 없으면 죽음
        password = request.POST["password"]

        # DB에 있는지를 조회하고 대조
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)  # session key 생성 및 세션 키 DB 저장

            # dev_23
            current_user = User.objects.get(id=request.user.id)
            saved_cart = current_user.old_cart  # DB에 저장된 장바구니 정보 가져오기

            # add

            cart = Cart(request)

            if len(cart) > 0:
                cart.convert_to_db()

            if saved_cart:
                converted_cart = json.loads(saved_cart)
                # add
                cart = Cart(request)

                # {"1": {"quantity" : 5, "price" : "10000"}}
                # loop
                for product_id, data in converted_cart.items():
                    quantity = data["quantity"]
                    print("상품 ID :", product_id)  # 1
                    print("수량 :", quantity)  # 5
                    product = Product.objects.get(id=product_id)
                    cart.add(product, quantity)

            messages.success(request, "로그인이 되었습니다.")
            return redirect("/")

        else:
            messages.success(
                request, "로그인이 실해했습니다. 다시 한 번 더 시도해주시기 바랍니다."
            )
            # return redirect("accounts:login_user")
            return redirect("accounts/login/")
    else:
        return render(request, "accounts/login.html", {})


# dev_9
def logout_user(request):
    logout(request)  # session에 저장된 sessionid 삭제
    return redirect("/")


# dev_10    # 회원가입
def register_user(request):

    form = RegisterUserForm()

    if request.method == "POST":
        if request.POST["password1"] == request.POST["password2"]:
            form = RegisterUserForm(request.POST)  # 모델에 값을 넣음

            if form.is_valid():
                form.save()  # 회원 DB 저장

                # 회원가입 하자마자 로그인 시켜줌
                username = form.cleaned_data.get("username")
                raw_password = form.cleaned_data.get("password1")

                user = authenticate(username=username, password=raw_password)
                login(request, user)
                return redirect("/")

    else:
        form = RegisterUserForm()

    return render(request, "accounts/register.html", {"form": form})


# dev_27
def kakao_login_user(request) : 
    return render(request, "accounts/kakao_login.html")
