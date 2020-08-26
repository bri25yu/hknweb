from django_filters.rest_framework import DjangoFilterBackend

from .base_views import AcademicEntityViewSet

from ..models.course_surveys import Question, Rating, Survey

from ..serializers.course_surveys_serializers import QuestionSerializer, RatingSerializer, SurveySerializer

from ..filters.course_surveys_filters import RatingFilter, SurveyFilter


class QuestionViewSet(AcademicEntityViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class RatingViewSet(AcademicEntityViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_class = RatingFilter


class SurveyViewSet(AcademicEntityViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer

    filter_backends = [DjangoFilterBackend]
    filterset_class = SurveyFilter
