from django.urls import path
from . import views


urlpatterns = [
    path('coursesurveys', views.CourseSurveysIndexView.as_view()),
]
