import mongoose, {Schema} from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const connString:any= process.env.Mongo_Url;

try{
    const stuff = await mongoose.connect(connString)
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