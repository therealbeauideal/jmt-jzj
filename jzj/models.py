from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils.text import slugify

class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length= 200, null=True)
    email = models.EmailField(max_length=50, unique=True, null=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    ACCOUNT_TYPES = (('checkings','Checkings'), ('savings','Savings'),
                     ('money market', 'Money Market'), ('certificates of deposits', 'Certificates of Deposits'),
                     ('brokerage', 'Brokerage'), ('retirement','Retirement'), ('business checkings','Business Checkings'),
                     ('business savings', 'Business Savings'), ('health savings','Health Savings'), 
                     ('education savings','Education Savings'), ('joint','Joint'), ('trust','Trust'), ('estodial','Estodial'),)
    account_type = models.CharField(max_length= 36, choices=ACCOUNT_TYPES, default='checkings')
    ACCOUNT_STATUSES = (('active','Active'), ('inactive','Inactive'),
                        ('suspended','Suspended'),('closed', 'Closed'),)
    account_status = models.CharField(max_length=15, choices= ACCOUNT_STATUSES, default='active')
    account_number = models.CharField(max_length=17, unique=True, null=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    balance = models.DecimalField(default=0, max_digits=8, decimal_places=2)
    CURRENCIES = (('USD','US Dollar'),('EUR','Euro'), ('GBD','Great British Pound/British Pound Sterling'),
                  ('JPY','Japanese Yen'), ('CNY','Chinese Yuan'), ('CAD', 'Canadian Dollar'), ('CAD','Canadian Dollar'),
                  ('AUD', 'Australian Dollar'), ('INR','Indian Rupee'), ('CHF', 'Swiss Franc'), ('ZAR', 'South African Rand'),
                  ('MXN', 'Mexican Peso'), ('BRL', 'Brazilian Real'), ('KRW', 'South Korean WON'), ('RUB', 'Russian Ruble'),
                  ('SAR', 'Saudi Riyal'), ('NGN', 'Nigerian Naira'), ('SGD', 'Singapore Dollaer'), ('PHP', 'Philippine Peso'),
                  ('XOF', 'West African CFA Franc'), ('XAF', 'Central African CFA Franc'), ('XCD', 'Eastern Caribbean Dollar'))
    currency = models.CharField(max_length=3, choices=CURRENCIES, default='USD')
    description = models.CharField(max_length=5000, blank=True, null=True)
    routing_number = models.CharField(max_length=10, unique=True, null=True)

    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Account, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.account_type} - {self.account_number}"
    
class Transaction(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length= 200, null=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    balance_after_transaction = models.DecimalField(max_digits=17, decimal_places=2,blank=True, null=True)
    CURRENCIES = (('USD','US Dollar'),('EUR','Euro'), ('GBD','Great British Pound/British Pound Sterling'),
                  ('JPY','Japanese Yen'), ('CNY','Chinese Yuan'), ('CAD', 'Canadian Dollar'), ('CAD','Canadian Dollar'),
                  ('AUD', 'Australian Dollar'), ('INR','Indian Rupee'), ('CHF', 'Swiss Franc'), ('ZAR', 'South African Rand'),
                  ('MXN', 'Mexican Peso'), ('BRL', 'Brazilian Real'), ('KRW', 'South Korean WON'), ('RUB', 'Russian Ruble'),
                  ('SAR', 'Saudi Riyal'), ('NGN', 'Nigerian Naira'), ('SGD', 'Singapore Dollaer'), ('PHP', 'Philippine Peso'),
                  ('XOF', 'West African CFA Franc'), ('XAF', 'Central African CFA Franc'), ('XCD', 'Eastern Caribbean Dollar'))
    currency = models.CharField(max_length=3, choices=CURRENCIES, default='USD')
    description = models.CharField(max_length=5000, blank=True, null=True)
    transaction_number = models.CharField(max_length=17, unique=True, null=True, blank=True)
    TRANSACTION_TYPES = (('deposit','Deposit'), ('direct_deposit', 'Direct Deposit'), ('refund','Refund'),
                         ('withdrawal','Withdrawal'), ('payment','Payment'), ('purchase','Purchase'),
                         ('fee','Fee'), ('internal_transfer','Internal Transfer'), ('external_transfer','External Transfer'),
                         ('p2p_transfer', 'P2P Transfer'), ('reversal','Reversal'), ('loan_disbursement', 'Loan Disbursment'),
                         ('loan_payment', 'Loan Payment'), ('buy','Buy'), ('sell','Sell'), ('dividend', 'Dividend'),
                         ('recurring_payment','Recurring Payment'), ('automatic_transfer','Automatic Transfer'))
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES, default='deposit')
    PAYMENT_METHOD = (('cash', 'Cash'), ('check', 'Check'), ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'), ('prepaid_card', 'Prepaid Card'), ('bank_transfer', 'Bank Transfer'),
        ('direct_debit', 'Direct Debit'), ('standing_order', 'Standing Order'), ('paypal', 'PayPal'),
        ('stripe', 'Stripe'), ('square', 'Square'), ('apple_pay', 'Apple Pay'), ('google_pay', 'Google Pay'),
        ('samsung_pay', 'Samsung Pay'), ('mobile_payment', 'Mobile Payment (Carrier Billing)'),
        ('venmo', 'Venmo'),  ('zelle', 'Zelle'), ('bitcoin', 'Bitcoin'), ('ethereum', 'Ethereum'),
        ('litecoin', 'Litecoin'), ('other_crypto', 'Other Cryptocurrencies'), ('nfc_payment', 'NFC Payment'),
        ('tap_and_pay', 'Tap and Pay'), ('klarna', 'Klarna'), ('afterpay', 'Afterpay'), ('affirm', 'Affirm'),
        ('p2p_payment', 'Peer-to-Peer Payment'), ('gift_card', 'Gift Card'), ('voucher', 'Voucher'), ('e_check', 'E-Check'),
        ('money_order', 'Money Order'), ('western_union', 'Western Union'), ('postal_order', 'Postal Order'),)
    payment_method = models.CharField(max_length=25, choices=PAYMENT_METHOD, default='cash')
    TRANSACTION_STATUS =(('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed'),
        ('canceled', 'Canceled'), ('reversed', 'Reversed'), ('refunded', 'Refunded'), ('in_progress', 'In Progress'),
        ('on_hold', 'On Hold'), ('authorized', 'Authorized'), ('settled', 'Settled'), ('disputed', 'Disputed'),
        ('expired', 'Expired'), ('processing', 'Processing'), ('scheduled', 'Scheduled'), ('partially_completed', 'Partially Completed'),
        ('awaiting_approval', 'Awaiting Approval'), ('declined', 'Declined'), ('chargeback', 'Chargeback'),
        ('queued', 'Queued'), ('voided', 'Voided'), ('manual_review', 'Manual Review'), ('reattempt', 'Reattempt'),)
    transaction_status = models.CharField(max_length=21, choices=TRANSACTION_STATUS, default='pending' )

    def __str__(self):
        return f"{self.transaction_type} - {self.amount} - {self.transaction_status} - {self.transaction_number}"


class Category(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    description = models.CharField(max_length=5000, blank=True, null=True)

class Budget(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2, null=True)

class Investment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    
    INVESTMENT_TYPE = [
        ('Stocks', 'Equities'),
        ('Bonds', 'Fixed Income'),
        ('Real Estate', 'Real Estate'),
        ('Mutual Funds', 'Mutual Funds'),
        ('ETFs', 'Exchange-Traded Funds'),
        ('Commodities', 'Commodities'),
        ('Cryptocurrencies', 'Cryptocurrencies'),
        ('Derivatives', 'Derivatives'),
        ('Private Equity', 'Private Equity and Venture Capital'),
        ('Hedge Funds', 'Hedge Funds'),
        ('Collectibles', 'Collectibles'),
        ('Savings', 'Savings')
    ]
    investment_type = models.CharField(max_length=50, choices=INVESTMENT_TYPE, default='Stocks')
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    date_invested = models.DateField( blank=True, null=True)
    current_value = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.user}'s {self.investment_type} investment"
    
class Loan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    LOAN_TYPE = [('personal','Personal'), ('home','Home'), ('student','Student'),
                 ('auto','Auto'), ('business','Business'), ('payday','Payday'),
                 ('credit builder', 'Credit Builder'), ('agricultural', 'Agricultural'), 
                 ('other','Other')]
    loan_type = models.CharField(max_length=60, choices=LOAN_TYPE, default= 'personal')
    principal_amount = models.DecimalField(max_digits=50, decimal_places=2, blank=True, null=True)
    current_balance = models.DecimalField(max_digits=50, decimal_places=2, blank=True, null=True)
    interest_rate = models.DecimalField(max_digits=50, decimal_places=2, blank=True, null=True)
    late_fee = models.DecimalField(max_digits=50, decimal_places=2, blank=True, null=True)
    payment_due_date = models.DateField(blank=True, null=True)
    last_payment_date = models.DateField(blank=True, null=True)
    STATUSES = [('application stage','Application Stage'), ('funding stage','Funding Stage'), ('repayment stage','Repayment Stage'),
                ('deliquency stage', 'Deliquency Stage'), ('final stage', 'Final Stage')]
    status = models.CharField(max_length=60, choices= STATUSES, default='application stage')

class Bill(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=32, decimal_places=2, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    STATUSES = [('creation and processing stage','Creation and Processing Stage'), ('billing and nofitified stage', 'Billing and Nofitified Stage'),
                ('payment stage', 'Payment Stage'), ('late and collection stage', 'Late and Collection Stage'), ('adjustment and finalization stage', 'Adjustment and Finaliztion Stage'),
                ('closed', 'Closed')]
    status = models.CharField(max_length=36, choices=STATUSES, default='creation and processing stage')
    due_date = models.DateTimeField(blank=True, null=True)

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    bio = models.CharField(max_length=300, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    phone_number = models.CharField(max_length=20,blank=True, null=True)
    address = models.CharField(max_length=400, blank=True, null= True)
    dob = models.DateField(blank=True, null=True)
    occupation = models.CharField(max_length=4000, blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.user}'s Profile"
    
class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=5000, blank=True, null=True)
    target_amount = models.DecimalField(max_digits=50, decimal_places=2, blank=True, null=True)
    current_amount = models.DecimalField(max_digits=50, decimal_places=2, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    PRIORITIES = [('low','Low'), ('medium','Medium'), ('high','High')]
    priorities = models.CharField(max_length=15, choices=PRIORITIES, default='low')

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    message = models.CharField(max_length=5000, blank=True, null=True)
    expiry_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

class TaxRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=500, blank=True, null=True)
    tax_year = models.IntegerField(blank=True, null=True)
    income_amount = models.DecimalField(max_digits=50,decimal_places=2, blank=True, null=True)
    deductions = models.DecimalField(max_digits=50, decimal_places=2, blank=True, null=True)
    tax_paid = models.DecimalField(max_digits=50,decimal_places=2, blank=True, null=True)
    tax_owed = models.DecimalField(max_digits=50, decimal_places=2, blank=True, null=True)
    refunded_amount = models.DecimalField(max_digits=50,decimal_places=2, blank=True, null=True)
    submission_date = models.DateField(blank=True, null=True)
    attatchments = models.FileField(blank=True, null=True)
    FILING_STATUS_CHOICES = [
        ('SINGLE', 'Single'),
        ('MARRIED_FILING_JOINTLY', 'Married Filing Jointly'),
        ('MARRIED_FILING_SEPARATELY', 'Married Filing Separately'),
        ('HEAD_OF_HOUSEHOLD', 'Head of Household'),
        ('QUALIFYING_WIDOWER', 'Qualifying Widow(er) with Dependent Child'),
    ]
    tax_filing_status = models.CharField(max_length=50, choices=FILING_STATUS_CHOICES, default='SINGLE')
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('SUBMITTED', 'Submitted'),
        ('UNDER_REVIEW', 'Under Review'),
        ('PENDING_APPROVAL', 'Pending Approval'),
        ('FILED', 'Filed'),
        ('PROCESSING', 'Processing'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
        ('AMENDED', 'Amended'),
        ('COMPLETED', 'Completed'),
        ('ARCHIVED', 'Archived'),
    ]
    status = models.CharField(max_length=80, choices=STATUS_CHOICES, default='DRAFT')
    TAX_FORM_CHOICES = [
        ('FORM_1040', '1040 - U.S. Individual Income Tax Return'),
        ('FORM_1040A', '1040A - U.S. Individual Income Tax Return (Short Form)'),
        ('FORM_1040EZ', '1040EZ - U.S. Individual Income Tax Return (Simplified)'),
        ('FORM_1065', '1065 - U.S. Return of Partnership Income'),
        ('FORM_1120', '1120 - U.S. Corporation Income Tax Return'),
        ('FORM_1120S', '1120S - U.S. Income Tax Return for an S Corporation'),
        ('FORM_1099', '1099 - Miscellaneous Income'),
        ('FORM_W2', 'W2 - Wage and Tax Statement'),
        ('FORM_990', '990 - Return of Organization Exempt from Income Tax'),
        ('FORM_706', '706 - United States Estate (and Generation-Skipping Transfer) Tax Return'),
    ]
    tax_form = models.CharField(max_length=90,choices=TAX_FORM_CHOICES,default='FORM_1040')
    STATE_CHOICES = [('AL', 'Alabama'),('AK', 'Alaska'),('AZ', 'Arizona'),
        ('AR', 'Arkansas'),('CA', 'California'),('CO', 'Colorado'),('CT', 'Connecticut'),
        ('DE', 'Delaware'),('DC', 'District of Columbia'),('FL', 'Florida'),('GA', 'Georgia'),
        ('HI', 'Hawaii'),('ID', 'Idaho'),('IL', 'Illinois'),('IN', 'Indiana'),('IA', 'Iowa'),
        ('KS', 'Kansas'),('KY', 'Kentucky'),('LA', 'Louisiana'),('ME', 'Maine'),('MD', 'Maryland'),
        ('MA', 'Massachusetts'),('MI', 'Michigan'),('MN', 'Minnesota'),('MS', 'Mississippi'),
        ('MO', 'Missouri'),('MT', 'Montana'),('NE', 'Nebraska'),('NV', 'Nevada'),('NH', 'New Hampshire'),
        ('NJ', 'New Jersey'),('NM', 'New Mexico'),('NY', 'New York'),('NC', 'North Carolina'),('ND', 'North Dakota'),
        ('OH', 'Ohio'),('OK', 'Oklahoma'),('OR', 'Oregon'),('PA', 'Pennsylvania'),('RI', 'Rhode Island'),('SC', 'South Carolina'),
        ('SD', 'South Dakota'),('TN', 'Tennessee'),('TX', 'Texas'),('UT', 'Utah'),('VT', 'Vermont'),('VA', 'Virginia'),
        ('WA', 'Washington'),('WV', 'West Virginia'),('WI', 'Wisconsin'),('WY', 'Wyoming'),
    ]
    state = models.CharField(max_length=2, choices=STATE_CHOICES, default='CO')

class FinancialInstitution(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    institution_name = models.CharField(max_length=255, blank=True, null=True)
    choices=[('BANK', 'Bank'),('CREDIT_UNION', 'Credit Union'),('INSURANCE_COMPANY', 'Insurance Company'),
            ('INVESTMENT_FIRM', 'Investment Firm'),('MUTUAL_FUND', 'Mutual Fund'),('BROKERAGE', 'Brokerage'),
            ('OTHER', 'Other'),]  
    institution_type = models.CharField(max_length=50, choices=choices, default='BANK')  
    address_line_1 = models.CharField(max_length=255, blank=True, null=True)  
    address_line_2 = models.CharField(max_length=255, blank=True, null=True) 
    city = models.CharField(max_length=100, blank=True, null=True) 
    state = models.CharField(max_length=100, blank=True, null=True)  
    postal_code = models.CharField(max_length=20, blank=True, null=True)  
    country = models.CharField(max_length=100, blank=True, null=True)  
    phone_number = models.CharField(max_length=20, blank=True, null=True) 
    email = models.EmailField(blank=True, null=True)  
    website = models.URLField(blank=True, null=True) 

class CheckoutSessionRecord(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, help_text="The user who initiated the checkout."
    )
    stripe_customer_id = models.CharField(max_length=255)
    stripe_checkout_session_id = models.CharField(max_length=255)
    stripe_price_id = models.CharField(max_length=255)
    has_access = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)