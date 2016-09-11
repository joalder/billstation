from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework import serializers, viewsets


def serve_main_page(request):
    return render(request, "main.html")


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer