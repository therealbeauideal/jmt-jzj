import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



export default function EditTransaction() {

    const {id} = useParams()
    const [initialData, setInitialData] = useState()
    const [validationErrors, setValidationErrors] = useState({})

    const navigate = useNavigate()

    function getTransaction() {
        fetch("http://127.0.0.1:8000/transactions/")
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then(data => {
            setInitialData(data)
        })
        .catch(error => {
            alert('Unable to read the Transaction details')
        })
    }

    useEffect(getTransaction, [id])

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


            const response = await fetch("http://127.0.0.1:8000/transactions/" + id + '/',{
                method: 'PATCH',
                body: formData,
                headers: {
                    'Authorization': `Token ${token}`
                },
            });

            const data = await response.json()

            if(response.ok){
                //Transaction Updated Correctly!
                navigate('/admin/transaction/')
            }
            else if (response.status === 400){
                setValidationErrors(data)
            }
            else(
                alert('Unable to Update Transaction')
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
                    <h2 className= "text-center mb-5">Edit Transaction</h2>
                    <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>ID</label>
                            <div className= 'col-sm-8'>
                                <input readOnly className='form-control-plaintext' defaultValue={id}/>
                            </div>
                        </div>

                    {
                        initialData &&
                    <form onSubmit={handleSubmit}>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Name</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='name' defaultValue={initialData.name}/>
                                <span className='text-danger'>{validationErrors.name}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Amount</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='amount' defaultValue={initialData.amount}/>
                                <span className='text-danger'>{validationErrors.amount}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Balance After Transaction</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='balance_after_transaction' defaultValue={initialData.balance_after_transaction}/>
                                <span className='text-danger'>{validationErrors.balance_after_transaction}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Transaction Number</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='transaction_number' defaultValue={initialData.transaction_number}/>
                                <span className='text-danger'>{validationErrors.transaction_number}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Description</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='description' rows= "4" defaultValue={initialData.description}/>
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
                                <select className='form-select' name='transaction type'>
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
                                <span className='text-danger'>{validationErrors.transactiontype}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Transaction Status</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='transaction_status'>
                                    <option value='pending'>Pending</option>
                                    <option value='completed'>Completed</option>
                                    <option value='failed'>Failed</option>
                                    <option value='reversed'>Reversed</option>
                                    <option value='cancelled'>Cancelled</option>
                                    <option value='refunded'>Refunded</option>
                                    <option value='in progress'>In Progress</option>
                                    <option value='on hold'>On hold</option>
                                    <option value='authorized'>Authorized</option>
                                    <option value='disputed'>Disputed</option>
                                    <option value='expired'>Expired</option>
                                    <option value='processing'>Processing</option>
                                    <option value='scheduled'>Scheduled</option>
                                    <option value='partially completed'>Partially Completed</option>
                                    <option value='settled'>Settled</option>
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
                    }
                </div>
            </div>
        </div>
    )
}