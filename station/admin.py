from django.contrib import admin
from .models import *


class PaymentInline(admin.TabularInline):
    model = Payment


class BillAdmin(admin.ModelAdmin):
    date_hierarchy = 'date'
    list_display = ('description', 'owner', 'created', 'is_paid', 'amount', 'total_remaining')
    inlines = [
        PaymentInline,
    ]


admin.site.register(Dude)
admin.site.register(Bill, BillAdmin)
admin.site.register(Payment)
