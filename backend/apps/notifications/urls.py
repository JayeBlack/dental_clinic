from django.urls import path
from . import views

app_name = 'notifications'

urlpatterns = [
    path('create/', views.NotificationCreateView.as_view(), name='notification_create'),
    path('list/', views.NotificationListView.as_view(), name='notification_list'),
    path('send/<int:pk>/', views.NotificationSendView.as_view(), name='notification_send'),
]