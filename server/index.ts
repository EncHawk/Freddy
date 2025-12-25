import {User} from './db'
import * as zod from 'zod'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const email_id = process.env.emailid
const email_pass = process.env.emailpass
const JWT_Secret = process.env.jwtsecret

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email_id,
        pass: email_pass
    }
});

const saltRounds = 12;

const inputSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', 'https://frontend-freddy.vercel.app')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    // GET endpoint
    if (req.method === 'GET') {
        return res.status(200).json({
            success: "true",
            message: "all systems working fine. ready for using compute..."
        })
    }

    // POST endpoint for signin
    if (req.method === 'POST') {
        const input = req.body
        
        try {
            const response = await inputSchema.parseAsync(input)
            
            const check = await User.findOne({
                email: input.email,
            })
            
            if (check) {
                return res.status(403).json({
                    success: "false",
                    msg: "Try logging in, you've already signed up."
                })
            }

            const hash = await bcrypt.hash(input.password, saltRounds)
            
            const payload = {
                name: input.name,
                email: input.email,
                password: input.password
            }
            
            const token = jwt.sign(payload, JWT_Secret!)
            
            const user = new User({
                name: input.name,
                password: hash,
                email: input.email,
                unique_token: token              
            })
            
            await user.save()
            console.log(user)
            
            const mailOptions = {
                from: email_id,
                to: input.email,
                subject: "Welcome to Freddy Bot! Loads of PR's to be merged together.",
                html: `Hello there! I'm Freddy the OSS bear. Im here to help you achieve the best PR's in town!
                    Hoping to see you soon on Telegram, Don't worry, I dont bite :) \n
                    https://t.me/FREDDY_OPENSOURCE_BOT \n
                    
                    signing off, your friendly neighbourhood open source bear,
                    Freddy.

                \n \n <p>in all seriousness, freddy bot is a dear project to me since I've always struggled with finding the PR on time</p>
                    <p>The whole point is to keep this project as open source as possible and help the beginners get upto speed with the open source culture</p>
                    <strong>Although some part of this may seem scary, trust me i use the app too. <br/> I only wish the best for you and every single person that is passionate about open source development</strong>
                `
            }
            
            // Send email (non-blocking)
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
            
            return res.status(200).json({
                success: "true",
                msg: "user added successfully, check your email!",
            })
            
        } catch (err: any) {
            console.log(err.message)
            return res.status(500).json({
                success: "fail",
                msg: "something went wrong try again.",
                error: err.message
            })
        }
    }

    return res.status(405).json({ error: 'Method not allowed' })
}
