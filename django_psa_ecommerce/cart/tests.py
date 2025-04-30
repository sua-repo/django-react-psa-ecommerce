# from django.test import TestCase

# # Generator란?
# # generator : iterator를 생성해주는 함수, 함수안에 yield 키워드를 사용함
# # genrator 특징
# # iterable한 순서가 지정됨(모든 generator는 iterator)
# # 느슨하게 평가된다.(순서의 다음 값은 필요에 따라 계산됨)
# # 함수의 내부 로컬 변수를 통해 내부상태가 유지된다.
# # 무한한 순서가 있는 객체를 모델링할 수 있다.(명확한 끝이 없는 데이터 스트림)
# # 자연스러운 스트림 처리를 위 파이프라인으로 구성할수 있다.(Java에서 파일스트림 처리시에 특정 바이트단위로 반복하는 것을 말하는듯..)

# # Create your tests here.


# class GeneratorTest(TestCase):
#     def test_generator(self):
#         yield 1
#         yield 2
#         yield 3

#     # def test_generator_result(self):
#     #    gen = self.test_generator()

#     #    print(type(gen))
#     #    print(next(gen))
#     #    print(next(gen))
#     #    print(next(gen))
#     #    print(next(gen))  # StopIteration 에러 발생

#     def test_generator_for(self):
#         for i in self.test_generator():
#             print("for문 :", i)

#     def number_generator(self, n):
#         for i in range(n):
#             yield i * i

#     def test__number_generator_output(self):
#         gen = self.number_generator(5)
#         output = list(gen)
#         expected = [0, 1, 4, 9, 16]
#         self.assertEqual(output, expected)
