import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student() {
    const [student, setStudents] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(res => {
            console.log(res.data); // ตรวจสอบข้อมูลที่ถูกดึงมา
            setStudents(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/student/${id}`);
            setStudents(student.filter((s) => s.id !== id)); // อัปเดต state โดยไม่ต้องรีเฟรชหน้า
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            student.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>
                                        <Link to={`/update/${data.id}`} className='btn btn-primary'>
                                            Update
                                        </Link>
                                        <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;
