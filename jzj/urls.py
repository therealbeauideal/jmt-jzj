from django.urls import path
from .import views
from .views import AccountDetailView, AccountListCreateView
from .views import TransactionListCreateView
from .views import CategoryListCreateView, CategoryDetailView, BudgetDetailView, BudgetListCreateView
from .views import InvestmentDetailView, InvestmentListCreateView, LoanDetailView, LoanListCreateView
from .views import BillDetailView, BillListCreateView, ProfileDetailView, ProfileListCreateView
from .views import GoalDetailView, GoalListCreateView, NotificationDetailView, NotificationListCreateView
from .views import TaxRecordDetailView, TaxRecordListCreateView, FinancialInstitutionDetailView, FinancialInstitutionListCreateView
from .views import TransactionDetailView




urlpatterns = [

    path('', views.homepage, name=""),

    path('register', views.register, name="register"),

    path('my-login', views.my_login, name="my-login"),

    path('dashboard', views.dashboard, name="dashboard"),

    path('user-logout', views.user_logout, name="user-logout"),

    path('subscribe/', views.subscribe, name='subscribe'),

    path('cancel/', views.cancel, name='cancel'),

    path('success/', views.success, name='success'),

    path('create-checkout-session/', views.create_checkout_session, name='create-checkout-session'),

    path('direct-to-customer-portal/', views.direct_to_customer_portal, name='direct-to-customer-portal'),

    path('collect-stripe-webhook/', views.collect_stripe_webhook, name='collect-stripe-webhook'),

    path('accounts/', AccountListCreateView.as_view(), name='account-list-create'),

    path('accounts/<str:account_number>/', AccountDetailView.as_view(), name='account-detail'),

    path('transactions/', TransactionListCreateView.as_view(), name='transaction-list-create'),

    path('transactions/<int:id>/', TransactionDetailView.as_view(), name='transaction-detail'),

    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),

    path('categories/<int:id>/', CategoryDetailView.as_view(), name='category-detail'),

    path('budgets/', BudgetListCreateView.as_view(), name='budget-list-create'),

    path('budgets/<int:id>/', BudgetDetailView.as_view(), name='budget-detail'),

    path('investments/', InvestmentListCreateView.as_view(), name='investment-list-create'),

    path('investments/<int:id>/', InvestmentDetailView.as_view(), name='investment-detail'),

    path('loans/', LoanListCreateView.as_view(), name='loan-list-create'),

    path('loans/<int:id>/', LoanDetailView.as_view(), name='loan-detail'),

    path('bills/', BillListCreateView.as_view(), name='bill-list-create'),

    path('bills/<int:id>/', BillDetailView.as_view(), name='bill-detail'),

    path('profiles/', ProfileListCreateView.as_view(), name='profile-list-create'),

    path('profiles/<int:id>/', ProfileDetailView.as_view(), name='profile-detail'),

    path('goals/', GoalListCreateView.as_view(), name='goal-list-create'),

    path('goals/<int:id>/', GoalDetailView.as_view(), name='goal-detail'),

    path('notifications/', NotificationListCreateView.as_view(), name='notification-list-create'),

    path('notifications/<int:id>/', NotificationDetailView.as_view(), name='notification-detail'),

    path('tax_records/', TaxRecordListCreateView.as_view(), name='tax_record-list-create'),

    path('tax_records/<int:id>/', TaxRecordDetailView.as_view(), name='tax_record-detail'),

    path('financial_institutions/', FinancialInstitutionListCreateView.as_view(), name='financial_institution-list-create'),

    path('financial_institutions/<int:id>/', FinancialInstitutionDetailView.as_view(), name='financial_institution-detail'),

]
    