from django.core.validators import RegexValidator
from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=32, null=False, unique=True)


class Person(models.Model):
    name = models.CharField(max_length=32, null=False, unique=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)


class Contact(models.Model):
    regex_validator = RegexValidator('^(telegram:@|skype:)([a-zA-Z0-9]{5,16})|((mobile:(8|\\+7))[0-9]{10})$')
    name = models.CharField(max_length=32, null=False,validators=[regex_validator], unique=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
