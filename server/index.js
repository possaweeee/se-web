const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "12345678",
    database: "kusrc_course"
})

// กำหนดเส้นทาง GET /registerteacher เพื่อดึงข้อมูลลงทะเบียนการสอน
app.get('/registerteacher', (req, res) => {
    db.query("SELECT * FROM user_reg", (err, result) => {
        if (err) {
            console.log(err); // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาดในการดึงข้อมูล
        } else {
            res.send(result); // ส่งข้อมูลลงทะเบียนการสอนกลับไปยัง client ในรูปแบบ JSON
        }
    });
});

// กำหนดเส้นทาง POST /create เพื่อเพิ่มข้อมูลลงทะเบียนการสอน
app.post('/create', (req, res) => { 
    const { subjectReg_id, lec_group, lab_group, major_year, roomReg_ranking,user_email } = req.body
    db.query("INSERT INTO user_reg (subjectReg_id, lec_group, lab_group,major_year,roomReg_ranking,user_email) VALUES (?,?,?,?,?,'mfvch0258@gmail.com')",
        [subjectReg_id, lec_group, lab_group,major_year,roomReg_ranking,user_email],
        (err, result) => {
            if (err) {
                console.log(err); // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาดในการเพิ่มข้อมูล
            } else {
                res.send("Values inserted"); // ส่งข้อความยืนยันการเพิ่มข้อมูลกลับไปยัง client
            }
        }
    )
})

app.put('/update',(req,res) => {
    const {reg_id, subjectReg_id} = req.body;
    db.query("UPDATE user_reg SET subjectReg_id = ? WHERE reg_id = ?", [subjectReg_id,reg_id], (err, result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete('/delete/:reg_id', (req,res)=> {
    const reg_id = req.params.reg_id;
    db.query("DELETE FROM user_reg WHERE reg_id = ?", reg_id,(err,result) => {
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
// เริ่มต้นเซิร์ฟเวอร์ด้วยการรอการเชื่อมต่อผ่านพอร์ต 3001
app.listen('3001', () => {
    console.log('Server is running on port 3001');
})  