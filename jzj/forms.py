
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django import forms
from .models import Account, Transaction, Category, Budget, Investment, Loan, Bill, Profile, Goal, Notification, TaxRecord, FinancialInstitution
from django.forms.widgets import PasswordInput, TextInput


# - Create/Register a user (Model Form)

class CreateUserForm(UserCreationForm):

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


# - Authenticate a user (Model Form)

class LoginForm(AuthenticationForm):

    username = forms.CharField(widget=TextInput())
    password = forms.CharField(widget=PasswordInput())

class AccountForm(forms.ModelForm):
    class Meta:
        model = Account
        fields =['user','name','email','slug','account_type','account_status',
                 'account_number', 'amount','balance','currency','description',
                 'routing_number']

class TransactionForm(forms.ModelForm):
    class Meta:
        model = Transaction
        fields = ['id','user', 'amount', 'balance_after_transaction',
                  'currency', 'description','transaction_number', 'transaction_type', 'payment_method', 'transaction_status']
        
class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name','id', 'description','user']

class BudgetForm(forms.ModelForm):
    class Meta:
        model = Budget
        fields = ['category','amount','name']

class InvestmentForm(forms.ModelForm):
    class Meta:
        model = Investment
        fields = ['name', 'investment_type','amount','user', 'date_invested', 'current_value']

class LoanForm(forms.ModelForm):
    class Meta:
        model = Loan
        fields = ['user', 'name', 'loan_type', 'current_balance', 'interest_rate', 'payment_due_date', 'late_fee', 'last_payment_date', 'status']

class BillForm(forms.ModelForm):
    class Meta:
        model = Bill
        fields = ['name','amount','category','status','due_date']

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['user', 'bio', 'dob', 'profile_picture','phone_number','occupation','website','address']

class GoalForm(forms.ModelForm):
    class Meta:
        model = Goal
        fields = ['user', 'name', 'description', 'target_amount', 'current_amount', 'start_date', 'end_date', 'priorities']

class NotificationForm(forms.ModelForm):
    class Meta:
        model = Notification
        fields = ['user','name','message','expiry_date','created_at']

class TaxRecordForm(forms.ModelForm):
    class Meta:
        model = TaxRecord
        fields = ['user','name','tax_year','income_amount','deductions','tax_paid','tax_owed','refunded_amount','tax_filing_status'
                  ,'submission_date','attatchments','status','tax_form','state']

class FinancialInstitutionForm(forms.ModelForm):
    class Meta:
        model = FinancialInstitution
        fields = ['name', 'institution_type','address_line_1','address_line_2','city'
                  ,'state','postal_code','country','phone_number','email','website','institution_name']
