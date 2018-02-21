from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from station.views import DudeViewSet, BillViewSet, PaymentViewSet, serve_main_page, schema_view, schema_view_raw, \
    debt_by_relation, pay_by_amount

router = routers.DefaultRouter()
router.register(r'dudes', DudeViewSet)
router.register(r'bills', BillViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'api/debt/(?P<owner_id>[0-9]+)/(?P<debtor_id>[0-9]+)/$', debt_by_relation),
    url(r'api/payments/(?P<sender_id>[0-9]+)/(?P<receiver_id>[0-9]+)/$', pay_by_amount),
    url(r'api/', include(router.urls)),
    url(r'swagger-schema/', schema_view),
    url(r'swagger-schema-raw/', schema_view_raw),
    url(r'^$', serve_main_page, name='main'),
]
