import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/create', { name, email })
            .then(res => {
                console.log(res);
                navigate('/'); // นำทางกลับไปยังหน้าหลักหลังจากเพิ่มสำเร็จ
            })
            .catch(err => console.log(err));
    }

    // ใส่คำสั่ง return เพื่อแสดง JSX
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div className='mb-2'>
                        <label htmlFor='name' className='form-label'>Name</label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder="Enter Name"
                            id='name'
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            placeholder="Enter Email"
                            id='email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateStudent;
