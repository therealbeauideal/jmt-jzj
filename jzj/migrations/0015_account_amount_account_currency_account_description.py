# Generated by Django 5.1.1 on 2024-10-22 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jzj', '0014_remove_category_user_remove_goal_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='amount',
            field=models.DecimalField(decimal_places=2, max_digits=15, null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='currency',
            field=models.CharField(choices=[('USD', 'US Dollar'), ('EUR', 'Euro'), ('GBD', 'Great British Pound/British Pound Sterling'), ('JPY', 'Japanese Yen'), ('CNY', 'Chinese Yuan'), ('CAD', 'Canadian Dollar'), ('CAD', 'Canadian Dollar'), ('AUD', 'Australian Dollar'), ('INR', 'Indian Rupee'), ('CHF', 'Swiss Franc'), ('ZAR', 'South African Rand'), ('MXN', 'Mexican Peso'), ('BRL', 'Brazilian Real'), ('KRW', 'South Korean WON'), ('RUB', 'Russian Ruble'), ('SAR', 'Saudi Riyal'), ('NGN', 'Nigerian Naira'), ('SGD', 'Singapore Dollaer'), ('PHP', 'Philippine Peso'), ('XOF', 'West African CFA Franc'), ('XAF', 'Central African CFA Franc'), ('XCD', 'Eastern Caribbean Dollar')], default='USD', max_length=3),
        ),
        migrations.AddField(
            model_name='account',
            name='description',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
    ]