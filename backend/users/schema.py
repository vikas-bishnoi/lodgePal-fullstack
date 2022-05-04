import graphene

from .types import UserType
from .mutations import CreateAccountMutation, LoginMutation, ToggleFavsMutation
from .queries import resolve_user, resolve_me


class Query:
    user = graphene.Field(UserType, id=graphene.Int(), resolver=resolve_user)

    me = graphene.Field(UserType, resolver=resolve_me)

class Mutation:
    create_account = CreateAccountMutation.Field()
    login = LoginMutation.Field()
    toggle_favs = ToggleFavsMutation.Field()