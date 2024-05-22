from authentication.models import User
from employee.models import Employee
from attendance_tracking.models import Attendance
from attendance_tracking.serializers import AttendanceSerializer
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample, OpenApiResponse
from drf_spectacular.types import OpenApiTypes


#  Create class record to clock in and clock out

class AttendanceRecordView(APIView):
    
    """
    API endpoint that allows employees to clock in and clock out.
    
    The `post` function creates a new attendance record if the data is valid.
    
    Parameters:
    employee: int
    date: date
    time_in: time
    time_out: time
    
    Returns:
    JSON: The attendance record data if the attendance record is created successfully.
    
    """
    
    # add structure of the data needed for the post request
    
    
    
    @extend_schema(
        parameters=[
            OpenApiParameter(name='employee', type=OpenApiTypes.INT, location=OpenApiParameter.QUERY, required=True),
            OpenApiParameter(name='date', type=OpenApiTypes.DATE, location=OpenApiParameter.QUERY, required=True),
            OpenApiParameter(name='time_in', type=OpenApiTypes.TIME, location=OpenApiParameter.QUERY, required=True),
            OpenApiParameter(name='time_out', type=OpenApiTypes.TIME, location=OpenApiParameter.QUERY, required=False),
            
        ],
        examples=[
            OpenApiExample(
                'Example 1',
                summary='Attendance Record',
                description='Clock in and clock out',
                value={
                    "employee": "employee",
                    "date": "date",
                    "time_in": "time_in",
                    "time_out": "time_out",
                }
            )
        ],
       responses={201: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Sucessfully clocked in')},
    )
    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



@extend_schema(
    parameters=[
        OpenApiParameter(name='employee', type=OpenApiTypes.INT, location=OpenApiParameter.QUERY, required=True),
        OpenApiParameter(name='date', type=OpenApiTypes.DATE, location=OpenApiParameter.QUERY, required=True),
        OpenApiParameter(name='time_in', type=OpenApiTypes.TIME, location=OpenApiParameter.QUERY, required=True),
        OpenApiParameter(name='time_out', type=OpenApiTypes.TIME, location=OpenApiParameter.QUERY, required=False),
        
    ],

    examples=[
        OpenApiExample(
            'Example 1',
            summary='Attendance Record',
            description='Clock in and clock out',
            value={
                "employee": "employee",
                "date": "date",
                "time_in": "time_in",
                "time_out": "time_out",
            }
        )
    ],

    responses={201: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Sucessfully clocked out')},
)

def put(self, request, pk):
    attendance = Attendance.objects.get(pk=pk)
    serializer = AttendanceSerializer(attendance, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# get all attendance records
@extend_schema(
    responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='All attendance records')},
)
def get(self, request):
    attendance = Attendance.objects.all()
    serializer = AttendanceSerializer(attendance, many=True)
    return Response(serializer.data)


    