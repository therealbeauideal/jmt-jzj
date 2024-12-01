import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



export default function EditCategory() {

    const {id} = useParams()
    const [initialData, setInitialData] = useState()
    const [validationErrors, setValidationErrors] = useState({})

    const navigate = useNavigate()

    function getCategory() {
        fetch("http://127.0.0.1:8000/categories/")
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
            alert('Unable to read the Category details')
        })
    }

    useEffect(getCategory, [id])

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const Transaction = Object.fromEntries(formData.entries())

        if (!Transaction.name) {

            alert("Please fill the Name field")
            return
        }

        try {
            const token = '852de93b4848505296fb5fe56e41a6d1501adfca';


            const response = await fetch("http://127.0.0.1:8000/categories/" + id + '/',{
                method: 'PATCH',
                body: formData,
                headers: {
                    'Authorization': `Token ${token}`
                },
            });

            const data = await response.json()

            if(response.ok){
                //Transaction Updated Correctly!
                navigate('/admin/category/')
            }
            else if (response.status === 400){
                setValidationErrors(data)
            }
            else(
                alert('Unable to Update Category')
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
                    <h2 className= "text-center mb-5">Edit Category</h2>
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
                            <label className='col-sm-4 col-form-label'>Description</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='description' rows= "4" defaultValue={initialData.description}/>
                                <span className='text-danger'>{validationErrors.description}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                            <div className='col-sm-4 d-grid'>
                                <Link className='btn btn-secondary' to='/admin/category' role='button'>Cancel</Link>
                            </div>
                        </div>

                    </form>
                    }
                </div>
            </div>
        </div>
    )
}