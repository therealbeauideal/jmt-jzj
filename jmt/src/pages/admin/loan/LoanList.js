import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LoanList() {
    const [loan, setLoan] = useState([])

    function getLoan() {
        fetch('http://127.0.0.1:8000/loans/')
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then(data =>{
            setLoan(data)
        })
        .catch(error => {
            alert("Unable to get data")
        })
    }

    useEffect(getLoan, [])


    function deleteLoan(id) {
        const token = '852de93b4848505296fb5fe56e41a6d1501adfca';

        fetch('http://127.0.0.1:8000/loans/' + id + '/',{
            method:'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }

            getLoan()
        })
        .catch(error =>{
            alert("Unable to delete the loan")
        })

        
    }

    return(
        <div className='container my-4'>
            <h2 className='text-center mb-4'>Loans</h2>

            <div className='row mb-3'>
                <div className='col'>
                    <Link className='btn btn-primary me-1' to='/admin/loan/create' role='button'>Create Loan</Link>
                    <button type='button' className='btn btn-outline-primary'
                    onClick={getLoan}>Refresh</button>
                </div>
                <div className='col'>

                </div>
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Principal Amount</th>
                        <th>Interest Rate</th>
                        <th>Late Fee</th>
                        <th>Loan Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loan.map((loans, index) =>{
                            return (
                               <tr key={index}>
                                    <th>{loans.id}</th>
                                    <td>{loans.name}</td>
                                    <td>{loans.principal_amount}</td>
                                    <td>{loans.interest_rate}</td>
                                    <td>{loans.late_fee}</td>
                                    <td>{loans.loan_type}</td>
                                    <td>{loans.status}</td>
                                    <td style={{width: '10px', whiteSpace: 'nowrap'}}>
                                        <Link className='btn btn-primary btn-sm me-1'
                                            to={'/admin/loan/edit/' + loans.id}>Edit</Link>
                                        <button type='button' className='btn btn-danger btn-sm'
                                            onClick={() => deleteLoan(loans.id)}>Delete</button>
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
