from django.contrib import admin
from .models import Account, Transaction, Category, Goal, TaxRecord, FinancialInstitution
from .models import Budget, Investment, Loan, Bill, Profile, Notification

admin.site.register(Account)
admin.site.register(Transaction)
admin.site.register(Category)
admin.site.register(Budget)
admin.site.register(Investment)
admin.site.register(Loan)
admin.site.register(Bill)
admin.site.register(Profile)
admin.site.register(Goal)
admin.site.register(Notification)
admin.site.register(TaxRecord)
admin.site.register(FinancialInstitution)
