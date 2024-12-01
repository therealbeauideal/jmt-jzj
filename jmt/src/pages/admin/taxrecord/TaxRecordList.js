import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TaxRecordList() {
    const [taxrecord, setTaxRecord] = useState([])

    function getTaxRecord() {
        fetch('http://127.0.0.1:8000/tax_records/')
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then(data =>{
            setTaxRecord(data)
        })
        .catch(error => {
            alert("Unable to get data")
        })
    }

    useEffect(getTaxRecord, [])


    function deleteTaxRecord(id) {
        const token = '852de93b4848505296fb5fe56e41a6d1501adfca';

        fetch('http://127.0.0.1:8000/tax_records/' + id + '/',{
            method:'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }

            getTaxRecord()
        })
        .catch(error =>{
            alert("Unable to delete the tax record")
        })

        
    }

    return(
        <div className='container my-4'>
            <h2 className='text-center mb-4'>Tax Records</h2>

            <div className='row mb-3'>
                <div className='col'>
                    <Link className='btn btn-primary me-1' to='/admin/taxrecord/create' role='button'>Create Tax Record</Link>
                    <button type='button' className='btn btn-outline-primary'
                    onClick={getTaxRecord}>Refresh</button>
                </div>
                <div className='col'>

                </div>
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Tax Year</th>
                        <th>Income Amount</th>
                        <th>Deductions</th>
                        <th>Tax Paid</th>
                        <th>Tax Owed</th>
                        <th>Refunded Amount</th>
                        <th>Submission Date</th>
                        <th>Tax Filing Status</th>
                        <th>Status</th>
                        <th>Tax Form</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        taxrecord.map((taxrecords, index) =>{
                            return (
                               <tr key={index}>
                                    <th>{taxrecords.id}</th>
                                    <td>{taxrecords.name}</td>
                                    <td>{taxrecords.tax_year}</td>
                                    <td>{taxrecords.income_amount}</td>
                                    <td>{taxrecords.deductions}</td>
                                    <td>{taxrecords.tax_paid}</td>
                                    <td>{taxrecords.tax_owed}</td>
                                    <td>{taxrecords.refunded_amount}</td>
                                    <td>{taxrecords.submission_date}</td>
                                    <td>{taxrecords.tax_filing_status}</td>
                                    <td>{taxrecords.status}</td>
                                    <td>{taxrecords.tax_form}</td>
                                    <td>{taxrecords.state}</td>
                                    <td style={{width: '10px', whiteSpace: 'nowrap'}}>
                                        <Link className='btn btn-primary btn-sm me-1'
                                            to={'/admin/taxrecord/edit/' + taxrecords.id}>Edit</Link>
                                        <button type='button' className='btn btn-danger btn-sm'
                                            onClick={() => deleteTaxRecord(taxrecords.id)}>Delete</button>
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
