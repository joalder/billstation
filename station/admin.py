from django.contrib import admin
from .models import *


class PaymentInline(admin.TabularInline):
    model = Payment


class BillAdmin(admin.ModelAdmin):
    date_hierarchy = 'date'
    list_display = ('description', 'owner', 'amount', 'created', 'is_paid')
    inlines = [
        PaymentInline,
    ]


admin.site.register(Dude)
admin.site.register(Bill, BillAdmin)
admin.site.register(Payment)
