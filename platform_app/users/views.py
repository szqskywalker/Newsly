
import os
import requests
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from users.models import User
import json
# Create your views here.


@csrf_exempt
def save_user(request):
    data = json.loads(request.body)
    user_name = data['user_name']
    if User.objects.filter(user_name=user_name):
        data = {
        'message': 'Username already taken!',
        'status': 204,
        'data': {}
        }
    else:
        obj = User.objects.create(**data)
        data = {
        'message': 'User created successfully!',
        'status': 200,
        'data': {
            'id': obj.pk,
            'user_name': obj.user_name,
            'email': obj.email
            }
        }
    return JsonResponse(data)

@csrf_exempt
def get_user(request):
    data = json.loads(request.body)
    user_name = data.get('username')
    user_pwd = data.get('password')

    if User.objects.filter(user_name=user_name):
        print('User is found!')
        if User.objects.filter(
            user_name=user_name,
            user_pwd=user_pwd
        ):
            data = {
                'message': 'Success',
                'status': 200,
                'data': {
                }
            }
        else:
            data = {
                'message': 'Incorrect password!',
                'status': 204,
                'data': {
                }
            }
    else:
        print('No user exists!')
        data = {
            'message': 'User does not exist!',
            'status': 204,
            'data': {
            }
    }
    return JsonResponse(data)

@require_GET
@csrf_exempt
def get_sources(request):
    api_key = os.getenv('NEWS_API_KEY')
    url = f'https://newsapi.org/v2/top-headlines/sources?apiKey={api_key}'
    response = requests.get(url)
    return JsonResponse(response.json())

@csrf_exempt
def search_news(request):
    api_key = "3d83b1afc782411490c8c8ebde73f320"
    base_url = "https://newsapi.org/v2/everything"

    query_params = request.GET.urlencode()
    url = f"{base_url}?{query_params}&apiKey={api_key}"

    response = requests.get(url)
    return JsonResponse(response.json())

@csrf_exempt
def health(request):
    return JsonResponse({"status": "ok"})