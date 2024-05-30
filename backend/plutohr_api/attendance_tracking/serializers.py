from rest_framework import serializers
from .models import Attendance
from datetime import datetime, timedelta

class AttendanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'date', 'time_in', 'time_out', 'hours_worked']
        # make the time_out field optional
        extra_kwargs = {'time_out': {'required': False}, 'hours_worked': {'read_only': True}, 'id': {'read_only': True}}

    # Calculate hours worked
    def calculate_hours_worked(self, instance):
        # Combine date and time to create datetime objects
        time_in_datetime = datetime.combine(instance.date, instance.time_in)
        time_out_datetime = datetime.combine(instance.date, instance.time_out)

        # Calculate the difference
        time_difference = time_out_datetime - time_in_datetime

        # Convert the difference to hours worked
        instance.hours_worked = time_difference.total_seconds() / 3600
        instance.save()
        return instance
        
    def create(self, validated_data):
        attendance = Attendance.objects.create(**validated_data)
        # Calculate hours worked
        self.calculate_hours_worked(attendance)
        return attendance
    
    def update(self, instance, validated_data):
        instance.employee = validated_data.get('employee', instance.employee)
        instance.date = validated_data.get('date', instance.date)
        instance.time_in = validated_data.get('time_in', instance.time_in)
        instance.time_out = validated_data.get('time_out', instance.time_out)

        # Calculate hours worked
        self.calculate_hours_worked(instance)
        return instance
    
    # calculate hours worked even on a get request
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['hours_worked'] = self.calculate_hours_worked(instance).hours_worked
        return representation
    

