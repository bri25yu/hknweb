from django.http import HttpResponseRedirect
from django.views import generic
from django.shortcuts import render, redirect
from django.db.models import Q
from django.contrib import messages
from django.urls import reverse

from .models import Alumnus
from .forms import AlumniForm
import operator
from functools import reduce


class IndexView(generic.TemplateView):
    template_name = 'alumni/index.html'


class SearchView(generic.ListView):
    """
    Display an alumni list page filtered by the search query.
    """
    template_name = 'alumni/search.html'
    context_object_name = 'matching_alumni_list'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(SearchView, self).get_context_data(**kwargs)
        context['search_field'] = SearchView.search_field
        context['status'] = SearchView.status
        return context

    def get_queryset(self):
        result = Alumnus.objects

        query = self.request.GET.get('q')
        if not query:
            return []
        if query[0] == '\\':
            return ['\\']

        query_list = query.split()
        SearchView.status = None

        if SearchView.search_field == 'name':
            if 'sahai' in [item.lower() for item in query_list]:
                SearchView.status = 'sahai';
            return result.filter(
                reduce(operator.and_,  # first name narrows it down
                       (Q(first_name__icontains=q) for q in query_list)) |
                reduce(operator.or_,  # the last name is more important
                       (Q(last_name__icontains=q) for q in query_list))
            )
        if SearchView.search_field == 'city':
            return result.filter(
                reduce(operator.and_, (Q(city__icontains=q) for q in query_list))
            )
        if SearchView.search_field == 'email':
            return result.filter(
                reduce(operator.and_, (Q(perm_email__icontains=q) for q in query_list))
            )
        if SearchView.search_field == 'grad_semester':
            return result.filter(
                reduce(operator.and_,  # both fields need to match
                       (Q(grad_season__icontains=q) for q in query_list)) |
                reduce(operator.or_,
                       (Q(grad_year__icontains=q) for q in query_list))
            )
        if SearchView.search_field == 'grad_school':
            if 'stanford' in [item.lower() for item in query_list]:
                SearchView.status = 'stanford';
                return []
            query_list = ['stanford' if item == 'worse-than-cal' else item for item in query_list]
            return result.filter(
                reduce(operator.and_, (Q(grad_school__icontains=q) for q in query_list))
            )
        if SearchView.search_field == 'company':
            return result.filter(
                reduce(operator.and_, (Q(company__icontains=q) for q in query_list))
            )

        return []


SearchView.search_field = None
SearchView.status = None


def search_type(request):
    SearchView.search_field = request.POST.get('search_by', None)
    return HttpResponseRedirect(reverse('alumni:search'))


def form(request):
    form = AlumniForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            messages.success(request, 'Thanks for submitting')
            return redirect('/alumni/form')
        else:
            return render(request, 'alumni/form.html', {'form': AlumniForm(None)})

    return render(request, 'alumni/form.html', {'form': AlumniForm(None)})


def form_success(request):
    form = AlumniForm(request.POST or None)
    if request.method == 'POST':
            if form.is_valid():
                form.save()
                return redirect('alumni/form_success')
            else:
                return render(request, 'alumni/form.html', {'form':form})
    return render(request, 'alumni/form_success.html', {'form':form})

