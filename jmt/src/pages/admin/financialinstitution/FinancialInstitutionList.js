import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FinancialInstitutionList() {
    const [financialinstitution, setFinancialInstitution] = useState([])

    function getFinancialInstitution() {
        fetch('http://127.0.0.1:8000/financial_institutions/')
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then(data =>{
            setFinancialInstitution(data)
        })
        .catch(error => {
            alert("Unable to get data")
        })
    }

    useEffect(getFinancialInstitution, [])


    function deleteFinancialInstitution(id) {
        const token = '852de93b4848505296fb5fe56e41a6d1501adfca';

        fetch('http://127.0.0.1:8000/financial_institutions/' + id + '/',{
            method:'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }

            getFinancialInstitution()
        })
        .catch(error =>{
            alert("Unable to delete the Financial Instituion")
        })

        
    }

    return(
        <div className='container my-4'>
            <h2 className='text-center mb-4'>Financial Instituions</h2>

            <div className='row mb-3'>
                <div className='col'>
                    <Link className='btn btn-primary me-1' to='/admin/financialinstitution/create' role='button'>Create Financial Instituion</Link>
                    <button type='button' className='btn btn-outline-primary'
                    onClick={getFinancialInstitution}>Refresh</button>
                </div>
                <div className='col'>

                </div>
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Institution Name</th>
                        <th>Institution Type</th>
                        <th>Address Line</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                        <th>Country</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        financialinstitution.map((financialinstitutions, index) =>{
                            return (
                               <tr key={index}>
                                    <th>{financialinstitutions.id}</th>
                                    <td>{financialinstitutions.name}</td>
                                    <td>{financialinstitutions.institution_name}</td>
                                    <td>{financialinstitutions.institution_type}</td>
                                    <td>{financialinstitutions.address_line_1}</td>
                                    <td>{financialinstitutions.city}</td>
                                    <td>{financialinstitutions.state}</td>
                                    <td>{financialinstitutions.postal_code}</td>
                                    <td>{financialinstitutions.country}</td>
                                    <td>{financialinstitutions.phone_number}</td>
                                    <td>{financialinstitutions.email}</td>
                                    <td>{financialinstitutions.website}</td>
                                    <td style={{width: '10px', whiteSpace: 'nowrap'}}>
                                        <Link className='btn btn-primary btn-sm me-1'
                                            to={'/admin/financialinstitution/edit/' + financialinstitutions.id}>Edit</Link>
                                        <button type='button' className='btn btn-danger btn-sm'
                                            onClick={() => deleteFinancialInstitution(financialinstitutions.id)}>Delete</button>
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
