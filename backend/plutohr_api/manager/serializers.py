from rest_framework import serializers
from .models import Manager


class ManagerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Manager
        fields = ['username', 'email', 'role', 'password', 'phone_number', 'address', 'job_title', 'department', 'job_status']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        employee = Manager.objects.create_user(**validated_data)
        return employee
    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.role = validated_data.get('role', instance.role)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.address = validated_data.get('address', instance.address)
        instance.job_title = validated_data.get('job_title', instance.job_title)
        instance.department = validated_data.get('department', instance.department)
        instance.job_status = validated_data.get('job_status', instance.job_status)
        instance.save()
        return instance
    
