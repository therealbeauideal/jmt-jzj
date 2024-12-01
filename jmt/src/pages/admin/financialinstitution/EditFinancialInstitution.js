import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



export default function EditFinancialInstitution() {

    const {id} = useParams()
    const [initialData, setInitialData] = useState()
    const [validationErrors, setValidationErrors] = useState({})

    const navigate = useNavigate()

    function getFinancialInstitution() {
        fetch("http://127.0.0.1:8000/financial_institutions/")
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
            alert('Unable to read the Financial Institution details')
        })
    }

    useEffect(getFinancialInstitution, [id])

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const FinancialInstitution = Object.fromEntries(formData.entries())

        if (!FinancialInstitution.name) {

            alert("Please fill the Name field")
            return
        }

        try {
            const token = '852de93b4848505296fb5fe56e41a6d1501adfca';


            const response = await fetch("http://127.0.0.1:8000/financial_institutions/" + id + '/',{
                method: 'PATCH',
                body: formData,
                headers: {
                    'Authorization': `Token ${token}`
                },
            });

            const data = await response.json()

            if(response.ok){
                //Transaction Updated Correctly!
                navigate('/admin/financialinstitution/')
            }
            else if (response.status === 400){
                setValidationErrors(data)
            }
            else(
                alert('Unable to Update Financial Institution')
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
                    <h2 className= "text-center mb-5">Edit Financial Instituion</h2>
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
                            <label className='col-sm-4 col-form-label'>Instituion Name</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='institution_name'/>
                                <span className='text-danger'>{validationErrors.institution_name}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Institution Type</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='institution_type'>
                                    <option value='BANK'>Bank</option>
                                    <option value='CREDIT_UNION'>Credit Union</option>
                                    <option value='INSURANCE_COMPANY'>Insurance Company</option>
                                    <option value='INVESTMENT_FIRM'>Investment Firm</option>
                                    <option value='MUTUAL_FUND'>Mutual Fund</option>
                                    <option value='BROKERAGE'>Brokerage</option>
                                    <option value='OTHER'>Other</option>
                                </select>
                                <span className='text-danger'>{validationErrors.institution_type}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Address Line</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='address_line_1'/>
                                <span className='text-danger'>{validationErrors.address_line_1}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>City</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='city'/>
                                <span className='text-danger'>{validationErrors.city}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>State</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='state' rows= "4"/>
                                <span className='text-danger'>{validationErrors.state}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Postal Code</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='postal_code' rows= "4"/>
                                <span className='text-danger'>{validationErrors.postal_code}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Country</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='country' rows= "4"/>
                                <span className='text-danger'>{validationErrors.country}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Phone Number</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='phone_number' rows= "4"/>
                                <span className='text-danger'>{validationErrors.phone_number}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Email</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='email' rows= "4"/>
                                <span className='text-danger'>{validationErrors.email}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Website</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='website' rows= "4"/>
                                <span className='text-danger'>{validationErrors.website}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                            <div className='col-sm-4 d-grid'>
                                <Link className='btn btn-secondary' to='/admin/financialinstitution' role='button'>Cancel</Link>
                            </div>
                        </div>

                    </form>
                    }
                </div>
            </div>
        </div>
    )
}