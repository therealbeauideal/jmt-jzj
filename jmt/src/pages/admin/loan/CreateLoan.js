import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CreateLoan() {

    const [validationErrors, setValidationErrors] = useState({})

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const Loan = Object.fromEntries(formData.entries())

        if (!Loan.name) {

                alert("Please fill the Name field")
                return
            }

            try {
                const token = '852de93b4848505296fb5fe56e41a6d1501adfca';


                const response = await fetch("http://127.0.0.1:8000/loans/", {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json()

                if(response.ok){
                    //Transaction Created Correctly!
                    navigate('/admin/loan')
                }
                else if (response.status === 400){
                    setValidationErrors(data)
                }
                else(
                    alert('Unable to create Loan')
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
                    <h2 className= "text-center mb-5">Create Loan</h2>


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
                            <label className='col-sm-4 col-form-label'>Principal Amount</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='principal amount'/>
                                <span className='text-danger'>{validationErrors.principal_amount}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Interest Rate</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='interest rate'/>
                                <span className='text-danger'>{validationErrors.interest_rate}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Late Fee</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='late fee'/>
                                <span className='text-danger'>{validationErrors.late_fee}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Loan Type</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='loan type'>
                                    <option value='Personal'>Personal</option>
                                    <option value='Home'>Home</option>
                                    <option value='Student'>Student</option>
                                    <option value='Auto'>Auto</option>
                                    <option value='Business'>Business</option>
                                    <option value='Payday'>Payday</option>
                                    <option value='Credit Builder'>Credit Builder</option>
                                    <option value='Agricultural'>Agricultural</option>
                                    <option value='Other'>Other</option>
                                </select>
                                <span className='text-danger'>{validationErrors.loan_type}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Status</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='status'>
                                    <option value='application stage'>Application State</option>
                                    <option value='funding stage'>Funding Stage</option>
                                    <option value='repayment stage'>Repayment Stage</option>
                                    <option value='Deliquency Stage'>Deliquency Stage</option>
                                    <option value='final stage'>Final Stage</option>
                                </select>
                                <span className='text-danger'>{validationErrors.status}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                            <div className='col-sm-4 d-grid'>
                                <Link className='btn btn-secondary' to='/admin/loan' role='button'>Cancel</Link>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}