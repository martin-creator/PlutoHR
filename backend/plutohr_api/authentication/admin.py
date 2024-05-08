from django.contrib import admin
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from rest_framework.authtoken.models import Token

class User(AbstractUser):
# add these field: 2. EmployeeID: Unique identifier provided by the organization
# 3. Name: Full name of the user
# 4. ContactDetails: Phone number, email, address
# 5. JobTitle: Position of the user within the organization
# 6. Department: Department the user is part of
# 7. HireDate: Date when the user was hired
# 8. Role: Role of the user (Admin, HR, Employee)
# 9. Status: Current employment status (Active, Inactive)

# Djano Abstract User model already has username, password, email, first_name, last_name, is_active, is_staff, is_superuser, last_login, date_joined
    
    ROLE_CHOICES = (
        ('Manager', 'Manager'),
        ('Employee', 'Employee'),
    )

    DEPARTMENT_CHOICES = (
        ('HR', 'HR'),
        ('Finance', 'Finance'),
        ('IT', 'IT'),
        ('Marketing', 'Marketing'),
        ('Sales', 'Sales'),
    )

    STATUS_CHOICES = (
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
        ('On Leave', 'On Leave'),
        ('Resigned', 'Resigned'),
    )
    
    full_name = models.CharField(max_length=255)
    employee_id = models.CharField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    address = models.TextField()
    job_title = models.CharField(max_length=255)
    department = models.CharField(max_length=255, choices=DEPARTMENT_CHOICES) # Add department choices here makes it easier to select
    hire_date = models.DateField()
    role = models.CharField(max_length=255, choices=ROLE_CHOICES)
    status = models.CharField(max_length=255, choices=STATUS_CHOICES)
