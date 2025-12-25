import mongoose, {Schema} from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
const key:any= process.env.mongouri
try{
    const stuff = await mongoose.connect(key)
    // console.log(stuff)
}
catch(err:any){
    console.log(err.message)
}

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    unique_token:String
})
export const User = mongoose.model('User',userSchema);