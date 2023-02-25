//importing db
const db=require('./db');

//registration
const register=(username,password,confirmpassword,email,phone)=>{
    return db.Customer.findOne({email}).then(
        customer=>{
            if(customer){
                return{
                    status:false,
                    statusCode:401,
                    message:"email id already exists"
                }
            }
            else{
                const newCustomer=new db.Customer({
                    username:username,
                    password:password,
                    confirmpassword:confirmpassword,
                    email:email,
                    phone:phone
                })
                newCustomer.save();
                return{
                    status:true,
                    statusCode:200,
                    message:"Registration successful"
                }
            }
        }
    )
}

//login
const login=(email,password)=>{
    return db.Customer.findOne({email,password}).then(
        customer=>{
            if(customer){
                return{
                    status:true,
                    statusCode:200,
                    email:customer.email,
                    message:"Login successful"
                }
            }
            else{
                return{
                    status:false,
                    statusCode:401,
                    message:"Invalid login credentials"
                }
            }
        }
    )
}

const addBooking=(email,add)=>{
    return db.Customer.findOne({email}).then(
        customer=>{
            if(customer){
                customer.addb.push({
                    email:"email",
                    e:email,
                    add,
                    add:"add"
                })
                customer.save();
                return{
                    status:true,
                    statusCode:200,
                    message:"ticket booking successful"
                }
            }
            else{
                return{
                    status:false,
                    statusCode:401,
                    message:"ticket was not booked"
                }
            }
        }
    )
}




const trainTime=(from,to)=>{
    
    return db.TrainData.findOne({from,to}).then(
        time=>{
            if(time){
                return{
                    status:true,
                    statusCode:200,
                    message:"access successful",
                    time:time.data
                }
            }
            else{
                return{
                    status:false,
                    statusCode:401,
                    message:"Couldnot access data"
                }
            }
        }
    )
}











//exporting
module.exports={
    register,
    login,
    trainTime,
    addBooking
}