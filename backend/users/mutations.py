import graphene
from django.contrib.auth import authenticate
from django.conf import settings

import jwt

from .models import User
from rooms.models import Room

class CreateAccountMutation(graphene.Mutation):
    
    class Arguments:
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    ok = graphene.Boolean()
    error = graphene.String()

    # def mutate(self, info, *args, **kwargs):
    def mutate(self, info, email, password, first_name=None, last_name=None):
        try:
            User.object.get(email=email)
            return CreateAccountMutation(ok=False, error="User already exists")
        except:
            try:
                User.objects.create_user(email, email, password)
                return CreateAccountMutation(ok=True)
            except Exception:
                return CreateAccountMutation(ok=False, error="Cannot create user") 


class LoginMutation(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    token = graphene.String()
    pk = graphene.Int()
    error = graphene.String()

    def mutate(self, info, email, password):
        user = authenticate(username=email, password=password)

        if user:
            token = jwt.encode({'pk': user.pk}, settings.SECRET_KEY, algorithm='HS256')
            return LoginMutation(token=token, pk=user.pk)

        else:
            return LoginMutation(error="Wrong username or passoword")


class ToggleFavsMutation(graphene.Mutation):
    class Arguments:
        room_id = graphene.Int(required=True)

    ok = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, room_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("You need to be logged in")
        
        try:
            room = Room.objects.get(id=room_id)

            if room in user.favs.all():
                user.favs.remove(room)
            else:
                user.favs.add(room)
            return ToggleFavsMutation(ok=True)

        except Room.DoesNotExist:
            return ToggleFavsMutation(error="Room Does not exist")

