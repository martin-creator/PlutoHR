from django.urls import path, include
from manager.views import ManagerRegistrationView, ManagerListView, ManagerDetailView

urlpatterns = [
    path('register/', ManagerRegistrationView.as_view(), name='manager-registration'),
    path('list/', ManagerListView.as_view(), name='manager-list'),
    path('detail/<int:id>/', ManagerDetailView.as_view(), name='manager-detail'),
    # Add other URLs here
]