const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// เชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // เปลี่ยนเป็นชื่อผู้ใช้ของ MySQL ของคุณ
  password: '',  // เปลี่ยนเป็นรหัสผ่านของ MySQL ของคุณ
  database: 'crud_system' // ใช้ชื่อฐานข้อมูล 'student' ตามภาพ
});

db.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

// ดึงข้อมูลนักเรียนทั้งหมด
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM student';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// เพิ่มนักเรียนใหม่
app.post('/create', (req, res) => {
  const sql = 'INSERT INTO student (name, email) VALUES (?, ?)';
  const values = [
    req.body.name,
    req.body.email
  ];
  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// ลบนักเรียน
app.delete('/student/:id', (req, res) => {
  const sql = 'DELETE FROM student WHERE id = ?';
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// อัปเดตข้อมูลนักเรียน
app.put('/update/:id', (req, res) => {
  const sql = 'UPDATE student SET name = ?, email = ? WHERE id = ?';
  const values = [
    req.body.name,
    req.body.email
  ];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
