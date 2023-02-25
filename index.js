//importing express
const express=require('express');

//importing cors to establish connection between frontend, backend, and mongodb
const cors=require('cors');

//establishing connection between index.js and dataService
const dataService=require('./services/dataService')

//creating an application using express
const app=express();

//specifying origin to the user using cors
app.use(cors({
    origins:'http://localhost:4200'
}))

//for json to js conversion
app.use(express.json());

//setting up a port number
app.listen(3000,()=>{
    console.log('listening on port 3000');
});

//resolving http request for registrattion
app.post('/register',(req,res)=>{
    dataService.register(req.body.username,req.body.password,req.body.confirmpassword,req.body.email,req.body.phone).then(
        result=>{
            res.status(result.statusCode).json(result);
        }
    )
    // res.send('post http request');
})

//resolving http request for login
app.post('/login',(req,res)=>{
    dataService.login(req.body.email,req.body.password).then(
        result=>{
            res.status(result.statusCode).json(result);
        }
    )
})

app.put('/booking',(req,res)=>{
    dataService.addBooking(req.body.email,req.body.add).then(
        result=>{
            res.status(result.statusCode).json(result);
        }
    )
    console.log(req.body.add)
})

//getting train data
app.post('/trainTime',(req,res)=>{
    dataService.trainTime(req.body.from,req.body.to).then(
        result=>{
            res.status(result.statusCode).json(result);
        }
    )
    console.log(req.body.from);
    console.log(req.body.to);    

})


//..........seperate collection for admin login is needed