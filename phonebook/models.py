from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=32, null=False, unique=True)


class Person(models.Model):
    name = models.CharField(max_length=32, null=False, unique=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)


class Contact(models.Model):
    name = models.CharField(max_length=32, null=False, unique=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)

