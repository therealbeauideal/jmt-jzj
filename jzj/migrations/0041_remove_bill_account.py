# Generated by Django 5.1.2 on 2024-10-31 22:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jzj', '0040_alter_account_options_alter_account_managers_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bill',
            name='account',
        ),
    ]