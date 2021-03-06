from decimal import *

from django.db import models
from django.db.models import Sum
from django.db.models.signals import m2m_changed

# Default precision of two decimal places
getcontext().rounding = ROUND_HALF_UP
TWOPLACES = Decimal(10) ** -2


class Dude(models.Model):
    """
    A person eligible for having bills or payments
    """
    name = models.CharField(max_length=30)
    still_here = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Bill(models.Model):
    """
    A bill at a specific point in time paid by the owner
    """
    description = models.CharField(max_length=30)
    date = models.DateField(auto_now_add=True)
    amount = models.DecimalField(decimal_places=2, max_digits=12)
    owner = models.ForeignKey('Dude', related_name='my_bills')
    affected_dudes = models.ManyToManyField('Dude', related_name='bills_to_pay')
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def total_remaining(self):
        payments = self.payment_set.all().aggregate(Sum('amount'))
        already_paid = payments['amount__sum'] if payments['amount__sum'] else 0

        result = (Decimal(self.amount) - already_paid).quantize(TWOPLACES)
        if result < Decimal(0):
            return Decimal(0)
        else:
            return result

    def share(self, dude):
        if dude not in self.affected_dudes.all():
            return Decimal(0)

        rounding_before = getcontext().rounding

        # TODO is this really needed?
        if dude == self.owner:
            getcontext().rounding = ROUND_HALF_UP
        else:
            getcontext().rounding = ROUND_HALF_DOWN
        result = (Decimal(self.amount) / self.affected_dudes.count()).quantize(TWOPLACES)
        getcontext().rounding = rounding_before

        return result

    def remaining(self, dude):
        if dude not in self.affected_dudes.all():
            return Decimal(0)

        payments = self.payment_set.filter(by=dude).aggregate(Sum('amount'))
        already_paid = payments['amount__sum'] if payments['amount__sum'] else 0

        result = (self.share(dude) - already_paid).quantize(TWOPLACES)
        if result < Decimal(0):
            return Decimal(0)
        else:
            return result

    def is_paid(self):
        return self.total_remaining() <= Decimal(0)

    def __str__(self):
        return '{0} - {1}'.format(self.amount, self.description[:10])


class Payment(models.Model):
    """
    A payment made to a bill by another dude to reduce his share
    """
    bill = models.ForeignKey('Bill')
    by = models.ForeignKey('Dude')
    at = models.DateField(auto_now_add=True)
    amount = models.DecimalField(decimal_places=2, max_digits=12)
    created = models.DateTimeField(auto_now_add=True)
    for_own_bill = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return '{0} by {1}'.format(self.amount, self.by)


def bill_relations_changed(sender, instance, action, **kwargs):
    if action != 'post_add':
        return

    amount_left = instance.share(instance.owner)

    if instance.owner in instance.affected_dudes.all() and amount_left > 0:
        Payment.objects.create(bill=instance, by=instance.owner, amount=amount_left, for_own_bill=True)


m2m_changed.connect(bill_relations_changed, sender=Bill.affected_dudes.through)
