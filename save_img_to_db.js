const mysql = require('mysql');
const fs = require('fs');
const dbconfig = require('./config/dbconfig.json');
const connection = mysql.createConnection({
    connectionLimit: 10,
    host:dbconfig.host,
    user:dbconfig.user,
    password:dbconfig.password,
    database:dbconfig.database,
    debug:false,
    timezone: '09:00' //서울시간 (표준시보다 +9시간)
});
//사이 공간에 로컬에서 이미지를 읽어서 db에 저장한다
    const dog = {
        img: fs.readFileSync('./dog1.jpg'), //readFile 함수는 비동기. 넘어감. readFileSync는 동기 이미지 불러올때까지 기다림. 
        name: 'Dog1'
    }    

    const query = connection.query('insert into `animals` set ?', dog, (err ,result)=>{
        if(err){
            console.dir(err) //key:value 형태로 보여줌
            return;
        }
        console.log('이미지 db추가 성공');
        console.log(query.sql);
        console.dir(result);
        
    })
    
    const fox = {
        img: fs.readFileSync('./fox.jpg'), //readFile 함수는 비동기. 넘어감. readFileSync는 동기 이미지 불러올때까지 기다림. 
        name: 'fox'
    }    

//dog는 객체인데, ? , 뒤에 dog로 받아주면 key:value로 들어가게 된다. set을 쓰는이유
    const query1 = connection.query('insert into `animals` set ?', fox, (err ,result)=>{
        if(err){
            console.dir(err) //key:value 형태로 보여줌
            return;
        }
        console.log('이미지 db추가 성공');
        console.log(query.sql);
        console.dir(result);
        
    })


connection.end();
