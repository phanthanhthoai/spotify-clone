import datetime
from apps.users.models import User
from apps.authentications.models import UserSession
from utils.exceptions import LogicException, NotFoundException
from rest_framework_simplejwt.tokens import AccessToken

class AuthService:
     def register(self, data):
          user = User.objects.filter(email=data['email']).first()
          if user:
               raise LogicException('Email already exists')
          
          user = User.objects.create_user(
               email=data['email'],
               username=data['email'],
               password=data['password']
          )
          
          return user
     
     def login(self, data):
          user = User.objects.filter(email=data['email']).first()
          if not user:
               raise NotFoundException('User not found')
          
          if not user.check_password(data['password']):
               raise LogicException('Password is incorrect')
          
          token = AccessToken.for_user(user)
          
          user_session = UserSession.objects.create(
               user=user,
               token=str(token),
               expired_at=datetime.datetime.now() + datetime.timedelta(days=1)
          )
          
          return str(token)