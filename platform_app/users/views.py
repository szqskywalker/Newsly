from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from users.models import User
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