#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r backend/requirements.txt

# Convert static asset files
python backend/manage.py collectstatic --no-input

# Apply any outstanding database migrations
python backend/manage.py migrate

# Check if the superuser exists, and create one if it doesn't
python backend/manage.py shell <<EOF
from user_management.models import BaseUser
from django.core.management import call_command

# Check if a superuser exists
if not BaseUser.objects.filter(is_superuser=True).exists():
    print("Superuser does not exist. Creating one...")
    # Create superuser without password
    user = BaseUser.objects.create_superuser('admin@example.com', 'adminpassword123')  # Create the user and set the password
    print("Superuser created.")

else:
    print("Superuser already exists.")
EOF
