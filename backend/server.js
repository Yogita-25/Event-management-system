const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const eventRoute = require("./controllers/event");
const userRoute = require("./controllers/user");

app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);

});


//app middleware for get to restrcit.

/*app.use((req, res, next)=>{
    //console.log(req.method,req.path)
    
    if(req.method=="GET"){
        res.send('GET requests are disabled');
    }
    else{
        next()
    }
});
*/


//Maintainence work

// app.use((req,res,next)=>{

//     res.send('under maintainence')
// })

app.use('/events',eventRoute);
app.use('/users',userRoute);

const bcrypt = require('bcryptjs');
const myFunction = async()=>{
const password = 'Hello123'
const hashedPassword = await bcrypt.hash(password, 8)

const isMatch = await bcrypt.compare('Hell0o123',hashedPassword)
}

const jwt = require('jsonwebtoken');
const myFunc = async()=>{
const token = jwt.sign({_id: 'hello123' },'secretbyvipul',{expiresIn:'10 day'});

const data = jwt.verify(token,'secretbyvipul');
}
