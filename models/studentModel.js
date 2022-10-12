const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
    studentid:String,
    name:String,
    age:Number,
    address:String,
});


const Student = mongoose.model("students",studentSchema)  // collection name is students

//inside collection we have objects.


module.exports = Student;