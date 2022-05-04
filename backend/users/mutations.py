import graphene
from .models import User

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


