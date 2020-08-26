from django_filters.rest_framework import FilterSet
from django_filters import CharFilter


class SurveyFilter(FilterSet):
    survey_icsr__id = CharFilter()


class RatingFilter(FilterSet):
    rating_survey__id = CharFilter()
