from django.urls import path, include
from manager.views import ManagerRegistrationView, ManagerListView, ManagerDetailView
from leave_management.views import LeaveManagementView, LeaveDetailView, LeaveBalanceView, LeaveApprovalView

urlpatterns = [
    path('register/', ManagerRegistrationView.as_view(), name='manager-registration'),
    path('list/', ManagerListView.as_view(), name='manager-list'),
    path('detail/<int:id>/', ManagerDetailView.as_view(), name='manager-detail'),
    # Add other URLs here

    path('leave/', LeaveManagementView.as_view(), name='leave-management'),
    path('leave/<int:pk>/', LeaveDetailView.as_view(), name='leave-detail'),
    path('leave/balance/<int:pk>/', LeaveBalanceView.as_view(), name='leave-balance'),
    path('leave/approval/<int:pk>/', LeaveApprovalView.as_view(), name='leave-approval'),

]