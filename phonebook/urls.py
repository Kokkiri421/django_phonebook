from django.urls import path
from . import views

urlpatterns = [
    path('company/', views.CompanyList.as_view(), name='company_list'),
    path('company/<int:pk>/', views.CompanyDetail.as_view(), name='company_detail'),
    path('person/', views.PersonList.as_view(), name='person_list'),
    path('person/<int:pk>/', views.PersonDetail.as_view(), name='person_detail'),
    path('contact/', views.ContactList.as_view(), name='contact_list'),
    path('contact/<int:pk>/', views.ContactDetail.as_view(), name='contact_detail'),
]