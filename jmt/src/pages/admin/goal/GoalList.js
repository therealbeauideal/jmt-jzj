import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GoalList() {
    const [goal, setGoal] = useState([])

    function getGoal() {
        fetch('http://127.0.0.1:8000/goals/')
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then(data =>{
            setGoal(data)
        })
        .catch(error => {
            alert("Unable to get data")
        })
    }

    useEffect(getGoal, [])


    function deleteGoal(id) {
        const token = '852de93b4848505296fb5fe56e41a6d1501adfca';

        fetch('http://127.0.0.1:8000/goals/' + id + '/',{
            method:'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }

            getGoal()
        })
        .catch(error =>{
            alert("Unable to delete the goal")
        })

        
    }

    return(
        <div className='container my-4'>
            <h2 className='text-center mb-4'>Goals</h2>

            <div className='row mb-3'>
                <div className='col'>
                    <Link className='btn btn-primary me-1' to='/admin/goal/create' role='button'>Create Goal</Link>
                    <button type='button' className='btn btn-outline-primary'
                    onClick={getGoal}>Refresh</button>
                </div>
                <div className='col'>

                </div>
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Target Amount</th>
                        <th>Current Amount</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Priorities</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        goal.map((goals, index) =>{
                            return (
                               <tr key={index}>
                                    <th>{goals.id}</th>
                                    <td>{goals.name}</td>
                                    <td>{goals.description}</td>
                                    <td>{goals.target_amount}</td>
                                    <td>{goals.current_amount}</td>
                                    <td>{goals.start_date}</td>
                                    <td>{goals.end_date}</td>
                                    <td>{goals.priorities}</td>
                                    <td style={{width: '10px', whiteSpace: 'nowrap'}}>
                                        <Link className='btn btn-primary btn-sm me-1'
                                            to={'/admin/goal/edit/' + goals.id}>Edit</Link>
                                        <button type='button' className='btn btn-danger btn-sm'
                                            onClick={() => deleteGoal(goals.id)}>Delete</button>
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
