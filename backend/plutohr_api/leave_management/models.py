from django.db import models
from employee.models import Employee

# Create your models here.

# These are the key fields that we need to include in our leave management model
# staffprofile_id
# request date
# start date
# end date
# reason for leave
# status (pending approval/approved/rejected)
# comments (made by the admin, e.g. reasons for refusal)

class Leave(models.Model):
    LEAVE_STATUS = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
        ('Requested', 'Requested'),
        ('Not Requested', 'Not Requested')
    ]
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='leaves', blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=455, choices=LEAVE_STATUS, default='Requested', blank=True)
    comments = models.TextField(blank=True)
    leave_balance = models.IntegerField(default=10, blank=True)

    # for the employee field, we use a ForeignKey field to create a one-to-many relationship between the Employee and Leave models.
    # So when an employee creates a leave request, the employee field will be set to the employee who created the leave request.
    # The person sending the post request needs to provide the employee id or the username of the employee who is creating the leave request.

    # the related_name attribute is used to create a reverse relation from the User model to the Leave model.
    # This will allow us to access the leaves of a user by calling user.leaves.all().

    # what would a sample post request look like?
    # do we provide the user id or the username?
    # what would the response look like?
    # give an example of a successful post request with fake data
    # {
    #     "user": "user",
    #     "start_date": "start_date",
    #     "end_date": "end_date",
    #     "reason": "reason",
    #     "status": "status",
    #     "comments": "comments"
    # }