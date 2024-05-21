from django.urls import path, include
from employee.views import EmployeeRegistrationView, EmployeeListView, EmployeeDetailView
from leave_management.views import LeaveManagementView, LeaveDetailView

urlpatterns = [
    path('register/', EmployeeRegistrationView.as_view(), name='employee-registration'),
    path('list/', EmployeeListView.as_view(), name='employee-list'),
    path('detail/<int:id>/', EmployeeDetailView.as_view(), name='employee-detail'),

    path('leave/', LeaveManagementView.as_view(), name='leave-management'),
    path('leave/<int:pk>/', LeaveDetailView.as_view(), name='leave-detail'),
    # Add other URLs here
]