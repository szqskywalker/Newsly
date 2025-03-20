from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from users.models import User
import json
# Create your views here.


@csrf_exempt
def save_user(request):
    import pdb; pdb.set_trace()
    data = {
        'message': 'Success',
        'status': 200,
        'data': {}
    }
    return JsonResponse(data)

@csrf_exempt
def get_user(request):
    data = json.loads(request.body)
    user_name = data.get('username')
    user_pwd = data.get('password')
    # TODO very the user password

    if User.objects.filter(user_name=user_name):
        print('User is found!')
        data = {
            'message': 'Success',
            'status': 200,
            'data': {
            }
        }
    else:
        print('No user exists!')
        data = {
            'message': 'Fail',
            'status': 204,
            'data': {
            }
    }
    
    return JsonResponse(data)
