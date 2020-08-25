from django_filters.rest_framework import DjangoFilterBackend

from .base_views import AcademicEntityViewSet

from ..models.icsr import ICSR

from ..serializers.icsr_serializers import ICSRSerializer

from ..filters.icsr_filters import ICSRFilter


class ICSRViewSet(AcademicEntityViewSet):
    queryset = ICSR.objects.all()
    serializer_class = ICSRSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_class = ICSRFilter
