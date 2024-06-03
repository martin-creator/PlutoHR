from django.shortcuts import render
import csv
from attendance_tracking.models import Attendance
from authentication.models import User
from leave_management.models import Leave
from employee.models import Employee
from manager.models import Manager
from django.db.models import Count, Q, Sum, Avg, F, FloatField, ExpressionWrapper, DecimalField, Value, CharField
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample, OpenApiResponse
from drf_spectacular.types import OpenApiTypes
from datetime import datetime, timedelta
import pprint
from django.template.loader import render_to_string
from weasyprint import HTML

# Create your views here.

# create class to generate attendance reports.
# The csv attendance report should have the following columns:
# employee_id
# employee_name
# date
# time_in
# time_out
# hours_worked
# total_hours_worked in a week
# total_hours_worked in a month
# leaves taken in amonth
# leaves remaining


class AttendanceReportView(APIView):
    """
    API endpoint that allows the HR manager to generate an attendance report.
    
    The `get` function generates an attendance report in CSV format.

    Returns:
    CSV: The attendance report in CSV format.

    """

    # add structure of the data needed for the get request


    @extend_schema(
        examples=[
            OpenApiExample(
                'Example 1',
                summary='Attendance Report',
                description='Generate an attendance report',
                value={}
            )
        ],

        responses={ 200: OpenApiResponse(description='Attendance Report') }
    )

    def get(self, request):
        # get all the attendance records
        attendance_records = Attendance.objects.all()

        # create the HTTP response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="pluto_hr_attendance_report.csv"'

        # create the csv writer
        writer = csv.writer(response)
        writer.writerow(['employee_id', 'employee_name', 'date', 'time_in', 'time_out', 'hours_worked'])

        # the attendance record just has the employee id as a foreign key , so we need to get the employee details from the base user model from the authentication app

        # get the employee details
        # an employee can have multiple attendance records
        # you should iterate through the attendance records and get the employee details for each record
        # all records should be written to the csv file

        print(attendance_records)


        for record in attendance_records:
            employee = User.objects.get(id=record.employee.id)
            pprint.pprint(record)
            writer.writerow([employee.id, employee.username, record.date, record.time_in, record.time_out, record.hours_worked])
            
        return response
        


class LeaveReportView(APIView):
    """
    API endpoint that allows the HR manager to generate a leave report.
    
    The `get` function generates a leave report in CSV format.

    Returns:
    CSV: The leave report in CSV format.

    """

    # add structure of the data needed for the get request


    @extend_schema(
        examples=[
            OpenApiExample(
                'Example 1',
                summary='Leave Report',
                description='Generate a leave report',
                value={}
            )
        ],

        responses={ 200: OpenApiResponse(description='Leave Report') }
    )

    def get(self, request):
        # get all the leave records
        leave_records = Leave.objects.all()

        # create the HTTP response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="pluto_hr_leave_report.csv"'

        # create the csv writer
        writer = csv.writer(response)
        writer.writerow(['employee_id', 'employee_name', 'start_date', 'end_date', 'reason', 'status', 'comments', 'leave_balance'])

        # the leave record just has the employee id as a foreign key , so we need to get the employee details from the base user model from the authentication app
        # generate a csv that has recors of all the leave requests made by employees

        # get the employee details
        # you shoud iterate through the leave records and get the employee details for each record
        # all records should be written to the csv file

        # for record in leave_records:
        #     employee = User.objects.get(id=record.employee.id)
        #     writer.writerow([employee.id, employee.username, record.start_date, record.end_date, record.reason, record.status, record.comments, record.leave_balance])
            
        # return response
        for record in leave_records:
            try:
                employee = User.objects.get(id=record.employee.id)
                writer.writerow([employee.id, employee.username, record.start_date, record.end_date, record.reason, record.status, record.comments, record.leave_balance])
            except AttributeError:
                # If there's an AttributeError, it means the employee ID is None
                # So, just write the record with dummy employee details
                writer.writerow(['dummy_employee_id', 'dummy_employee_name', record.start_date, record.end_date, record.reason, record.status, record.comments, record.leave_balance])
            
        return response
    


class GeneralCompanyOverview(APIView):
    """
    API endpoint that allows the HR manager to generate a general company overview report in PDF format.
    
    The `get` function generates a general company overview report in PDF format.

    Returns:
    PDF: The general company overview report in PDF format.

    """

    # add structure of the data needed for the get request


    @extend_schema(
        examples=[
            OpenApiExample(
                'Example 1',
                summary='General Company Overview Report',
                description='Generate a general company overview report',
                value={}
            )
        ],

        responses={ 200: OpenApiResponse(description='General Company Overview Report') }
    )

    def get(self, request):
        # get all the employees
        employees = Employee.objects.all()

        # get all the managers
        managers = Manager.objects.all()

        # get all the leave records
        leave_records = Leave.objects.all()

        # get all the attendance records
        attendance_records = Attendance.objects.all()

        # get the total number of employees
        total_employees = employees.count()

        # get the total number of managers
        total_managers = managers.count()

        # get the total number of leave records
        total_leave_records = leave_records.count()

        # get the total number of attendance records
        total_attendance_records = attendance_records.count()

        # date report was generated
        date = datetime.now()

        # List all names of employees

        employee_names = [employee.username for employee in employees]

        # List all names of departments
        department_names = [employee.department for employee in employees]



        # get the total number of leaves taken in a month

        # get the total number of leaves remaining
        # get the total number of hours worked in a week
        # get the total number of hours worked in a month

        # get the total number of leaves taken in a month
        # get the total number of leaves remaining
        # get the total number of hours worked in a week
        # get the total number of hours worked in a month

        # create the HTML template
        html_string = render_to_string('general_company_overview_report.html', {
            'total_employees': total_employees,
            'total_managers': total_managers,
            'total_leave_records': total_leave_records,
            'total_attendance_records': total_attendance_records,
            'date': date,
            'employee_names': employee_names,
            'department_names': department_names
        })


        # create the HTTP response

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="pluto_hr_general_company_overview_report.pdf"'
        # create the PDF
        HTML(string=html_string).write_pdf(response)

        return response
    

# create a class that summarises all keey compamy information ans retunrs it to as JSON for the frontend devepoerls to add it to the dashboatrd
# using all my models come up with all the key data that the company needs to see on the dashboard
      

class DashboardView(APIView):
    """
    API endpoint returns all key company information and stats for analytics dashboard on HR in JSON format.

    The `get` function retrieves all key company information and stats for analytics dashboard on HR.

    Returns:
    JSON: The company data if the company is found.

    """

    @extend_schema(
        responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Company data')}
    )
    
    def get(self, request):
        employees = Employee.objects.all()
        managers = Manager.objects.all()
        leave_records = Leave.objects.all()
        attendance_records = Attendance.objects.all()
        total_employees = employees.count()
        total_managers = managers.count()
        total_leave_records = leave_records.count()
        total_attendance_records = attendance_records.count()
        total_hours_worked = attendance_records.aggregate(Sum('hours_worked'))

        return Response({
            'total_employees': total_employees,
            'total_managers': total_managers,
            'total_leave_records': total_leave_records,
            'total_attendance_records': total_attendance_records,
            'total_hours_worked': total_hours_worked
        })
    


    

        




    
