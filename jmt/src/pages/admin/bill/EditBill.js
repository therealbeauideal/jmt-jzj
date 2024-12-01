import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



export default function EditBill() {

    const {id} = useParams()
    const [initialData, setInitialData] = useState()
    const [validationErrors, setValidationErrors] = useState({})

    const navigate = useNavigate()

    function getBill() {
        fetch("http://127.0.0.1:8000/bills/")
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
            alert('Unable to read the Bill details')
        })
    }

    useEffect(getBill, [id])

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const Bill = Object.fromEntries(formData.entries())

        if (!Bill.name) {

            alert("Please fill the Name field")
            return
        }

        try {
            const token = '852de93b4848505296fb5fe56e41a6d1501adfca';


            const response = await fetch("http://127.0.0.1:8000/bills/" + id + '/',{
                method: 'PATCH',
                body: formData,
                headers: {
                    'Authorization': `Token ${token}`
                },
            });

            const data = await response.json()

            if(response.ok){
                //Transaction Updated Correctly!
                navigate('/admin/bill/')
            }
            else if (response.status === 400){
                setValidationErrors(data)
            }
            else(
                alert('Unable to Update Bill')
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
                    <h2 className= "text-center mb-5">Edit Bill</h2>
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
                            <label className='col-sm-4 col-form-label'>Amount</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='amount' defaultValue={initialData.amount}/>
                                <span className='text-danger'>{validationErrors.amount}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Status</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='status'>
                                    <option value='creation and processing stage'>Creation and Processing Stage</option>
                                    <option value='billing and nofitified stage'>Billing and Nofitified Stage</option>
                                    <option value='payment stage'>Payment Stage</option>
                                    <option value='late and collection stage'>Late and Collection Stage</option>
                                    <option value='adjustment and finalization stage'>Adjustment and Finaliztion Stage</option>
                                    <option value='closed'>Closed</option>
                                </select>
                                <span className='text-danger'>{validationErrors.status}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Due Date</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='due_date'/>
                                <span className='text-danger'>{validationErrors.due_date}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                            <div className='col-sm-4 d-grid'>
                                <Link className='btn btn-secondary' to='/admin/bill' role='button'>Cancel</Link>
                            </div>
                        </div>

                    </form>
                    }
                </div>
            </div>
        </div>
    )
}