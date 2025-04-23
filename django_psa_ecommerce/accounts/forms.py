from django.contrib.auth.forms import UserCreationForm
from django import forms
from accounts.models import User


class RegisterUserForm(UserCreationForm):
    password1 = forms.CharField(
        label="비밀번호",
        widget=forms.PasswordInput(
            attrs={"class": "form-control", "placeholder": "비밀번호"}
        ),
    )
    password2 = forms.CharField(
        label="비밀번호 확인",
        widget=forms.PasswordInput(
            attrs={"class": "form-control", "placeholder": "비밀번호 확인"}
        ),
    )

    class Meta:
        model = User
        fields = ["username", "password1", "password2", "email", "job", "gender"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # 모든 필드에 Bootstrap form-control 클래스 추가
        for field_name, field in self.fields.items():
            if field_name not in [
                "password1",
                "password2",
            ]:  # 비밀번호 필드는 이미 설정됨
                field.widget.attrs.update(
                    {"class": "form-control", "placeholder": field.label}
                )

        # 성별 선택을 위한 Bootstrap form-select 클래스 추가
        self.fields["gender"].widget.attrs.update({"class": "form-select"})
        # 직업 선택을 위한 Bootstrap form-select 클래스 추가
        self.fields["job"].widget.attrs.update({"class": "form-select"})
