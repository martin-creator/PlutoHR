from django.urls import path, include
from leave_management.views import LeaveManagementView, LeaveDetailView, LeaveBalanceView, LeaveApprovalView, LeaveBalanceHistoryView

urlpatterns = [
    path('leave/', LeaveManagementView.as_view(), name='leave-management'),
    path('leave/<int:pk>/', LeaveDetailView.as_view(), name='leave-detail'),
    path('leave/balance/<int:pk>/', LeaveBalanceView.as_view(), name='leave-balance'),
    path('leave/approval/<int:pk>/', LeaveApprovalView.as_view(), name='leave-approval'),
    path('leave/balance/history/<int:pk>/', LeaveBalanceHistoryView.as_view(), name='leave-balance-history'),
    # Add other URLs here
]