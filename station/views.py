import django_filters
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import response, schemas, serializers, viewsets
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer

from .models import *


# Serves and renders the AngularJS main page
@login_required
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
        fields = ('id', 'url', 'name', 'still_here', 'created')


class BillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bill
        fields = ('id', 'url', 'description', 'date', 'amount', 'owner', 'affected_dudes', 'created')


class PaymentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'url', 'bill', 'by', 'at', 'amount', 'created', 'for_own_bill')


# ViewSets define the view behavior.
class DudeViewSet(viewsets.ModelViewSet):
    queryset = Dude.objects.filter(still_here=True)
    serializer_class = DudeSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)


class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)


@api_view()
@renderer_classes((JSONRenderer,))
def debt_by_relation(request, owner_id, debtor_id):
    owner = Dude.objects.get(id=owner_id)
    debtor = Dude.objects.get(id=debtor_id)

    amount = 0

    for bill in Bill.objects.filter(owner_id=owner_id):
        amount += bill.remaining(debtor)

    return response.Response({
        "owner": DudeSerializer(owner, context={'request': request}).data,
        "debtor": DudeSerializer(debtor, context={'request': request}).data,
        "amount": amount,
        "relation": "{0} -> {1}".format(debtor, owner)
    })


@api_view(['POST'])
@renderer_classes((JSONRenderer,))
def pay_by_amount(request, sender_id, receiver_id):
    sender = Dude.objects.get(id=sender_id)
    receiver = Dude.objects.get(id=receiver_id)
    amount = Decimal(request.data)

    if sender == receiver:
        raise Exception("Sender and receiver can't be the same")

    relevant_bills = Bill.objects.filter(owner=receiver, affected_dudes=receiver)
    payments = []

    amount_divided = 0

    for bill in relevant_bills:
        if bill.is_paid() or amount_divided == amount:
            continue

        amount_left = bill.remaining(sender)

        if amount_left < (amount - amount_divided):
            payment_amount = amount_left
        else:
            payment_amount = (amount - amount_divided)

        amount_divided += payment_amount
        payment = Payment.objects.create(bill=bill, by=sender, amount=payment_amount)
        payments.append(payment)

    if amount_divided < amount:
        raise Exception("Not enought bills found to divide. Amount divided: {0}".format(amount_divided))

    return response.Response({
        "sender": DudeSerializer(sender, context={'request': request}).data,
        "receiver": DudeSerializer(receiver, context={'request': request}).data,
        "paid": amount,
        "paidBills": PaymentSerializer(payments, many=True, context={'request': request}).data
    })
