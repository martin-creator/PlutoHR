from employee.models import Employee
from employee.serializers import EmployeeSerializer
from leave_management.models import Leave
from leave_management.serializers import LeaveSerializer, LeaveStatusSerializer, LeaveBalanceSerializer
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample, OpenApiResponse
from drf_spectacular.types import OpenApiTypes

# Create your views here.
# Leave model
# LEAVE_STATUS = [
#         ('P', 'Pending'),
#         ('A', 'Approved'),
#         ('R', 'Rejected'),
#     ]
#     employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='leaves')
#     start_date = models.DateField()
#     end_date = models.DateField()
#     reason = models.TextField()
#     status = models.CharField(max_length=1, choices=LEAVE_STATUS)
#     comments = models.TextField(blank=True)

class LeaveManagementView(APIView):
        
        """
        API endpoint that allows leaves to be created, listed and updated.
        
        The `post` function creates a new leave if the data is valid.
        
        Parameters:
        employee_pK: int
        start_date: str
        end_date: str
        reason: str
        status: str
        comments: str
        
        Returns:
        JSON: The leave data if the leave is created successfully.
        
        """
        
        # add structure of the data needed for the post request
        
        
        
        @extend_schema(
            parameters=[
                OpenApiParameter(name='employee', type=str, location=OpenApiParameter.QUERY, required=True),
                OpenApiParameter(name='start_date', type=str, location=OpenApiParameter.QUERY, required=True),
                OpenApiParameter(name='end_date', type=str, location=OpenApiParameter.QUERY, required=True),
                OpenApiParameter(name='reason', type=str, location=OpenApiParameter.QUERY, required=True),
                              
            ],
            examples=[
                OpenApiExample(
                    'Example 1',
                    summary='Leave Management',
                    description='Create a new leave',
                    value={
                        "employee": "employee",
                        "start_date": "start_date",
                        "end_date": "end_date",
                        "reason": "reason",
                    }
                )
            ],
            responses={201: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Leave data')}
        )

        def post(self, request):
            serializer = LeaveSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        @extend_schema(
            responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='List of leaves')}
        )
        def get(self, request):
            leaves = Leave.objects.all()
            serializer = LeaveSerializer(leaves, many=True)
            return Response(serializer.data)
        
class LeaveDetailView(APIView):
        
        """
        API endpoint that allows leaves to be viewed, updated and deleted.
        
        The `get` function retrieves the leave data.
        
        Parameters:
        employee: str
        start_date: str
        end_date: str
        reason: str
        status: str
        comments: str
        
        Returns:
        JSON: The leave data.
        
        """
        
        @extend_schema(
            parameters=[
                OpenApiParameter(name='employee_id', type=str, location=OpenApiParameter.QUERY, required=True),
                
            ],
            examples=[
                OpenApiExample(
                    'Example 1',
                    summary='Leave Management',
                    description='Retrieve a leave',
                    value={
                        "employee_id": "employee_id",
                    }
                )
            ],
            responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Leave data')}
        )
        
        def get(self, request, pk):
            leave = Leave.objects.get(pk=pk)
            serializer = LeaveSerializer(leave)
            return Response(serializer.data)
        
        @extend_schema(
            parameters=[
                OpenApiParameter(name='employee', type=str, location=OpenApiParameter.QUERY, required=True),
                OpenApiParameter(name='start_date', type=str, location=OpenApiParameter.QUERY, required=True),
                OpenApiParameter(name='end_date', type=str, location=OpenApiParameter.QUERY, required=True),
                OpenApiParameter(name='reason', type=str, location=OpenApiParameter.QUERY, required=True),
            ],
            examples=[
                OpenApiExample(
                    'Example 1',
                    summary='Leave Management',
                    description='Update a leave',
                    value={
                        "employee": "employee",
                        "start_date": "start_date",
                        "end_date": "end_date",
                        "reason": "reason",
                    }
                )
            ],
            responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Leave data')}
        )

        def put(self, request, pk):
            leave = Leave.objects.get(pk=pk)
            serializer = LeaveSerializer(leave, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        @extend_schema(
            responses={204: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Leave deleted')}
        )
        def delete(self, request, pk):
            leave = Leave.objects.get(pk=pk)
            leave.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        

class LeaveApprovalView(APIView):
        
        """
        API endpoint that allows leaves status to be updated and also add comments by the manager.

        The `put` function updates the leave status and comments.

        Parameters:
        status: str
        comments: str

        Returns:
        JSON: The leave data if the leave is updated successfully.

        """

        @extend_schema(
            parameters=[
                OpenApiParameter(name='status', type=str, location=OpenApiParameter.QUERY, required=True),
                OpenApiParameter(name='comments', type=str, location=OpenApiParameter.QUERY, required=False),
                
            ],
            examples=[
                OpenApiExample(
                    'Example 1',
                    summary='Leave Management',
                    description='Update a leave',
                    value={
                        "status": "status",
                        "comments": "comments",
                    }
                )
            ],
            responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Leave data')}
        )

        def put(self, request, pk):
            leave = Leave.objects.get(pk=pk)
            serializer = LeaveStatusSerializer(leave, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class LeaveList(APIView):
      # Return all the leave requests for a particular employee
            """
            API endpoint that allows leaves to be listed.

            The `get` function retrieves the leave data.

            Parameters:
            employee_pK: int

            Returns:
            JSON: The leave data.

    
            """

            @extend_schema(
                parameters=[
                    OpenApiParameter(name='employee(pk)', type=str, location=OpenApiParameter.QUERY, required=True),
                    
                ],
                responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='List of leaves')}
            )

            def get(self, request, pk):
                leaves = Leave.objects.filter(employee=pk)
                serializer = LeaveSerializer(leaves, many=True)
                return Response(serializer.data)
        


class LeaveBalanceView(APIView):
            
            """
            API endpoint that allows leaves balance to be updated.
    
            The `put` function updates the leave balance.
    
            Parameters:
            leave_balance: int
    
            Returns:
            JSON: The leave data if the leave balance is updated successfully.
    
            """
    
            @extend_schema(
                parameters=[
                    OpenApiParameter(name='leave_balance', type=int, location=OpenApiParameter.QUERY, required=True),
                    
                ],
                examples=[
                    OpenApiExample(
                        'Example 1',
                        summary='Leave Management',
                        description='Update a leave balance',
                        value={
                            "leave_balance": "leave_balance",
                        }
                    )
                ],
                responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Leave data')}
            )
    
            def put(self, request, pk):
                leave = Leave.objects.get(pk=pk)
                serializer = LeaveBalanceSerializer(leave, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            

            

# Todo: add an api endpoint for Dashboard for employees to view leave balances and request history.


class LeaveBalanceHistoryView(APIView):
            
            """
            API endpoint that allows leaves balance and request history to be viewed.
    
            The `get` function retrieves the leave balance and request history.
    
            Parameters:
            leave_balance: int
    
            Returns:
            JSON: The leave data if the leave balance is updated successfully.
    
            """
    
            @extend_schema(
                responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Leave data')}
            )
    
            def get(self, request, pk):
                leave = Leave.objects.get(pk=pk)
                serializer = LeaveBalanceSerializer(leave)
                return Response(serializer.data)
            


            

        

        

        
    