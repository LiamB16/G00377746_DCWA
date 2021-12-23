const MongoClient = require('mongodb').MongoClient

var coll;

MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        db = client.db('LecturersDB')
        coll = db.collection('lecturers')
    })
    .catch((error) => {
        console.log(error.message)
    })

    function getLecturers()
    {
        return new Promise((resolve, reject) => {
            var cursor = coll.find()
            cursor.toArray()
            .then((data)=> {
               resolve(data)
            })
            .catch((error) => {
               reject(error)
            })
        })
    }
    function addLecturer() {
        return new Promise((resolve, reject) =>{
            coll.insertOne()
            .then((data) =>{
                resolve(data)
            })
            .catch((error) => {
                if(error.code == 11000)
                {
                    resolve.send("ERROR: Lecturer "+ req.body._id + " already exists")
                }
                 //checks for conditions on screen
                 if(_Lid < 4)
                 {
                     resolve.send("Invalid: Lecturer ID is ess than 4 characters")
                 }
                 if(_name.length < 5 )
                 {
                     resolve.send("Invalid: Lecturer name is too short")
                 }
                 if(_dept.length != 4)
                 {
                     resolve.send("invalid: deptartment name is not 4 characters")
                 }
                console.log(error)
                reject(error)
            })
        })
    }
    module.exports = { getLecturers, addLecturer }
