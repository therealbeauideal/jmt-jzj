import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CreateBudget() {

    const [validationErrors, setValidationErrors] = useState({})

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const Budget = Object.fromEntries(formData.entries())

        if (!Budget.name) {

                alert("Please fill the Name field")
                return
            }

            try {
                const token = '852de93b4848505296fb5fe56e41a6d1501adfca';


                const response = await fetch("http://127.0.0.1:8000/budgets/", {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json()

                if(response.ok){
                    //Transaction Created Correctly!
                    navigate('/admin/budget')
                }
                else if (response.status === 400){
                    setValidationErrors(data)
                }
                else(
                    alert('Unable to create Budget')
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
                    <h2 className= "text-center mb-5">Create Budget</h2>


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
                            <label className='col-sm-4 col-form-label'>Amount</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='amount'/>
                                <span className='text-danger'>{validationErrors.amount}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                            <div className='col-sm-4 d-grid'>
                                <Link className='btn btn-secondary' to='/admin/budget' role='button'>Cancel</Link>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}