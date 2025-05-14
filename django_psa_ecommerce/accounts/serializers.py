from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from .models import User
from rest_framework import serializers

# dev_5_fruits
# djoser 회원가입 및 User 정보 커스터마이징
class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta) :
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "gender",
            "job",
            # "old_cart",
        )


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta) : 
        model = User
        fields = (
            "id",
            "username",
            "email",
            "gender",
            "job",
            "old_cart",
            "created_at",
            "updated_at",
        )

# dev_9_2_fruits
class UserRestAuthSerializer(serializers.ModelSerializer) :
    class Meta : 
        model = User
        fields = (
            "id",
            "username",
            "email",
            "gender",
            "job",
            "old_cart",
            "created_at",
            "updated_at",
        )

# http://127.0.0.1:8000/api/dj-rest-auth/registration/
# https://dj-rest-auth.readthedocs.io/en/latest/configuration.html#register-serializer
from dj_rest_auth.registration.serializers import RegisterSerializer

class UserRegisterRestAuthSerializer(RegisterSerializer) : 
    
    # 추가 필드 정의
    gender = serializers.ChoiceField(choices = User.GenderChoices.choices, required = True)
    job = serializers.ChoiceField(choices = User.JOBS, required = True)

    def get_cleaned_data(self) : 
        data = super().get_cleaned_data()
        data['gender'] = self.validated_data.get('gender', '')
        data['job'] = self.validated_data.get('job', '')

        return data
    
    def custom_signup(self, request, user):
        # 추가 필드 저장
        user.gender = self.validated_data.get('gender')
        user.job = self.validated_data.get('job')

        user.save()

        # return super().custom_signup(request, user)