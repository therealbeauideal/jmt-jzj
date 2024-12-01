# Generated by Django 5.1.1 on 2024-10-18 02:17

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jzj', '0006_account_created_at_account_updated_at'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='budget',
            old_name='period_end',
            new_name='end_date',
        ),
        migrations.RenameField(
            model_name='budget',
            old_name='period_start',
            new_name='start_date',
        ),
        migrations.RenameField(
            model_name='recurringpayment',
            old_name='frequency',
            new_name='interval',
        ),
        migrations.RemoveField(
            model_name='account',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='account',
            name='name',
        ),
        migrations.RemoveField(
            model_name='account',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='recurringpayment',
            name='description',
        ),
        migrations.RemoveField(
            model_name='recurringpayment',
            name='user',
        ),
        migrations.RemoveField(
            model_name='transaction',
            name='category',
        ),
        migrations.RemoveField(
            model_name='transaction',
            name='type',
        ),
        migrations.AddField(
            model_name='account',
            name='account_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='account_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='account',
            name='account_number',
            field=models.CharField(default='000000', max_length=100),
        ),
        migrations.AddField(
            model_name='account',
            name='account_pin',
            field=models.CharField(blank=True, max_length=4, null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='account_status',
            field=models.CharField(default='active', max_length=20),
        ),
        migrations.AddField(
            model_name='account',
            name='available_balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=15),
        ),
        migrations.AddField(
            model_name='account',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_accounts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='account',
            name='currency',
            field=models.CharField(default='USD', max_length=3),
        ),
        migrations.AddField(
            model_name='account',
            name='initial_balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=15),
        ),
        migrations.AddField(
            model_name='account',
            name='interest_rate',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='account',
            name='is_default',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='account',
            name='is_joint_account',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='account',
            name='is_overdrawn',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='account',
            name='last_modified_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='modified_accounts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='account',
            name='overdraft_limit',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='account',
            name='two_factor_enabled',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='category',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='recurringpayment',
            name='account',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='recurring_payments', to='jzj.account'),
        ),
        migrations.AddField(
            model_name='recurringpayment',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='transaction',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed'), ('canceled', 'Canceled'), ('reversed', 'Reversed'), ('on hold', 'On hold'), ('refunded', 'Refunded'), ('declined', 'Declined'), ('authorized', 'Authorized'), ('in progress', 'In progress'), ('expired', 'expired')], default='pending', max_length=11),
        ),
        migrations.AddField(
            model_name='transaction',
            name='transaction_type',
            field=models.CharField(default='expense', max_length=11),
        ),
        migrations.AlterField(
            model_name='account',
            name='account_type',
            field=models.CharField(choices=[('savings', 'Savings'), ('checking', 'Checking'), ('investment', 'Investment'), ('credit', 'Credit')], max_length=50),
        ),
        migrations.AlterField(
            model_name='account',
            name='balance',
            field=models.DecimalField(decimal_places=2, max_digits=15),
        ),
        migrations.AlterField(
            model_name='account',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='budget',
            name='amount',
            field=models.DecimalField(decimal_places=2, max_digits=12),
        ),
        migrations.AlterField(
            model_name='budget',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='recurringpayment',
            name='amount',
            field=models.DecimalField(decimal_places=2, max_digits=12),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='account',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='jzj.account'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='amount',
            field=models.DecimalField(decimal_places=2, max_digits=12),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
