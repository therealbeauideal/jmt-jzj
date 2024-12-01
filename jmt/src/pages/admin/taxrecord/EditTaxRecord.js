import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



export default function EditTaxRecord() {

    const {id} = useParams()
    const [initialData, setInitialData] = useState()
    const [validationErrors, setValidationErrors] = useState({})

    const navigate = useNavigate()

    function getTaxRecord() {
        fetch("http://127.0.0.1:8000/tax_records/")
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
            alert('Unable to read the Tax Record details')
        })
    }

    useEffect(getTaxRecord, [id])

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const TaxRecord = Object.fromEntries(formData.entries())

        if (!TaxRecord.name) {

            alert("Please fill the Name field")
            return
        }

        try {
            const token = '852de93b4848505296fb5fe56e41a6d1501adfca';


            const response = await fetch("http://127.0.0.1:8000/tax_records/" + id + '/',{
                method: 'PATCH',
                body: formData,
                headers: {
                    'Authorization': `Token ${token}`
                },
            });

            const data = await response.json()

            if(response.ok){
                //Transaction Updated Correctly!
                navigate('/admin/taxrecord/')
            }
            else if (response.status === 400){
                setValidationErrors(data)
            }
            else(
                alert('Unable to Update Tax Record')
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
                    <h2 className= "text-center mb-5">Edit Tax Record</h2>
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
                            <label className='col-sm-4 col-form-label'>Tax year</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='tax_year'/>
                                <span className='text-danger'>{validationErrors.tax_year}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Income Amount</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='income_amount'/>
                                <span className='text-danger'>{validationErrors.income_amount}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Deductions</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='deductions'/>
                                <span className='text-danger'>{validationErrors.deductions}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Tax Paid</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='tax_paid' rows= "4"/>
                                <span className='text-danger'>{validationErrors.tax_paid}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Tax Owed</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='tax_owed' rows= "4"/>
                                <span className='text-danger'>{validationErrors.tax_owed}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Refunded Amount</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='refunded_amount' rows= "4"/>
                                <span className='text-danger'>{validationErrors.refunded_amount}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Submission Date</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='submission_date' rows= "4"/>
                                <span className='text-danger'>{validationErrors.submission_date}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Tax Filing Status</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='tax_filing_status'>
                                    <option value='SINGLE'>Single</option>
                                    <option value='MARRIED_FILING_JOINTLY'>Married Filing Separately</option>
                                    <option value='HEAD_OF_HOUSEHOLD'>Head of Household</option>
                                    <option value='QUALIFYING_WIDOWER'>Qualifying Widow(er) with Dependent Child</option>
                                </select>
                                <span className='text-danger'>{validationErrors.tax_filing_status}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Status</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='status'>
                                    <option value='DRAFT'>Draft</option>
                                    <option value='SUBMITTED'>Submitted</option>
                                    <option value='UNDER_REVIEW'>Under Review</option>
                                    <option value='PENDING_APPROVAL'>Pending Approval</option>
                                    <option value='FILED'>Filed</option>
                                    <option value='PROCESSING'>Processing</option>
                                    <option value='APPROVED'>Approved</option>
                                    <option value='REJECTED'>Rejected</option>
                                    <option value='AMENDED'>Amended</option>
                                    <option value='COMPLETED'>Completed</option>
                                    <option value='ARCHIVED'>Archived</option>
                                </select>
                                <span className='text-danger'>{validationErrors.status}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Tax Form</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='tax_form'>
                                    <option value='FORM_1040'>1040 - U.S. Individual Income Tax Return</option>
                                    <option value='FORM_1040A'>1040A - U.S. Individual Income Tax Return (Short Form)'</option>
                                    <option value='FORM_1040EZ'>1040EZ - U.S. Individual Income Tax Return (Simplified)</option>
                                    <option value='FORM_1065'>1065 - U.S. Return of Partnership Income</option>
                                    <option value='FORM_1120'>1120 - U.S. Corporation Income Tax Return</option>
                                    <option value='FORM_1120S'>1120S - U.S. Income Tax Return for an S Corporation</option>
                                    <option value='FORM_1099'>1099 - Miscellaneous Income</option>
                                    <option value='FORM_W2'>W2 - Wage and Tax Statement</option>
                                    <option value='FORM_990'>990 - Return of Organization Exempt from Income Tax</option>
                                    <option value='FORM_706'>706 - United States Estate (and Generation-Skipping Transfer) Tax Return</option>
                                </select>
                                <span className='text-danger'>{validationErrors.tax_form}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>State</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='state'>
                                    <option value='AL'>Alabama</option>
                                    <option value='AK'>Alaska</option>
                                    <option value='AZ'>Arizona</option>
                                    <option value='AR'>Arkansas</option>
                                    <option value='CA'>California</option>
                                    <option value='CO'>Colorado</option>
                                    <option value='CT'>Connecticut</option>
                                    <option value='DE'>Delaware</option>
                                    <option value='DC'>District of Columbia</option>
                                    <option value='FL'>Florida</option>
                                    <option value='GA'>Georgia</option>
                                    <option value='HI'>Hawaii</option>
                                    <option value='ID'>Idaho</option>
                                    <option value='IL'>Illinois</option>
                                    <option value='IN'>Indiana</option>
                                    <option value='IA'>Iowa</option>
                                    <option value='KS'>Kansas</option>
                                    <option value='KY'>Kentucky</option>
                                    <option value='LA'>Louisiana</option>
                                    <option value='ME'>Maine</option>
                                    <option value='MD'>Maryland</option>
                                    <option value='MA'>Massachusetts</option>
                                    <option value='MI'>Michigan</option>
                                    <option value='MN'>Minnesota</option>
                                    <option value='MS'>Mississippi</option>
                                    <option value='MO'>Missouri</option>
                                    <option value='MT'>Montana</option>
                                    <option value='NE'>Nebraska</option>
                                    <option value='NV'>Nevada</option>
                                    <option value='NH'>New Hampshire</option>
                                    <option value='NJ'>New Jersey</option>
                                    <option value='NM'>New Mexico</option>
                                    <option value='NY'>New York</option>
                                    <option value='NC'>North Carolina</option>
                                    <option value='ND'>North Dakota</option>
                                    <option value='OH'>Ohio</option>
                                    <option value='OK'>Oklahoma</option>
                                    <option value='OR'>Oregon</option>
                                    <option value='PA'>Pennsylvania</option>
                                    <option value='RI'>Rhode Island</option>
                                    <option value='SC'>South Carolina</option>
                                    <option value='SD'>South Dakota</option>
                                    <option value='TN'>Tennessee</option>
                                    <option value='TX'>Texas</option>
                                    <option value='UT'>Utah</option>
                                    <option value='VT'>Vermont</option>
                                    <option value='VA'>Virginia</option>
                                    <option value='WA'>Washington</option>
                                    <option value='WV'>West Virginia</option>
                                    <option value='WI'>Wisconsin</option>
                                    <option value='WY'>Wyoming</option>
                                </select>
                                <span className='text-danger'>{validationErrors.state}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                            <div className='col-sm-4 d-grid'>
                                <Link className='btn btn-secondary' to='/admin/taxrecord' role='button'>Cancel</Link>
                            </div>
                        </div>

                    </form>
                    }
                </div>
            </div>
        </div>
    )
}