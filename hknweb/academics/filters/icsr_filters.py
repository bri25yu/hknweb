from django_filters.rest_framework import FilterSet
from django_filters import CharFilter, NumberFilter


class ICSRFilter(FilterSet):
    icsr_course__id = CharFilter(lookup_expr="icontains")
    icsr_department__id = CharFilter(lookup_expr="icontains")
    icsr_instructor__instructor_id = CharFilter(lookup_expr="icontains")
    icsr_semester__year = NumberFilter(lookup_expr="icontains")
    icsr_semester__year_section = CharFilter(lookup_expr="icontains")
