const express = require('express');
const mysql = require('mysql');
const path = require('path');
const static = require('serve-static')
const dbconfig = require('./gitignore_config/dbconfig.json')

const pool = mysql.createPool({
    connectionLimit: 10,
    host:dbconfig.host,
    user:dbconfig.user,
    password:dbconfig.password,
    database:dbconfig.database,
    debug:false,
    timezone: '09:00' //서울시간 (표준시보다 +9시간)
});

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/public', static(path.join(__dirname,'/public')));

app.get('/', (req, res)=>{ 
    res.sendFile(__dirname+'/public/canvas_img.html')
});


app.post('/canvas_img', (req, res) => {
    console.log('canvas_img' +req);
pool.getConnection((err,conn)=>{
    const query_str ='select * from animals where rid=4;'
    conn.query(query_str, (error, rows, feilds)=>{
        if(error){
            conn.release();
            console.dir(error)
            res.status(401).json('query failed')
            return;
        }
        if(res){
        const reply = {
            'result' : rows
        }
        res.status(200).json(reply);
        conn.release();
    }
    })
})
});
app.listen(3050, ()=>{
    console.log('3050번 듣고있습니다.');
});

// app.post('/canvas_img', (req, res) => {

// })