from django.urls import path, include
from manager.views import ManagerRegistrationView, ManagerListView, ManagerDetailView
from leave_management.views import LeaveManagementView, LeaveDetailView, LeaveBalanceView, LeaveApprovalView
from attendance_tracking.views import AttendanceRecordView
from report_generation.views import AttendanceReportView,LeaveReportView, GeneralCompanyOverview, DashboardView

urlpatterns = [
    path('register/', ManagerRegistrationView.as_view(), name='manager-registration'),
    path('list/', ManagerListView.as_view(), name='manager-list'),
    path('detail/<int:id>/', ManagerDetailView.as_view(), name='manager-detail'),
    # Add other URLs here

    path('leave/', LeaveManagementView.as_view(), name='leave-management'),
    path('leave/<int:pk>/', LeaveDetailView.as_view(), name='leave-detail'),
    path('leave/balance/<int:pk>/', LeaveBalanceView.as_view(), name='leave-balance'),
    path('leave/approval/<int:pk>/', LeaveApprovalView.as_view(), name='leave-approval'),

    path('attendance/', AttendanceRecordView.as_view(), name='attendance-record'),
    path('attendance/report/', AttendanceReportView.as_view(), name='attendance-report'),
    path('leave/report/', LeaveReportView.as_view(), name='leave-report'),
    path('company-overview/', GeneralCompanyOverview.as_view(), name='company-overview'),
    path('dashboard-summary/', DashboardView.as_view(), name='dashboard-summary'),

]