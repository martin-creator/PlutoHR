from authentication.models import User
from authentication.serializers import UserSerializer, UserLoginSerializer, UserLogoutSerializer
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample, OpenApiResponse
from drf_spectacular.types import OpenApiTypes


# classdrf_spectacular.utils.OpenApiExample(name: str, value: ~typing.Any = <class 'rest_framework.fields.empty'>, external_value: str = '', summary: str | ~django.utils.functional.Promise = '', description: str | ~django.utils.functional.Promise = '', request_only: bool = False, response_only: bool = False, parameter_only: ~typing.Tuple[str, ~typing.Literal['query', 'path', 'header', 'cookie']] | None = None, media_type: str | None = None, status_codes: ~typing.Sequence[str | int] | None = None)


class UserRegistrationView(APIView):

    """
    API endpoint that allows users to be registered.

    The `post` function creates a new user if the data is valid.

    Parameters:
    username: str
    email: str
    role: str
    password: str

    Returns:
    JSON: The user data if the user is created successfully.
    
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
                summary='User Registration',
                description='Register a new user',
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

        responses={201: OpenApiResponse(response=OpenApiTypes.OBJECT, description='User data')}
    )
        
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserLoginView(APIView):

    """
    API endpoint that allows users to login.

    The `post` function logs in a user if the credentials are valid.

    Parameters:
    username: str
    password: str

    Returns:
    JSON: The user data if the user is logged in successfully.
    
    """

    @extend_schema(
        parameters=[
            OpenApiParameter(name='username', type=str, location=OpenApiParameter.QUERY, required=True),
            OpenApiParameter(name='password', type=str, location=OpenApiParameter.QUERY, required=True),
        ],
        examples=[
            OpenApiExample(
                'Example 1',
                summary='User Login',
                description='Login a user',
                value={
                    "username": "username",
                    "password": "password"
                }
            )
        ], 

        responses={200: OpenApiResponse(response=OpenApiTypes.OBJECT, description='User data')}
    )
    
    def post(self, request, *args, **kwargs):

        serializer = UserLoginSerializer(data=request.data)
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            if created:
                token.delete()  # Delete the token if it was already created
                token = Token.objects.create(user=user)
            return Response({'token': token.key, 'username': user.username, 'role': user.role})
        else:
            return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)



class UserLogoutView(APIView):

    """
    API endpoint that allows users to logout.

    The `post` function logs out a user if the user is authenticated.

    Returns:
    JSON: A message if the user is logged out successfully.
    
    """


    permission_classes = [IsAuthenticated]

    # serializer_class = UserLogoutSerializer

    
    @extend_schema(
        responses={201: OpenApiResponse(description='You have been logged out.')}
    )
    def post(self, request):
        print(request.headers) 
        token_key = request.auth.key
        token = Token.objects.get(key=token_key)
        token.delete()

        return Response({'detail': 'Successfully logged out.'})



# from django.contrib.auth.models import Group, User
# from rest_framework import permissions, viewsets

# from authentication.serializers import GroupSerializer, UserSerializer


# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]


# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """
#     queryset = Group.objects.all().order_by('name')
#     serializer_class = GroupSerializer
#     permission_classes = [permissions.IsAuthenticated]