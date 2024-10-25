import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/student/' + id)
            .then(res => {
                setName(res.data.name);
                setEmail(res.data.email);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8081/update/' + id, { name, email })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3 '>
            <form onSubmit={handleSubmit}>
                <h2>Update Student</h2>
                <div className='mb-2'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input type='text' className='form-control' placeholder="Enter Name" id='name' 
                    onChange={e=>setName(e.target.value)}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input type='email' className='form-control' placeholder="Enter Email" id='email' 
                    onChange={e=>setEmail(e.target.value)}/>
                </div>
                <button className='btn btn-success'>Update</button>
            </form>
        </div>
    </div>
)
}

export default UpdateStudent;
