import cloudscraper
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
    scraper = cloudscraper.create_scraper()  # Handles Cloudflare challenge
    url = "https://newsapi.org/v2/top-headlines/sources"
    params = {
        "apiKey": "3d83b1afc782411490c8c8ebde73f320"
    }

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                      "AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/113.0.0.0 Safari/537.36",
        "Accept": "application/json"
    }

    try:
        res = scraper.get(url, params=params, headers=headers)
        print("Status Code:", res.status_code)
        print("Response Dict:", res.__dict__)  # Debug: full response metadata
        return JsonResponse(res.json(), safe=False)
    except Exception as e:
        print("Error:", str(e))
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def search_news(request):
    headers = {
        "X-Api-Key": "3d83b1afc782411490c8c8ebde73f320",
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        )
    }
    api_key = "3d83b1afc782411490c8c8ebde73f320"
    base_url = "https://newsapi.org/v2/everything"

    query_params = request.GET.urlencode()
    url = f"{base_url}?{query_params}&apiKey={api_key}"

    response = requests.get(url, headers=headers)
    return JsonResponse(response.json())

@csrf_exempt
def health(request):
    return JsonResponse({"status": "ok"})