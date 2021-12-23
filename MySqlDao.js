var mysql = require('promise-mysql')

//connects to sql server
var pool =
mysql.createPool({
    connectionLimit : 3,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'collegedb'
    })
    .then(data => {
    pool = data
    console.log("database connected")
    })
    .catch(e => {
    console.log("pool error:" + e)
    
    })

//MODULE FUNCTIONS
    function getModule() {
        return new Promise((resolve, reject)=>{
            pool.query("select * from module")
            .then((data)=> {
               resolve(data)
            })
            .catch((error)=> {
               reject(error)
            })
        });
    }
    function findModule(mid) {
        return new Promise((resolve, reject)=>{
                pool.query(`select s.sid, s.name, s.gpa from student s left join student_module m on s.sid = m.sid where m.mid = "${mid}"`)
            .then((data)=> {
               resolve(data)
            })
            .catch((error)=> {
               reject(error)
            })
        });
    }
    function editModule(mid, name, credit) {
        return new Promise((resolve, reject)=>{
            pool.query(`update module set mid = "${mid}", name = "${name}", credits = "${credit}" where mid = "${mid}"`)
            .then((data)=> {
               resolve(data)
            })
            .catch((error)=> {
               reject(error)
            })
        });
    }

    //STUDENT FUNCTIONS
    //shows all students in database
    var getStudents = function() {
        return new Promise((resolve, reject)=>{
            pool.query("select * from student;")
            .then((data)=> {
                console.log("ok")
               resolve(data)
            })
            .catch((error)=> {
               reject(error)
            })
        });
    }
    function addStudent(){
        return new Promise((resolve, reject)=>{
            pool.query(`insert into student {sid, name, gpa} values, "${sid}", "${name}", "${gpa}"`)
            .then((data)=> {
                resolve(data)
            })
            .catch((error)=> {
                if(error.code == 11000)
                {
                    resolve.send("ERROR: student "+ req.body.sid + " already exists")
                }
                //checks for conditions on screen
                if(sid > 4)
                {
                    resolve.send("Invalid: student sid is more than 4 characters")
                }
                if(name.length < 5 )
                {
                    resolve.send("Invalid: student name is too short")
                }
                if(gpa > 0.0 && gpa < 4.0)
                {
                    resolve.send("invalid: gpa is out of range")
                }
                reject(error)
            })
        })
    }
    //deletes student from database
    function deleteStudent(sid) {
        return new Promise((resolve, reject)=>{
            pool.query(`delete from student where sid = "${sid}"`)
            .then((data)=> {
               resolve(data)
            })
            .catch((error)=> {
               
               reject(error)
            })
        });
    }
    module.exports = { getStudents, deleteStudent, addStudent, getModule, findModule, editModule }