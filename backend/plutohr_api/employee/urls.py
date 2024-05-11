from django.urls import path, include
from employee.views import EmployeeRegistrationView, EmployeeListView, EmployeeDetailView

urlpatterns = [
    path('register/', EmployeeRegistrationView.as_view(), name='employee-registration'),
    path('list/', EmployeeListView.as_view(), name='employee-list'),
    path('detail/<int:id>/', EmployeeDetailView.as_view(), name='employee-detail'),
    # Add other URLs here
]