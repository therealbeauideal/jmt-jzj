import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function InvestmentList() {
    const [investment, setInvestment] = useState([])

    function getInvestment() {
        fetch('http://127.0.0.1:8000/investments/')
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then(data =>{
            setInvestment(data)
        })
        .catch(error => {
            alert("Unable to get data")
        })
    }

    useEffect(getInvestment, [])


    function deleteInvestment(id) {
        const token = '852de93b4848505296fb5fe56e41a6d1501adfca';

        fetch('http://127.0.0.1:8000/investments/' + id + '/',{
            method:'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }

            getInvestment()
        })
        .catch(error =>{
            alert("Unable to delete the investment")
        })

        
    }

    return(
        <div className='container my-4'>
            <h2 className='text-center mb-4'>Investments</h2>

            <div className='row mb-3'>
                <div className='col'>
                    <Link className='btn btn-primary me-1' to='/admin/transaction/create' role='button'>Create Investment</Link>
                    <button type='button' className='btn btn-outline-primary'
                    onClick={getInvestment}>Refresh</button>
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
                        <th>Current Value</th>
                        <th>Investment Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        investment.map((investments, index) =>{
                            return (
                               <tr key={index}>
                                    <th>{investments.id}</th>
                                    <td>{investments.name}</td>
                                    <td>{investments.amount}</td>
                                    <td>{investments.current_value}</td>
                                    <td>{investments.investment_type}</td>
                                    <td style={{width: '10px', whiteSpace: 'nowrap'}}>
                                        <Link className='btn btn-primary btn-sm me-1'
                                            to={'/admin/investment/edit/' + investments.id}>Edit</Link>
                                        <button type='button' className='btn btn-danger btn-sm'
                                            onClick={() => deleteInvestment(investments.id)}>Delete</button>
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
