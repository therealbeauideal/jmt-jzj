# Generated by Django 5.1.1 on 2024-10-23 04:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jzj', '0016_remove_account_updated_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=15, null=True)),
                ('balance_after_transaction', models.DecimalField(decimal_places=2, max_digits=17)),
                ('currency', models.CharField(choices=[('USD', 'US Dollar'), ('EUR', 'Euro'), ('GBD', 'Great British Pound/British Pound Sterling'), ('JPY', 'Japanese Yen'), ('CNY', 'Chinese Yuan'), ('CAD', 'Canadian Dollar'), ('CAD', 'Canadian Dollar'), ('AUD', 'Australian Dollar'), ('INR', 'Indian Rupee'), ('CHF', 'Swiss Franc'), ('ZAR', 'South African Rand'), ('MXN', 'Mexican Peso'), ('BRL', 'Brazilian Real'), ('KRW', 'South Korean WON'), ('RUB', 'Russian Ruble'), ('SAR', 'Saudi Riyal'), ('NGN', 'Nigerian Naira'), ('SGD', 'Singapore Dollaer'), ('PHP', 'Philippine Peso'), ('XOF', 'West African CFA Franc'), ('XAF', 'Central African CFA Franc'), ('XCD', 'Eastern Caribbean Dollar')], default='USD', max_length=3)),
                ('description', models.CharField(blank=True, max_length=5000, null=True)),
                ('transaction_type', models.CharField(choices=[('deposit', 'Deposit'), ('direct_deposit', 'Direct Deposit'), ('refund', 'Refund'), ('withdrawal', 'Withdrawal'), ('payment', 'Payment'), ('purchase', 'Purchase'), ('fee', 'Fee'), ('internal_transfer', 'Internal Transfer'), ('external_transfer', 'External Transfer'), ('p2p_transfer', 'P2P Transfer'), ('reversal', 'Reversal'), ('loan_disbursement', 'Loan Disbursment'), ('loan_payment', 'Loan Payment'), ('buy', 'Buy'), ('sell', 'Sell'), ('dividend', 'Dividend'), ('recurring_payment', 'Recurring Payment'), ('automatic_transfer', 'Automatic Transfer')], default='deposit', max_length=20)),
                ('payment_method', models.CharField(choices=[('cash', 'Cash'), ('check', 'Check'), ('credit_card', 'Credit Card'), ('debit_card', 'Debit Card'), ('prepaid_card', 'Prepaid Card'), ('bank_transfer', 'Bank Transfer'), ('direct_debit', 'Direct Debit'), ('standing_order', 'Standing Order'), ('paypal', 'PayPal'), ('stripe', 'Stripe'), ('square', 'Square'), ('apple_pay', 'Apple Pay'), ('google_pay', 'Google Pay'), ('samsung_pay', 'Samsung Pay'), ('mobile_payment', 'Mobile Payment (Carrier Billing)'), ('venmo', 'Venmo'), ('zelle', 'Zelle'), ('bitcoin', 'Bitcoin'), ('ethereum', 'Ethereum'), ('litecoin', 'Litecoin'), ('other_crypto', 'Other Cryptocurrencies'), ('nfc_payment', 'NFC Payment'), ('tap_and_pay', 'Tap and Pay'), ('klarna', 'Klarna'), ('afterpay', 'Afterpay'), ('affirm', 'Affirm'), ('p2p_payment', 'Peer-to-Peer Payment'), ('gift_card', 'Gift Card'), ('voucher', 'Voucher'), ('e_check', 'E-Check'), ('money_order', 'Money Order'), ('western_union', 'Western Union'), ('postal_order', 'Postal Order')], default='cash', max_length=25)),
                ('transaction_status', models.CharField(choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed'), ('canceled', 'Canceled'), ('reversed', 'Reversed'), ('refunded', 'Refunded'), ('in_progress', 'In Progress'), ('on_hold', 'On Hold'), ('authorized', 'Authorized'), ('settled', 'Settled'), ('disputed', 'Disputed'), ('expired', 'Expired'), ('processing', 'Processing'), ('scheduled', 'Scheduled'), ('partially_completed', 'Partially Completed'), ('awaiting_approval', 'Awaiting Approval'), ('declined', 'Declined'), ('chargeback', 'Chargeback'), ('queued', 'Queued'), ('voided', 'Voided'), ('manual_review', 'Manual Review'), ('reattempt', 'Reattempt')], default='pedning', max_length=21)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jzj.account')),
            ],
        ),
    ]
