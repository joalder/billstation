from django.db import models
from django.utils import timezone
from datetime import date


class Dude(models.Model):
    """
    Represents a person eligible for having bills or payments
    """
    name = models.CharField(max_length=30)
    still_here = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Bill(models.Model):
    """
    A bill for a specific point in time paid
    """
    description = models.CharField(max_length=30)
    date = models.DateField(default=timezone.now().date)
    amount = models.DecimalField(decimal_places=2, max_digits=12)
    owner = models.ForeignKey('Dude', related_name='my_bills')
    affected_dudes = models.ManyToManyField('Dude', related_name='bills_to_pay')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{0} - {1}'.format(self.amount, self.description[:10])


class Payment(models.Model):
    """
    A payment maid for a bill by someone
    """
    bill = models.ForeignKey('Bill')
    by = models.ForeignKey('Dude')
    at = models.DateField(default=timezone.now().date)
    amount = models.DecimalField(decimal_places=2, max_digits=12)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{0} by {1}'.format(self.amount, self.by)
