import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CreateInvestment() {

    const [validationErrors, setValidationErrors] = useState({})

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const Investment = Object.fromEntries(formData.entries())

        if (!Investment.name) {

                alert("Please fill the Name field")
                return
            }

            try {
                const token = '852de93b4848505296fb5fe56e41a6d1501adfca';


                const response = await fetch("http://127.0.0.1:8000/investments/", {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json()

                if(response.ok){
                    //Transaction Created Correctly!
                    navigate('/admin/investment')
                }
                else if (response.status === 400){
                    setValidationErrors(data)
                }
                else(
                    alert('Unable to create Investment')
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
                    <h2 className= "text-center mb-5">Create Transaction</h2>


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

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Current Value</label>
                            <div className= 'col-sm-8'>
                                <input className='form-control' name='currenct value'/>
                                <span className='text-danger'>{validationErrors.current_value}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className='col-sm-4 col-form-label'>Investment Type</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='investment type'>
                                    <option value='Stocks'>Stocks</option>
                                    <option value='Bonds'>Bonds</option>
                                    <option value='Real Estate'>Real Estate</option>
                                    <option value='Fixed Income'>Fixed Income</option>
                                    <option value='ETFs'>ETF's</option>
                                    <option value='Commodities'>Commodities</option>
                                    <option value='Cryptocurrency'>Cryptocurrency</option>
                                    <option value='Derivatives'>Derivatives</option>
                                    <option value='Private Equity'>Private Equity</option>
                                    <option value='Hedge Funds'>Hedge Funds</option>
                                    <option value='Collectibles'>Collectibles</option>
                                    <option value='Savings'>Savings</option>
                                </select>
                                <span className='text-danger'>{validationErrors.investment_type}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                            <div className='col-sm-4 d-grid'>
                                <Link className='btn btn-secondary' to='/admin/investment' role='button'>Cancel</Link>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}