# Generated by Django 3.2.25 on 2025-03-12 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='researchproject',
            name='title',
            field=models.CharField(max_length=400),
        ),
    ]
