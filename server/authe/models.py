from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key = True)
    email = models.TextField()
    password = models.TextField()
    create_data = models.DateTimeField()
