# Generated by Django 3.2.7 on 2021-10-10 12:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authe', '0002_rename_create_data_user_create_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='create_at',
            new_name='created_at',
        ),
    ]
