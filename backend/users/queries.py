from .models import User

def resolve_user(self, info, id):
    return User.objects.get(id=id)
