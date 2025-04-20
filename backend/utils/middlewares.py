import contextvars

from rest_framework_simplejwt.authentication import JWTAuthentication

current_user = contextvars.ContextVar('current_user')

def set_current_user(user):
    current_user.set(user)

def get_current_user():
    try:
        return current_user.get()
    except LookupError:
        return None

def clear_current_user():
    current_user.set(None)


class AuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        auth = request.headers.get('Authorization', None)

        if auth is not None:
            jwt_auth = JWTAuthentication()
            user,  _ = jwt_auth.authenticate(request)
            set_current_user(user)

        response = self.get_response(request)
        clear_current_user()
        return response

class AppAuthentication(JWTAuthentication):
    def authenticate(self, request):
        from apps.authentications.models import UserSession


        result = super().authenticate(request)
        if result is None:
            return None

        user, token = result
        session = UserSession.objects.filter(token=token, user__id=user.id).first()

        if session is None:
            return None

        request.token = token
        request.user = current_user

        return user, token