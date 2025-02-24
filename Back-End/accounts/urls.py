from django.urls import path
from .views import (
    LoginView, RegisterUserView, StudentListCreateView, StudentRetrieveUpdateDeleteView, TeacherListCreateView
)

urlpatterns = [
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/register/", RegisterUserView.as_view(), name="register"),
    path("students/", StudentListCreateView.as_view(), name="student-list"),
    path("students/<int:pk>/", StudentRetrieveUpdateDeleteView.as_view(), name="student-detail"),
    path("teachers/", TeacherListCreateView.as_view(), name="teacher-list"),
]
