import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CreateTransaction() {

    const [validationErrors, setValidationErrors] = useState({})

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const Transaction = Object.fromEntries(formData.entries())

        if (!Transaction.name) {

                alert("Please fill the Name field")
                return
            }

            try {
                const token = '852de93b4848505296fb5fe56e41a6d1501adfca';


                const response = await fetch("http://127.0.0.1:8000/transactions/", {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json()

                if(response.ok){
                    //Transaction Created Correctly!
                    navigate('/admin/transaction')
                }
                else if (response.status === 400){
                    setValidationErrors(data)
                }
                else(
                    alert('Unable to create Transaction')
                )
            }
            catch(error) {
                alert('Unable to connect to the server')
            }
    }

    return(
        <div className="container my-4">
            <div className="row">
                <div className='col-md-8 mx-auto rounded border p-4'>
                    <h2 className= "text-center mb-5">Create Transaction</h2>


                    <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>ID</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='id'/>
                                <span className='text-danger'>{validationErrors.id}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Name</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='name'/>
                                <span className='text-danger'>{validationErrors.name}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Amount</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='amount'/>
                                <span className='text-danger'>{validationErrors.amount}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Balance After Transaction</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='balance_after_transaction'/>
                                <span className='text-danger'>{validationErrors.balance_after_transaction}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Transaction Number</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='transaction_number'/>
                                <span className='text-danger'>{validationErrors.transaction_number}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Description</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='description' rows= "4"/>
                                <span className='text-danger'>{validationErrors.description}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Currency</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='currency'>
                                    <option value='USD'>USD</option>
                                    <option value='EUR'>EUR</option>
                                    <option value='GBP'>GBP</option>
                                    <option value='JPY'>JPY</option>
                                    <option value='CNY'>CNY</option>
                                    <option value='CAD'>CAD</option>
                                    <option value='INR'>INR</option>
                                    <option value='CHF'>CHF</option>
                                    <option value='ZAR'>ZAR</option>
                                    <option value='MXN'>MXN</option>
                                    <option value='BRL'>BRL</option>
                                    <option value='KRW'>KRW</option>
                                    <option value='RUB'>RUB</option>
                                    <option value='SAR'>SAR</option>
                                    <option value='NGN'>NGN</option>
                                    <option value='SGD'>SGD</option>
                                    <option value='PHP'>PHP</option>
                                    <option value='BTC'>BTC</option>
                                    <option value='ETH'>ETH</option>
                                    <option value='USDT'>USDT</option>
                                    <option value='USDC'>USDC</option>
                                    <option value='BNB'>BNB</option>
                                    <option value='XRR'>XRR</option>
                                    <option value='LTC'>LTC</option>
                                    <option value='AUD'>AUD</option>
                                    <option value='SOL'>SOL</option>
                                    <option value='XMR'>XMR</option>
                                    <option value='XOF'>XOF</option>
                                    <option value='XAF'>XAF</option>
                                    <option value='XCD'>XCD</option>
                                </select>
                                <span className='text-danger'>{validationErrors.currency}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Transaction Type</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='transaction_type'>
                                    <option value='deposit'>Deposit</option>
                                    <option value='deposit'>Direct Deposit</option>
                                    <option value='deposit'>Refund</option>
                                    <option value='deposit'>Withdrawal</option>
                                    <option value='deposit'>Payment</option>
                                    <option value='deposit'>Purchase</option>
                                    <option value='deposit'>Fee</option>
                                    <option value='deposit'>Internal Transfer</option>
                                    <option value='deposit'>External Transfer</option>
                                    <option value='deposit'>P2P Transfer</option>
                                    <option value='deposit'>Reversal</option>
                                    <option value='deposit'>Loan Disbursement</option>
                                    <option value='deposit'>Loan Payment</option>
                                    <option value='deposit'>Buy</option>
                                    <option value='deposit'>Sell</option>
                                    <option value='deposit'>Dividend</option>
                                    <option value='deposit'>Recurring Payment</option>
                                    <option value='deposit'>Automatic Transfer</option>
                                </select>
                                <span className='text-danger'>{validationErrors.transaction_type}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Transaction Status</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='transaction_status'>
                                    <option value='deposit'>Pending</option>
                                    <option value='deposit'>Completed</option>
                                    <option value='deposit'>Failed</option>
                                    <option value='deposit'>Reversed</option>
                                    <option value='deposit'>Cancelled</option>
                                    <option value='deposit'>Refunded</option>
                                    <option value='deposit'>In Progress</option>
                                    <option value='deposit'>On hold</option>
                                    <option value='deposit'>Authorized</option>
                                    <option value='deposit'>Disputed</option>
                                    <option value='deposit'>Expired</option>
                                    <option value='deposit'>Processing</option>
                                    <option value='deposit'>Scheduled</option>
                                    <option value='deposit'>Partially Completed</option>
                                    <option value='deposit'>Settled</option>
                                </select>
                                <span className='text-danger'>{validationErrors.transaction_status}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                            <div className='col-sm-4 d-grid'>
                                <Link className='btn btn-secondary' to='/admin/transaction' role='button'>Cancel</Link>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}