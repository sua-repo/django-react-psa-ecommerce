
from django.test import TestCase
from django.contrib.auth.hashers import make_password, check_password
from django.core.signing import Signer, BadSignature

class HashEncryptionTestCase(TestCase) : 

    def test_one_way_hash(self) : 
        # 단방향 해시 테스트
        original_password = "1234"

        # 비밀번호 해시
        hashed_password = make_password(original_password)
        print("암호화 확인 :", hashed_password)

        # 해시된 값은 원본과 다름
        self.assertNotEqual(original_password, hashed_password) # 두 개가 달라야 함

        # check_password로만 원본과 같은 지 검증 가능
        isTrue = check_password(original_password, hashed_password)
        print(isTrue)

    # 서명(signing) 테스트 코드

    # 서명된 값: my-secret-data:bDMOijmfGwA6uqlTYNhj-A5d61Lo933w02gZ3Wc3cZI
    # 복원된 값 my-secret-data
    # 원본 데이터 --[HMAC-SHA256+base64]--> 서명(signature)
    # => 저장: "원본:서명"

    # 검증할 때는:
    # "원본"을 다시 서명 --> 비교 --> 다르면 BadSignature 예외
    
    def test_signing(self) : 
        signer = Signer()

        # 데이터에 서명 
        # sign()
        # value에 대해 HMAC-SHA256 해시 생성
        # 해시를 base64 인코딩
        # 원본 + 해시를 합쳐서 리턴
        original_value = "my-secret-data"

        signed_value = signer.sign(original_value)
        print("서명된 값 :", signed_value)

        # 서명된 값을 검증 및 복원
        unsigned_value = signer.unsign(signed_value)
        print("복원된 값 :", unsigned_value)