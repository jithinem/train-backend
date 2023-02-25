//importing mongoose
const mongoose=require('mongoose');

//connecting with database
mongoose.connect('mongodb://localhost:27017/TrainServer');

//creating a model
const Customer=mongoose.model('customer',{
    username:String,
    password:String,
    confirmpassword:String,
    email:String,
    phone:Number,
    addb:[]
})
const TrainData=mongoose.model('TrainData',{
    from:String,
    to:String,
    data:[]
})

//exporting
module.exports={
    Customer,
    TrainData
}