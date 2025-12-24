import express from 'express'
import {User} from './db'
import * as zod from 'zod'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { email_id, JWT_Secret, email_pass} from './globals'

const app = express();

const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'outlook', 'yahoo', etc.
  auth: {
    user: email_id,
    pass: email_pass // Use app password, not regular password
  }
});



app.use(express.json());
// app.use(errorHandler)
const saltRounds =12;
// const secret:any= process.env.JWT_Secret



app.listen('8080',()=>{
    console.log('server up and running at 8080')
})

const inputSchema = zod.object({
    name:zod.string(),
    email:zod.string(),
    password:zod.string(),
})


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
    const password = input.password
    const payload = {
        name,
        email,
        password
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
                    const token =  jwt.sign(payload,JWT_Secret)
                    const user = new User({
                        name:input.name,
                        password:hash,
                        email:input.email,
                        unique_token:token              
                    })
                    user.save()
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
    catch(err:any){
        console.log(err.message)
        return res.status(500).send({
            success:"fail",
            msg:"something went wrong try again.",
            sutf:err.message
        })
    }
})

app.post('/api/login',async(req,res)=>{
    const input = req.body
    const password = input.password
    const check = await User.findOne({
        email:input.email,
    })
    if(!check){
        return res.status(400).send({
            success:"false",
            msg:"invalid credentials, try again."
        })
    }
    const hash:any= check?.password
    const correct = await bcrypt.compare(password, hash)
    if(correct){
        const mailOptions ={
            from:email_id,
            to:input.email,
            subject:"Welcome to Freddy Bot! Loads of PR's to be merged together.",
            html:`Hello there! I'm Freddy the OSS bear. Im here to help you achieve the best PR's in town!
                Hoping to see you soon on Telegram, Don't worry, I dont bite :) \n
                https://t.me/FREDDY_OPENSOURCE_BOT \n
                
                signing off, your friendly neighbourhood open source bear,
                Freddy.

            \n \n <p>in all seriousness, freddy bot is a dear project to me since I've always struggled with finding the PR on time</p>
                <p>The whole point is to keep this project as open source as possible and help the beginners get upto speed with the open source culture</p>
                <strong>Although some part of this may seem scary, trust me i use the app too. <br/> I only wish the best for you and every single person that is passionate about open source development</strong>
            `
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
                return res.status(403).send({
                    success:"false",
                    msg:"validation failed, try again."
                })
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).send({
                    success:"true",
                    msg:"validation successful, check your email"
                })
            }
        });
    }
    else{
        return res.status(403).send({
            success:"false",
            msg:"incorrect password. try again or try forgot password."
        })
    }
})