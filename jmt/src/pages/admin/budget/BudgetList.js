import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BudgetList() {
    const [budget, setBudget] = useState([])

    function getBudget() {
        fetch('http://127.0.0.1:8000/budgets/')
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then(data =>{
            setBudget(data)
        })
        .catch(error => {
            alert("Unable to get data")
        })
    }

    useEffect(getBudget, [])


    function deleteBudget(id) {
        const token = '852de93b4848505296fb5fe56e41a6d1501adfca';

        fetch('http://127.0.0.1:8000/budgets/' + id + '/',{
            method:'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }

            getBudget()
        })
        .catch(error =>{
            alert("Unable to delete the budget")
        })

        
    }

    return(
        <div className='container my-4'>
            <h2 className='text-center mb-4'>Budgets</h2>

            <div className='row mb-3'>
                <div className='col'>
                    <Link className='btn btn-primary me-1' to='/admin/budget/create' role='button'>Create Budget</Link>
                    <button type='button' className='btn btn-outline-primary'
                    onClick={getBudget}>Refresh</button>
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
                    </tr>
                </thead>
                <tbody>
                    {
                        budget.map((budgets, index) =>{
                            return (
                               <tr key={index}>
                                    <th>{budgets.id}</th>
                                    <td>{budgets.name}</td>
                                    <td>{budgets.amount}</td>
                                    <td style={{width: '10px', whiteSpace: 'nowrap'}}>
                                        <Link className='btn btn-primary btn-sm me-1'
                                            to={'/admin/budget/edit/' + budgets.id}>Edit</Link>
                                        <button type='button' className='btn btn-danger btn-sm'
                                            onClick={() => deleteBudget(budgets.id)}>Delete</button>
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
