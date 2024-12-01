import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TransactionList() {
    const [transaction, setTransaction] = useState([])

    function getTransaction() {
        fetch('http://127.0.0.1:8000/transactions/')
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then(data =>{
            setTransaction(data)
        })
        .catch(error => {
            alert("Unable to get data")
        })
    }

    useEffect(getTransaction, [])


    function deleteTransaction(id) {
        const token = '852de93b4848505296fb5fe56e41a6d1501adfca';

        fetch('http://127.0.0.1:8000/transactions/' + id + '/',{
            method:'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }

            getTransaction()
        })
        .catch(error =>{
            alert("Unable to delete the transaction")
        })

        
    }

    return(
        <div className='container my-4'>
            <h2 className='text-center mb-4'>Transactions</h2>

            <div className='row mb-3'>
                <div className='col'>
                    <Link className='btn btn-primary me-1' to='/admin/transaction/create' role='button'>Create Transaction</Link>
                    <button type='button' className='btn btn-outline-primary'
                    onClick={getTransaction}>Refresh</button>
                </div>
                <div className='col'>

                </div>
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Balance After Transaction</th>
                        <th>Transaction Number</th>
                        <th>Description</th>
                        <th>Transaction Type</th>
                        <th>Transaction Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transaction.map((transactions, index) =>{
                            return (
                               <tr key={index}>
                                    <th>{transactions.id}</th>
                                    <td>{transactions.name}</td>
                                    <td>{transactions.amount}</td>
                                    <td>{transactions.currency}</td>
                                    <td>{transactions.balance_after_transaction}</td>
                                    <td>{transactions.transaction_number}</td>
                                    <td>{transactions.description}</td>
                                    <td>{transactions.transaction_type}</td>
                                    <td>{transactions.transaction_status}</td>
                                    <td style={{width: '10px', whiteSpace: 'nowrap'}}>
                                        <Link className='btn btn-primary btn-sm me-1'
                                            to={'/admin/transaction/edit/' + transactions.id}>Edit</Link>
                                        <button type='button' className='btn btn-danger btn-sm'
                                            onClick={() => deleteTransaction(transactions.id)}>Delete</button>
                                    </td>
                               </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
