# Generated by Django 5.1.1 on 2024-10-23 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jzj', '0019_remove_transaction_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='transaction_number',
            field=models.CharField(max_length=17, null=True, unique=True),
        ),
    ]
