var express = require('express')
var MySqlDAO = require("./MySqlDao")
var app = express()
var MongoDAO = require("./MongoDAO")
var ejs = require('ejs')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded())

app.set('view engine', 'ejs')


app.get('/', (req, res)=> {
  res.render('Main_Menu')
})

//STUDENTS SECTION
app.get('/liststudent', (req, res)=>{
  MySqlDAO.getStudents()
  .then((result) => {
      console.log("ok")
       res.render("liststudent", {students:result})
  })
  .catch((error) => {
      res.send(error)
  })
})

//add student database
app.get('/addstudents', (req, res)=>{
  res.render("addstudent")
})

app.post('/addstudents', (req, res) => {
  MySqlDAO.addStudent(req.body)
  .then((data) => {
      res.redirect('/liststudent')
      console.log("add")
  })
  .catch((error) => {
      res.send(error)
      res.redirect('/liststudent')
      console.log("not")
  })

})
//delete from student database
app.get('/delete/:sid', (req, res) => {
  MySqlDAO.deleteStudent(req.params.sid)
      .then((data) => {
          if(data.affectedRows == 0) {
              res.send("doesn't exist")
          }
          if(errno = 1451)
            {
              res.send("can't delete, student is studying a module")
            }
          else{
          res.send("student " + res.params.sid + " deleted")
          res.redirect('/liststudent')
          }
      })
      .catch((error) => {
          res.send(error)
      })

})
///////////////////////////////////////////////////////////
//MODULE SECTION
//show all modules in database
app.get('/listmodule', (req, res) => {
  MySqlDAO.getModule()
  .then((data) => {
      console.log(data)
      res.render('listmodule', { module: data })
  })
  .catch((error) => {
      res.send(error)
  })
})
//find a student
app.get('/module_students/:mid', (req, res) => {
  MySqlDAO.findModule(req.params.mid)
      .then((data) => {
          if (data.length == 0) {
              res.send("student " + res.params.mid + " doesn't exist")
          }
          else {
              res.render('module_students', { Mod_students: data })
          }
      })
      .catch((error) => {
          res.send(error)
      })
})
//edit module
app.get("/updatemodule/:mid", (req, res) => {
  res.render("updatemodule")
})
//edit module database
app.post('/updatemodule/:mid', (req, res) => {
 MySqlDAO.editModule({ sid: req.body.mid, sid: req.body.name, sid: req.body.credits})
 .then((data) => {
  res.redirect('/listmodule')
})
.catch((error) => {
  res.send(error)
})

})


//////////////////////////////////////
//lecturers
//gets all Lecturers in database
app.get('/listlecturer', (req, res)=>{
  MongoDAO.getLecturers()
  .then((data) => {
      console.log(data)
      res.render("lecturer", {lecturers: data })
  })
  .catch((error)=> {
      res.send(error)
  })
  
})

//add Lecturer
app.get('/addLecturer', (req, res)=>{
  res.render('addLecturer')
})

app.post('/addLecturer', (req, res) => {
    MongoDAO.addLecturer(req.body)
    .then((data) => {
        res.redirect('/listlecturer')
    })
    .catch((error) => {
        res.send(error)
    })

})


app.listen(3004, () => {
    console.log("Listening on port 3004...")
})