from rest_framework import serializers
from .models import Contact, Person, Company


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = ['id', 'name', 'person']

    def create(self, validated_data):
        contact = Contact.objects.create(
            name=validated_data['name'],
            person=validated_data['person']
        )

        return contact


class PersonSerializer(serializers.ModelSerializer):
    contacts = ContactSerializer(many=True, read_only=True, source='contact_set')

    class Meta:
        model = Person
        fields = ['id', 'name', 'company', 'contacts']

    def create(self, validated_data):
        person = Person.objects.create(
            name=validated_data['name'],
            company=validated_data['company'],
        )

        return person


class CompanySerializer(serializers.ModelSerializer):
    persons = PersonSerializer(many=True, read_only=True, source='person_set')

    class Meta:
        model = Company
        fields = ['id', 'name', 'persons']

    def create(self, validated_data):
        company = Company.objects.create(
            name=validated_data['name'],
        )
        return company


