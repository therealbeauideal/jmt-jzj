import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CategoryList() {
    const [category, setCategory] = useState([])

    function getCategory() {
        fetch('http://127.0.0.1:8000/categories/')
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then(data =>{
            setCategory(data)
        })
        .catch(error => {
            alert("Unable to get data")
        })
    }

    useEffect(getCategory, [])


    function deleteCategory(id) {
        const token = '852de93b4848505296fb5fe56e41a6d1501adfca';

        fetch('http://127.0.0.1:8000/categories/' + id + '/',{
            method:'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }

            getCategory()
        })
        .catch(error =>{
            alert("Unable to delete the category")
        })

        
    }

    return(
        <div className='container my-4'>
            <h2 className='text-center mb-4'>Categories</h2>

            <div className='row mb-3'>
                <div className='col'>
                    <Link className='btn btn-primary me-1' to='/admin/category/create' role='button'>Create Category</Link>
                    <button type='button' className='btn btn-outline-primary'
                    onClick={getCategory}>Refresh</button>
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
                    </tr>
                </thead>
                <tbody>
                    {
                        category.map((categories, index) =>{
                            return (
                               <tr key={index}>
                                    <th>{categories.id}</th>
                                    <td>{categories.name}</td>
                                    <td>{categories.description}</td>
                                    <td style={{width: '10px', whiteSpace: 'nowrap'}}>
                                        <Link className='btn btn-primary btn-sm me-1'
                                            to={'/admin/category/edit/' + categories.id}>Edit</Link>
                                        <button type='button' className='btn btn-danger btn-sm'
                                            onClick={() => deleteCategory(categories.id)}>Delete</button>
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
