from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from .models import User


# dev_5_fruits
# djoser 회원가입 커스터마이징
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