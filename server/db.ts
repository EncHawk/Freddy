import mongoose, {Schema} from 'mongoose';
import dotenv from 'dotenv'
import{MongoUrl} from './globals'

dotenv.config()

try{
    const stuff = await mongoose.connect(MongoUrl)
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