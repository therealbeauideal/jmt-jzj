from django.contrib.auth.decorators import login_required
from .forms import CreateUserForm, LoginForm
# - Authentication models and functions
from rest_framework import generics
from django.contrib import auth
from django.contrib.auth import authenticate

from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.generic.edit import UpdateView

from .models import Account, Transaction, Category, Budget, Investment, Loan
from .models import Bill, Profile, Goal, Notification, TaxRecord, FinancialInstitution

from .serializers import AccountSerializer, TransactionSerializer, CategorySerializer, BudgetSerializer, InvestmentSerializer
from .serializers import LoanSerializer, BillSerializer, ProfileSerializer, GoalSerializer, NotificationSerializer
from .serializers import TaxRecordSerializer, FinancialInstitutionSerializer

import os
import json
from django.shortcuts import render, redirect, reverse
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

import stripe
from django.contrib.auth import login
from django.contrib.auth.models import User
from . import models


DOMAIN = "http://localhost:8000"  
stripe.api_key = os.environ['STRIPE_SECRET_KEY']


def subscribe(request) -> HttpResponse:
    
    user, created = User.objects.get_or_create(
        username='AlexG', email="alexg@example.com"
    )
    if created:
        user.set_password('password')
        user.save()
    login(request, user)
    request.user = user

    return render(request, 'subscribe.html')


def cancel(request) -> HttpResponse:
    return render(request, 'cancel.html')


def success(request) -> HttpResponse:

    print(f'{request.session = }')

    stripe_checkout_session_id = request.GET['session_id']

    return render(request, 'success.html')


def create_checkout_session(request) -> HttpResponse:
    price_lookup_key = request.POST['price_lookup_key']
    try:
        prices = stripe.Price.list(lookup_keys=[price_lookup_key], expand=['data.product'])
        price_item = prices.data[0]

        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {'price': price_item.id, 'quantity': 1},
                
            ],
            mode='subscription',
            success_url=DOMAIN + reverse('success') + '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=DOMAIN + reverse('cancel')
        )

        
        models.CheckoutSessionRecord.objects.create(
            user=request.user,
            stripe_checkout_session_id=checkout_session.id,
            stripe_price_id=price_item.id,
        )

        return redirect(
            checkout_session.url,  
            code=303
        )
    except Exception as e:
        print(e)
        return HttpResponse("Server error", status=500)


def direct_to_customer_portal(request) -> HttpResponse:
   
    
    checkout_record = models.CheckoutSessionRecord.objects.filter(
        user=request.user
    ).last()  

    checkout_session = stripe.checkout.Session.retrieve(checkout_record.stripe_checkout_session_id)

    portal_session = stripe.billing_portal.Session.create(
        customer=checkout_session.customer,
        return_url=DOMAIN + reverse('subscribe')  
    )
    return redirect(portal_session.url, code=303)


@csrf_exempt
def collect_stripe_webhook(request) -> JsonResponse:
    
    webhook_secret = os.environ.get('STRIPE_WEBHOOK_SECRET')
    signature = request.META["HTTP_STRIPE_SIGNATURE"]
    payload = request.body

    try:
        event = stripe.Webhook.construct_event(
            payload=payload, sig_header=signature, secret=webhook_secret
        )
    except ValueError as e:  # Invalid payload.
        raise ValueError(e)
    except stripe.error.SignatureVerificationError as e:  # Invalid signature
        raise stripe.error.SignatureVerificationError(e)

    _update_record(event)

    return JsonResponse({'status': 'success'})


def _update_record(webhook_event) -> None:
   
    data_object = webhook_event['data']['object']
    event_type = webhook_event['type']

    if event_type == 'checkout.session.completed':
        checkout_record = models.CheckoutSessionRecord.objects.get(
            stripe_checkout_session_id=data_object['id']
        )
        checkout_record.stripe_customer_id = data_object['customer']
        checkout_record.has_access = True
        checkout_record.save()
        print('🔔 Payment succeeded!')
    elif event_type == 'customer.subscription.created':
        print('🎟️ Subscription created')
    elif event_type == 'customer.subscription.updated':
        print('✍️ Subscription updated')
    elif event_type == 'customer.subscription.deleted':
        checkout_record = models.CheckoutSessionRecord.objects.get(
            stripe_customer_id=data_object['customer']
        )
        checkout_record.has_access = False
        checkout_record.save()
        print('✋ Subscription canceled: %s', data_object.id)



def homepage(request):

    return render(request, 'jzj/index.html')





def register(request):

    form = CreateUserForm()

    if request.method == "POST":

        form = CreateUserForm(request.POST)

        if form.is_valid():

            form.save()

            return redirect("my-login")


    context = {'registerform':form}


    return render(request, 'jzj/register.html', context=context)


def my_login(request):

    form = LoginForm()
    
    if request.method == 'POST':

        form = LoginForm(request, data=request.POST)

        if form.is_valid():

            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:

                auth.login(request, user)

                return redirect("dashboard")

    context = {'loginform':form}


    return render(request, 'jzj/my-login.html',context=context)


def user_logout(request):

    auth.logout(request)

    return redirect("")

#Account API
class AccountListCreateView(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class AccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    lookup_field = 'account_number'

#Transaction API
class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'id'

#Category API
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'id'

#BUDGET API
class BudgetListCreateView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

class BudgetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    lookup_field = 'id'

#INVESTMENT API
class InvestmentListCreateView(generics.ListCreateAPIView):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer

class InvestmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    lookup_field = 'id'

#LOAN API
class LoanListCreateView(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

class LoanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    lookup_field = 'id'

#LOAN API
class BillListCreateView(generics.ListCreateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer

class BillDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    lookup_field = 'id'

#LOAN API
class ProfileListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'id'

#GOAL API
class GoalListCreateView(generics.ListCreateAPIView):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

class GoalDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    lookup_field = 'id'

#NOTIFICATION API
class NotificationListCreateView(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class NotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_field = 'id'

#TAX RECORD API
class TaxRecordListCreateView(generics.ListCreateAPIView):
    queryset = TaxRecord.objects.all()
    serializer_class = TaxRecordSerializer

class TaxRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TaxRecord.objects.all()
    serializer_class = TaxRecordSerializer
    lookup_field = 'id'

#FINANCIAL INSTITUTION API
class FinancialInstitutionListCreateView(generics.ListCreateAPIView):
    queryset = FinancialInstitution.objects.all()
    serializer_class = FinancialInstitutionSerializer

class FinancialInstitutionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FinancialInstitution.objects.all()
    serializer_class = FinancialInstitutionSerializer
    lookup_field = 'id'


@login_required(login_url="my-login")
def dashboard(request):

    return render(request, 'jzj/dashboard.html')
