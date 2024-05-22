from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    ROLE_CHOICES = (
        ('Manager', 'Manager'),
        ('Employee', 'Employee'),
    )

    DEPARTMENT_CHOICES = (
        ('HR', 'HR'),
        ('IT', 'IT'),
        ('Finance', 'Finance'),
        ('Admin', 'Admin'),
    )

    STATUS_CHOICES = (
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
        ('Suspended', 'Suspended'),
        ('Leave', 'Leave')
    )


    role = models.CharField(max_length=15, choices=ROLE_CHOICES)
    email = models.EmailField(unique=True, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    job_title = models.CharField(max_length=255, blank=True, null=True)
    department = models.CharField(max_length=255, blank=True, null=True, choices=DEPARTMENT_CHOICES)
    job_status = models.BooleanField(max_length=255, blank=True, null=True, choices=STATUS_CHOICES)
    photo = models.ImageField(upload_to='profile_pics', blank=True, null=True) 

    # profile_pics is the directory where the images will be stored. The images will be stored in the media directory of the project.
    # Will profile pics be created automatically?
   

