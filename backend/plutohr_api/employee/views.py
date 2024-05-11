from authentication.models import User
from employee.models import Employee
from authentication.serializers import UserSerializer
from employee.serializers import EmployeeSerializer
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample, OpenApiResponse
from drf_spectacular.types import OpenApiTypes

#  Class based views to create , update, delete and list all employees

class EmployeeRegistrationView(APIView):
    
        """
        API endpoint that allows employees to be registered.
    
        The `post` function creates a new employee if the data is valid.
    
        Parameters:
        username: str
        email: str
        role: str
        password: str
    
        Returns:
        JSON: The employee data if the employee is created successfully.
        
        """
    
        # add structure of the data needed for the post request
    
        
    
        @extend_schema(
            parameters=[
                OpenApiParameter(name='username', type=str, location=OpenApiParameter.QUERY, required=True),
                OpenApiParameter(name='email', type=str, location=OpenApiParameter.QUERY, required=True),
                OpenApiParameter(name='role', type=str, location=OpenApiParameter.QUERY, required=True),
                OpenApiParameter(name='password', type=str, location=OpenApiParameter.QUERY, required=True),
                OpenApiParameter(name='phone_number', type=str, location=OpenApiParameter.QUERY, required=False),
                OpenApiParameter(name='address', type=str, location=OpenApiParameter.QUERY, required=False),
                OpenApiParameter(name='job_title', type=str, location=OpenApiParameter.QUERY, required=False),
                OpenApiParameter(name='department', type=str, location=OpenApiParameter.QUERY, required=False),
                OpenApiParameter(name='job_status', type=str, location=OpenApiParameter.QUERY, required=False),
    
            ],
            examples=[
                OpenApiExample(
                    'Example 1',
                    summary='Employee Registration',
                    description='Register a new employee',
                    value={
                        "username": "username",
                        "email": "email",
                        "role": "role",
                        "password": "password",
                        "phone_number": "phone_number",
                        "address": "address",
                        "job_title": "job_title",
                        "department": "department",
                        "job_status": "job_status"
                    }
                )
            ],
            # responses={
            #     201: OpenApiResponse(
            #         description='Employee created successfully',
            #         examples=[
            #             OpenApiExample(
            #                 'Example 1',
            #                 summary='Employee Registration',
            #                 description='Register a new employee',
            #                 value={
            #                     "username": "username",
            #                     "email": "email",
            #                     "role": "role",
            #                     "password": "password",
            #                     "phone_number": "phone_number",
            #                     "address": "address",
            #                     "job_title": "job_title",
            #                     "department": "department",
            #                     "job_status": "job_status"
            #                 }
            #             )
            #         ]
            #     ),
            #     400: OpenApiResponse(
            #         description='Bad Request',
            #         examples=[
            #             OpenApiExample(
            #                 'Example 1',
            #                 summary='Employee Registration',
            #                 description='Register a new employee',
            #                 value={
            #                     "error": "error message"
            #                 }
            #             )
            #         ]
            #     )
            # }

            responses={201: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Employee data')}
        )

        def post(self, request):
            serializer = EmployeeSerializer(data=request.data)
            # serializer_2 = UserSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                # serializer_2.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class EmployeeListView(APIView):
    """
    
    API endpoint that allows employees to be viewed.
    
    The `get` function lists all employees.
    
    Returns:
    JSON: A list of all employees.
    
    """

    # permission_classes = [IsAuthenticated]
    
    @extend_schema(
        responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='List of employees')}
    )
    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
    

class EmployeeDetailView(APIView):

    """
    API endpoint that allows employees to be viewed, updated and deleted.

    The `get` function retrieves an employee's data.
    The `put` function updates an employee's data.
    The `delete` function deletes an employee.

    Parameters:
    id: int

    Returns:
    JSON: The employee data if the employee is found.


    """
    permission_classes = [IsAuthenticated]
    
    @extend_schema(
        parameters=[
            OpenApiParameter(name='id', type=int, location=OpenApiParameter.PATH, required=True)
        ],
        responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Employee data')}
    )
    def get(self, request, id):
        employee = Employee.objects.get(id=id)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)
    
    @extend_schema(
        parameters=[
            OpenApiParameter(name='id', type=int, location=OpenApiParameter.PATH, required=True),
            OpenApiParameter(name='username', type=str, location=OpenApiParameter.QUERY, required=False),
            OpenApiParameter(name='email', type=str, location=OpenApiParameter.QUERY, required=False),
            OpenApiParameter(name='role', type=str, location=OpenApiParameter.QUERY, required=False),
            OpenApiParameter(name='password', type=str, location=OpenApiParameter.QUERY, required=False),
            OpenApiParameter(name='phone_number', type=str, location=OpenApiParameter.QUERY, required=False),
            OpenApiParameter(name='address', type=str, location=OpenApiParameter.QUERY, required=False),
            OpenApiParameter(name='job_title', type=str, location=OpenApiParameter.QUERY, required=False),
            OpenApiParameter(name='department', type=str, location=OpenApiParameter.QUERY, required=False),
            OpenApiParameter(name='job_status', type=str, location=OpenApiParameter.QUERY, required=False)
        ],
        responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Employee data')}
    )
    def put(self, request, id):
        employee = Employee.objects.get(id=id)
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
        parameters=[
            OpenApiParameter(name='id', type=int, location=OpenApiParameter.PATH, required=True)
        ],
        responses={204: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Employee deleted')}
    )
    def delete(self, request, id):
        employee = Employee.objects.get(id=id)
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


