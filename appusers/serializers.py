from rest_framework import serializers
from .models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=User
        fields=('url','email','username','password')
        extra_kwargs={'password':{'write_only':True}}

    def create(self,validated_data):
        password=validated_data.pop('password')
        user=User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self,instance,validated_data):
        instance.email=validated_data.get('email',instance.email)
        password=validated_data.pop('password')
        instance.set_password(password)
        instance.save()
        return instance