# Generated by Django 5.1.3 on 2024-11-06 03:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='create_at',
            new_name='created_at',
        ),
    ]
