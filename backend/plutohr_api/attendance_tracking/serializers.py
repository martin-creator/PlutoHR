from rest_framework import serializers
from .models import Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['employee', 'date', 'time_in', 'time_out']
        extra_kwargs = {'employee': {'write_only': True}}
        
    def create(self, validated_data):
        attendance = Attendance.objects.create(**validated_data)
        return attendance
    
    # calculate hours worked once user updates with time_out
    def update(self, instance, validated_data):
        instance.employee = validated_data.get('employee', instance.employee)
        instance.date = validated_data.get('date', instance.date)
        instance.time_in = validated_data.get('time_in', instance.time_in)
        instance.time_out = validated_data.get('time_out', instance.time_out)
        instance.hours_worked = instance.time_out - instance.time_in
        instance.save()
        return instance
    