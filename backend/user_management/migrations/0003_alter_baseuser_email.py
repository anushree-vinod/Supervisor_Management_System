# Generated by Django 3.2.25 on 2025-03-01 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0002_student_supervisor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='baseuser',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
