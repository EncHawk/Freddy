import {Response,Request,NextFunction} from 'express'

export const errorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(err.stack)
    return res.status(503).send({
        success:"false",
        msg:"Something went wrong. We're working on it Hang tight."
    })
}