from rest_framework import serializers
from .models import Leave

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = ['employee', 'start_date', 'end_date', 'reason', 'status', 'comments', 'leave_balance']
        extra_kwargs = {'status': {'read_only': True}, 'comments': {'read_only': True}, 'leave_balance': {'read_only': True}}
    
    def create(self, validated_data):
        leave = Leave.objects.create(**validated_data)
        # reduce the leave balance of the employee by 1
        employee = leave.employee
        employee.leave_balance -= 1
        employee.save()
        
        return leave
    
    def update(self, instance, validated_data):
        instance.employee = validated_data.get('employee', instance.employee)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.reason = validated_data.get('reason', instance.reason)
        instance.save()
        return instance
    
class LeaveStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = ['status', 'comments']
        # extra_kwargs = {'comments': {'required': True}}
    
    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.comments = validated_data.get('comments', instance.comments)
        instance.save()
        return instance
    

class LeaveBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = ['leave_balance']
        extra_kwargs = {'leave_balance': {'read_only': True}}
    
    def update(self, instance, validated_data):
        instance.leave_balance = validated_data.get('leave_balance', instance.leave_balance)
        instance.save()
        return instance