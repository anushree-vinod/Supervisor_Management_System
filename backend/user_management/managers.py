from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomBaseUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a user with an email and password."""
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and return a superuser with an email, username, and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        # Ensure the password is set, even if it is empty
        if password is None:
            raise ValueError('Superusers must have a password')

        return self.create_user(email, password, **extra_fields)
