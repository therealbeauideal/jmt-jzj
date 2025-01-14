# Generated by Django 5.1.1 on 2024-10-19 01:50

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jzj', '0008_budget_current_spending_budget_is_active_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='recurringpayment',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='recurringpayment',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='recurringpayment',
            name='is_auto_renew',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='recurringpayment',
            name='notifications_enabled',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='recurringpayment',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('active', 'Active'), ('paused', 'Paused'), ('canceled', 'Canceled'), ('completed', 'Completed')], default='pending', max_length=10),
        ),
        migrations.AlterField(
            model_name='recurringpayment',
            name='interval',
            field=models.CharField(choices=[('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly'), ('yearly', 'Yearly')], default='monthly', max_length=50),
        ),
        migrations.CreateModel(
            name='PaymentMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_type', models.CharField(choices=[('credit_card', 'Credit Card'), ('debit_card', 'Debit Card'), ('bank_account', 'Bank Account'), ('paypal', 'PayPal'), ('other', 'Other')], default='credit_card', max_length=20)),
                ('account_number', models.CharField(max_length=16)),
                ('expiration_date', models.DateField(blank=True, null=True)),
                ('is_default', models.BooleanField(default=False)),
                ('cardholder_name', models.CharField(blank=True, max_length=100, null=True)),
                ('bank_name', models.CharField(blank=True, max_length=100, null=True)),
                ('billing_address', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payment_methods', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='recurringpayment',
            name='payment_method',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='jzj.paymentmethod'),
        ),
    ]
