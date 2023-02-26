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
                    phone:customer.phone,
                    username:customer.username,
                    id:customer.id,
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

const addBooking=(email,trainNumber,date,start,end,from,to,pass,totalRs)=>{
    return db.Customer.findOne({email}).then(
        customer=>{
            if(customer){
                customer.addb.push({
                    trainNumber,
                    date,
                    start,
                    end,
                    from,
                    to,
                    pass,
                    totalRs,
                    email
                });
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


// const saveChanges=(email,phone,username,ID)=>{
//     return db.Customer.updateOne({ID}).then(
//         customer=>{
//             if(customer){
//                 const newCustomer=new db.Customer({
//                     username:username,
//                     email:email,
//                     phone:phone
//                 })
//                 newCustomer.save();
//                 return{
//                     status:true,
//                     statusCode:200,
//                     message:"updation successful"
//                 }
//             }
//             else{
//                 return{
//                     status:false,
//                     statusCode:401,
//                     message:"Invalid credentials"
//                 }
//             }
//         }
//     )
// }

const getTicket=(email)=>{
    return db.Customer.findOne({email}).then(
        customer=>{
            if(customer){
                return{
                    status:true,
                    statusCode:200,
                    message:"access successful",
                    getTicket:customer.addb
                }
            }
            else{
                return{
                  status:false,
                  statusCode:401,
                  message:"User not found"
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
    addBooking,
    // saveChanges,
    getTicket
}