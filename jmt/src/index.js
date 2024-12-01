import React from 'react';
import ReactDOM from 'react-dom/client';
import {Navbar, Footer} from './components/layout';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NotFound from './pages/NotFound';
import Home from './pages/home';
import TransactionList from './pages/admin/transaction/TransactionList';
import CreateTransaction from './pages/admin/transaction/CreateTransaction';
import Contact from './pages/Contact';
import EditTransaction from './pages/admin/transaction/EditTransaction';
import CategoryList from './pages/admin/category/CategoryList';
import CreateCategory from './pages/admin/category/CreateCategory';
import EditCategory from './pages/admin/category/EditCategory';
import BudgetList from './pages/admin/budget/BudgetList';
import CreateBudget from './pages/admin/budget/CreateBudget';
import EditBudget from './pages/admin/budget/EditBudget';
import InvestmentList from './pages/admin/investment/InvestmentList';
import CreateInvestment from './pages/admin/investment/CreateInvestment';
import EditInvestment from './pages/admin/investment/EditInvestment';
import LoanList from './pages/admin/loan/LoanList';
import CreateLoan from './pages/admin/loan/CreateLoan';
import EditLoan from './pages/admin/loan/EditLoan';
import BillList from './pages/admin/bill/BillList';
import CreateBill from './pages/admin/bill/CreateBill';
import EditBill from './pages/admin/bill/EditBill';
import GoalList from './pages/admin/goal/GoalList';
import CreateGoal from './pages/admin/goal/CreateGoal';
import EditGoal from './pages/admin/goal/EditGoal';
import TaxRecordList from './pages/admin/taxrecord/TaxRecordList';
import CreateTaxRecord from './pages/admin/taxrecord/CreateTaxRecord';
import EditTaxRecord from './pages/admin/taxrecord/EditTaxRecord';
import FinancialInstitutionList from './pages/admin/financialinstitution/FinancialInstitutionList';
import CreateFinancialInstituion from './pages/admin/financialinstitution/CreateFinancialInstitution';
import EditFinancialInstitution from './pages/admin/financialinstitution/EditFinancialInstitution';





function App(){
  return(
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin/transaction' element={<TransactionList />} />
        <Route path='/admin/transaction/create/' element={<CreateTransaction />} />
        <Route path='/admin/transaction/edit/' element={<EditTransaction />} />
        <Route path='/admin/transaction/edit/:id/' element={<EditTransaction />} />
        <Route path='/admin/category' element={<CategoryList/>} />
        <Route path='/admin/category/create/' element={<CreateCategory />} />
        <Route path='/admin/category/edit/' element={<EditCategory />} />
        <Route path='/admin/category/edit/:id/' element={<EditCategory />} />
        <Route path='admin/budget' element={<BudgetList/>} />
        <Route path='/admin/budget/create/' element={<CreateBudget />} />
        <Route path='/admin/budget/edit/' element={<EditBudget />} />
        <Route path='/admin/budget/edit/:id/' element={<EditBudget />} />
        <Route path='admin/investment' element={<InvestmentList/>} />
        <Route path='/admin/investment/create/' element={<CreateInvestment />} />
        <Route path='/admin/investment/edit/' element={<EditInvestment />} />
        <Route path='/admin/investment/edit/:id/' element={<EditInvestment />} />
        <Route path='admin/loan' element={<LoanList/>} />
        <Route path='/admin/loan/create/' element={<CreateLoan />} />
        <Route path='/admin/loan/edit/' element={<EditLoan />} />
        <Route path='/admin/loan/edit/:id/' element={<EditLoan />} />
        <Route path='admin/bill' element={<BillList/>} />
        <Route path='/admin/bill/create/' element={<CreateBill />} />
        <Route path='/admin/bill/edit/' element={<EditBill />} />
        <Route path='/admin/bill/edit/:id/' element={<EditBill />} />
        <Route path='admin/goal' element={<GoalList/>} />
        <Route path='/admin/goal/create/' element={<CreateGoal />} />
        <Route path='/admin/goal/edit/' element={<EditGoal />} />
        <Route path='/admin/goal/edit/:id/' element={<EditGoal />} />
        <Route path='admin/taxrecord' element={<TaxRecordList/>} />
        <Route path='/admin/taxrecord/create/' element={<CreateTaxRecord />} />
        <Route path='/admin/taxrecord/edit/' element={<EditTaxRecord />} />
        <Route path='/admin/taxrecord/edit/:id/' element={<EditTaxRecord />} />
        <Route path='admin/financialinstitution' element={<FinancialInstitutionList/>} />
        <Route path='/admin/financialinstitution/create/' element={<CreateFinancialInstituion />} />
        <Route path='/admin/financialinstitution/edit/' element={<EditFinancialInstitution />} />
        <Route path='/admin/financialinstitution/edit/:id/' element={<EditFinancialInstitution />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

