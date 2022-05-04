import graphene
from graphene_django import DjangoObjectType

from rooms.models import Room

class RoomType(DjangoObjectType):
    class Meta:
        model = Room


class Query(graphene.ObjectType):
    hello = graphene.String()
    rooms = graphene.List(RoomType)

    def resolve_hello(self, info):
        return "hello"

    def resolve_rooms(self, info):
        return Room.objects.all()

class Mutation(graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
