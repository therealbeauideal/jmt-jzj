# Generated by Django 5.1.1 on 2024-10-22 03:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jzj', '0015_account_amount_account_currency_account_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='updated_date',
        ),
    ]