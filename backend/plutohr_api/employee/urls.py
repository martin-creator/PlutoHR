from django.urls import path, include
from employee.views import EmployeeRegistrationView, EmployeeListView, EmployeeDetailView
from leave_management.views import LeaveManagementView, LeaveDetailView, LeaveBalanceHistoryView,LeaveList
from attendance_tracking.views import AttendanceRecordView

urlpatterns = [
    path('register/', EmployeeRegistrationView.as_view(), name='employee-registration'),
    path('list/', EmployeeListView.as_view(), name='employee-list'),
    path('detail/<int:id>/', EmployeeDetailView.as_view(), name='employee-detail'),

    path('leave/', LeaveManagementView.as_view(), name='leave-management'),
    path('leave/<int:pk>/', LeaveDetailView.as_view(), name='leave-detail'),
    path('leave/balance/history/<int:pk>/', LeaveBalanceHistoryView.as_view(), name='leave-balance-history'),
    path('leave/list/<int:pk>/', LeaveList.as_view(), name='leave-list'),

    path('attendance/', AttendanceRecordView.as_view(), name='attendance-record'),
    path('attendance/<int:pk>/', AttendanceRecordView.as_view(), name='attendance-record'),
    # Add other URLs here
]