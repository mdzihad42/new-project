from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('project/<int:pk>/', views.project_detail, name='project_detail'),
    path('blog/<int:pk>/', views.blog_detail, name='blog_detail'),
]
