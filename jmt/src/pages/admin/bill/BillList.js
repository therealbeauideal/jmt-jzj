import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BillList() {
    const [bill, setBill] = useState([])

    function getBill() {
        fetch('http://127.0.0.1:8000/bills/')
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then(data =>{
            setBill(data)
        })
        .catch(error => {
            alert("Unable to get data")
        })
    }

    useEffect(getBill, [])


    function deleteBill(id) {
        const token = '852de93b4848505296fb5fe56e41a6d1501adfca';

        fetch('http://127.0.0.1:8000/bills/' + id + '/',{
            method:'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }

            getBill()
        })
        .catch(error =>{
            alert("Unable to delete the bill")
        })

        
    }

    return(
        <div className='container my-4'>
            <h2 className='text-center mb-4'>Bills</h2>

            <div className='row mb-3'>
                <div className='col'>
                    <Link className='btn btn-primary me-1' to='/admin/bill/create' role='button'>Create Bill</Link>
                    <button type='button' className='btn btn-outline-primary'
                    onClick={getBill}>Refresh</button>
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
                        <th>Status</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bill.map((bills, index) =>{
                            return (
                               <tr key={index}>
                                    <th>{bills.id}</th>
                                    <td>{bills.name}</td>
                                    <td>{bills.amount}</td>
                                    <td>{bills.status}</td>
                                    <td>{bills.due_date}</td>
                                    <td style={{width: '10px', whiteSpace: 'nowrap'}}>
                                        <Link className='btn btn-primary btn-sm me-1'
                                            to={'/admin/bill/edit/' + bills.id}>Edit</Link>
                                        <button type='button' className='btn btn-danger btn-sm'
                                            onClick={() => deleteBill(bills.id)}>Delete</button>
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
