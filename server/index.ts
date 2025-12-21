import express, { response } from 'express'
import {User} from './db'
import { errorHandler } from './errorHandler'
import * as zod from 'zod'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import {Resend} from 'resend'

dotenv.config()

const app = express();

app.use(express.json());
app.use(errorHandler)
const saltRounds =12;
const secret:any= process.env.JWT_Secret
const resend = new Resend(process.env.Resend_Api_Key)


app.listen('8080',()=>{
    console.log('server up and running at 8080')
})

const inputSchema = zod.object({
    name:zod.string(),
    email:zod.string(),
    password:zod.string(),
})

async function emailSender(data:any){
    const {error} = await resend.emails.send({
        from: 'Freddy <freddy@resend.dev>',
        to: [data.email],
        subject: 'Welcome to Freddy!',
        html: `<strong>Cheers to a long future,</strong>
            <p>Here is your token, DO NOT DISCLOSE IT WITH ANYBODY.</p>
            <i>${data?.unique_token}</i>
        `,
    })
    if(error){

        console.log(error.message)
    }
}

app.get('/api/',(req,res)=>{
    return res.status(200).send({
        success:"true",
        message:"all systems working fine. ready for using compute..."
    })
})

app.post('/api/signin', async(req,res)=>{
    const input = req.body
    const name = input.name
    const email = input.email
    const payload = {
        name,
        email
    }
    try{
        const response = await zod.parseAsync(inputSchema,input)
        if(!response){
            return res.status(403).send({
                success:"fail",
                msg:"input invalid, try again."
            })
        }
        else{
            const check = await User.findOne({
                email:input.email,
            })
            if(check){
                return res.status(403).send({
                    success:"false",
                    msg:"Try logging in, you've already signed up."
                })
            }
            try{
                bcrypt.hash(input.password,saltRounds, async(err,hash)=>{
                    if(err){
                        return res.status(500).send({
                            success:"fail",
                            msg:"crypting went wrong try again."
                        })
                    }
                    const token =  jwt.sign(payload,secret)
                    const user = new User({
                        name:input.name,
                        password:hash,
                        email:input.email,
                        unique_token:token              
                    })
                    user.save()
                    emailSender(user)
                    console.log(user)
                    return res.status(200).send({
                        success:"true",
                        msg:"used added successfully, login to receive token",
                    })
                    
                });
                
            }catch(err){
                return res.status(500).send({
                    success:"fail",
                    msg:"crypting went wrong try again."
                })
            }
        }
    }
    catch(err){
        return res.status(500).send({
            success:"fail",
            msg:"something went wrong try again."
        })
    }
})

app.post('/api/login',async(req,res)=>{
    // when user logs in they shd be verified with the db. 
    // using their emails aloen for now(jwt later)
    // further using the resend api we shd send them an email about a certain unique token
    // when they send that token to the app it shd match. simple. NOT JWT.
    // we only need their credentials. no need of token, so if credentials are in the header its enf.
    const input = req.body
    const check = await User.findOne({
        email:input.email,
    })
    const emailSender = async ()=>{
        const {error} = await resend.emails.send({
            from: 'Freddy <freddy@resend.dev>',
            to: [input.email],
            subject: 'Welcome to Freddy!',
            html: `<strong>Cheers to a long future,</strong>
                <p>Here is your token, DO NOT DISCLOSE IT WITH ANYBODY.</p>
                <i>${check?.unique_token}</i>
            `,
        });

        if (error) {
            console.error({ error });
        }
    }
    if(check){
        emailSender();
        return res.status(200).send({
            success:"true",
            msg:"Found user successfully.",
        })
    }
})