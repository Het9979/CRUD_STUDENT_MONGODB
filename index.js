const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/studentModel");


const db_conn = mongoose.connect("mongodb://localhost:27017/StudentDB");


db_conn.then((data)=>{
    console.log("connected...")
}).catch((err)=>{
    console.log("error")
})

const app = express();


app.use(express.json())


//list all the students
app.get("/api/students", (req,res)=>{
Student.find({},(err,result)=>{
    if(err){
        res.status(500).send(err)
    }
    res.status(200).send(result)
});
});

//list a student
app.get("/api/students/show/:id", (req,res)=>{
    Student.findById(req.params.id,(err,result)=>{
        if(err){
            res.status(500).send(err)
        }
        res.status(200).send(result)
    });
    });
    
    app.delete("/api/students/delete/:id", (req,res)=>{
        Student.remove({_id:req.params.id},(err,result)=>{
            if(err){
                res.status(500).send(err)
            }
            res.status(200).send(result)
        });
        });

        app.put("/api/students/update/:id", (req, res) => {
            let Student = {};
          
            if (req.body.studentid) Student.studentid = req.body.studentid;
            if (req.body.name) Student.name = req.body.name;
            if (req.body.age) Student.age = req.body.age;
            if (req.body.address) Student.address = req.body.address;
          
            Student.updateOne({ _id: req.params.id }, { $set: Student })
              .then(() => {
                res.status(200).send(Student);
              })
              .catch((err) => {
                res.status(500).send(err);
                console.log(err);
              });
          });



app.post("/api/students/add", (req,res)=> {
    //console.log(req.body.name);
    let student = new Student();
    studentid : req.body.studentid;
    name : req.body.name;
    age : req.body.age;
    address : req.body.address;

    student.save().then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        result.status(404).send(err);
    })
});

app.listen(9000, ()=> {
    console.log("listening on port 9000");
})