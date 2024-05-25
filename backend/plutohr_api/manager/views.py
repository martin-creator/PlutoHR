from manager.models import Manager
from authentication.serializers import UserSerializer
from manager.serializers import ManagerSerializer
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample, OpenApiResponse
from drf_spectacular.types import OpenApiTypes


#  Class based views to create , update, delete and managers

class ManagerRegistrationView(APIView):
        
            """
            API endpoint that allows managers to be registered.
        
            The `post` function creates a new manager if the data is valid.
        
            Parameters:
            username: str
            email: str
            role: str
            password: str
        
            Returns:
            JSON: The manager data if the manager is created successfully.
            
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
                        summary='Manager Registration',
                        description='Register a new manager',
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
                responses={201: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Manager data')}
            )

            def post(self, request):
                serializer = ManagerSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ManagerListView(APIView):
    """
    API endpoint that allows managers to be viewed.
    
    The `get` function retrieves all managers.
    
    Returns:
    JSON: The manager data if the manager is created successfully.
    
    """
    
    @extend_schema(
        responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Manager data')}
    )
    def get(self, request):
        managers = Manager.objects.all()
        serializer = ManagerSerializer(managers, many=True)
        return Response(serializer.data)
    

class ManagerDetailView(APIView):
      """
        API endpoint that allows managers to be viewed, updated and deleted.

        The `get` function retrieves a manager's data.
        The `put` function updates a manager's data.
        The `delete` function deletes a manager.

        Parameters:
        username: str
        email: str
        role: str
        password: str
        phone_number: str
        address: str

        # To see specific manager data, you can use the id parameter

        Returns:
        JSON: The manager data if the manager is found.


        """
      
    #   permission_classes = [IsAuthenticated]
      @extend_schema(
        parameters=[
            OpenApiParameter(name='id', type=int, location=OpenApiParameter.PATH, required=True)
        ],
        responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Manager data')}
        )
      
      def get(self, request, id):
        manager = Manager.objects.get(id=id)
        serializer = ManagerSerializer(manager)
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
            OpenApiParameter(name='job_status', type=str, location=OpenApiParameter.QUERY, required=False),
        ],
        responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Manager data')}
        )
      
      def put(self, request, id):
        manager = Manager.objects.get(id=id)
        serializer = ManagerSerializer(manager, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
      @extend_schema(
        parameters=[
            OpenApiParameter(name='id', type=int, location=OpenApiParameter.PATH, required=True)
        ],
        responses={204: OpenApiResponse(response=OpenApiTypes.OBJECT, description='Manager deleted')}
        )
      
      def delete(self, request, id):
        manager = Manager.objects.get(id=id)
        manager.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
      


