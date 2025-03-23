from django.db import models
from datetime import datetime

# Create your models here.


class User(models.Model):
    """
    Create the class for the users information.
    """
    # User name
    user_name = models.CharField(unique=True, max_length=256, null=False)
    # User password
    user_pwd = models.CharField(max_length=256, null=False)
    # User email
    email = models.TextField(unique=True, max_length=256, null=False)
    # User birth day
    b_day = models.IntegerField(
            null=True,
            choices=(
                (i, i) for i in range(1, 31)
            )
    )
    # User birth month
    b_month = models.IntegerField(
            null=True,
            choices=(
                (i, i) for i in range(1, 12)
            )
    )
    # User birth year
    b_year = models.IntegerField(
            null=True,
            choices=(
                (i, i) for i in range(1900, int(datetime.now().year))
            )
    )
    # Last log in
    last_sign_in = models.DateTimeField(default=datetime.now)
    # TODO User filters
    # TODO User collections
