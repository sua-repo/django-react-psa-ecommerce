import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.


# # dev_28
# def hello_world(request):
#     response_data = {}
#     response_data["hello"] = "hello"
#     response_data["world"] = "world"

#     return HttpResponse(json.dumps(response_data))


# def hello_world_json(request):
#     response_data = {}
#     # response_data["hello"] = "hello"
#     # response_data["world"] = "world"

#     response_data["error"] = "error"
#     response_data["details"] = "헬로월드 에러입니다."

#     return JsonResponse(response_data, status=400)


# @api_view(["GET"])
# def hello_world_drf(request):
#     return Response({"message": "Hello World!"})
