from django.shortcuts import render
from .models import *

from rest_framework import serializers, viewsets


def serve_main_page(request):
    return render(request, "main.html")


# Serializers define the API representation.
class DudeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dude
        fields = ('url', 'name', 'still_here', 'created')

class BillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bill
        fields = ('url', 'description', 'date',  'amount', 'owner', 'affected_dudes', 'created')

class PaymentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Payment
        fields = ('url', 'bill', 'by', 'at', 'amount', 'created')


# ViewSets define the view behavior.
class DudeViewSet(viewsets.ModelViewSet):
    queryset = Dude.objects.filter()
    serializer_class = DudeSerializer

class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer