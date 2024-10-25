import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Student from './Student'; // Component สำหรับแสดงรายชื่อนักเรียน
import CreateStudent from './CreateStudent.js'; // Component สำหรับเพิ่มนักเรียนใหม่
import UpdateStudent from './UpdateStudent'; // Component สำหรับแก้ไขข้อมูลนักเรียน

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* เส้นทางสำหรับแสดงรายชื่อนักเรียน */}
          <Route path='/' element={<Student />} /> 

          {/* เส้นทางสำหรับสร้างนักเรียนใหม่ */}
          <Route path='/create' element={<CreateStudent />} /> 

          {/* เส้นทางสำหรับแก้ไขข้อมูลนักเรียน */}
          <Route path='/update/:id' element={<UpdateStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
