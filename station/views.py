from django.shortcuts import render
from rest_framework import response, schemas, serializers, viewsets
from rest_framework.decorators import api_view, renderer_classes
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer

from .models import *


# Serves and renders the AngularJS main page
def serve_main_page(request):
    return render(request, "main.html")


@api_view()
@renderer_classes([OpenAPIRenderer, SwaggerUIRenderer])
def schema_view(request):
    generator = schemas.SchemaGenerator(title='Billstation API')
    return response.Response(generator.get_schema(request=request))


@api_view()
@renderer_classes([OpenAPIRenderer])
def schema_view_raw(request):
    generator = schemas.SchemaGenerator(title='Billstation API RAW')
    return response.Response(generator.get_schema(request=request))


# Serializers define the API representation.
class DudeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dude
        fields = ('url', 'name', 'still_here', 'created')


class BillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bill
        fields = ('url', 'description', 'date', 'amount', 'owner', 'affected_dudes', 'created')


class PaymentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Payment
        fields = ('url', 'bill', 'by', 'at', 'amount', 'created')


# ViewSets define the view behavior.
class DudeViewSet(viewsets.ModelViewSet):
    queryset = Dude.objects.filter(still_here=True)
    serializer_class = DudeSerializer


class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
