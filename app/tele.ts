import {Telegraf,session ,Context} from 'telegraf'
import {message} from 'telegraf/filters'
import mongoose from 'mongoose'
import {User} from '../server/db'
import dotenv from 'dotenv'
// import {pollIssues} from './test'
dotenv.config()

const uri:any= process.env.Mongo_Url
async function checkValiditty (token:string){
    const conn = await mongoose.connect(uri)
    if(!conn){
        return 'it couldnt connect ffs'
    }
    const ppl = await User.find({
        unique_token:token
    })
    return ppl
}

interface SessionData{
    Repos: string[],
    allow_store:boolean;
}
interface CurrContext extends Context{
    session?:SessionData
}

const bot=new Telegraf<CurrContext>('8328045325:AAEZJDHB0FatE8EkCsY_usE06Fvx8YfsH6w')
bot.use(session());


bot.start((ctx) => ctx.reply('Welcome'))
let takeIn = 0;
bot.command('monitor',ctx=>{
    ctx.session = {Repos:[],allow_store:false}
    ctx.reply('send a valid url for a repo. (public preferably)') 
    ctx.session.allow_store=true;
})

bot.on('text', ctx => {
    if(takeIn){
        ctx.session ??= { Repos: [], allow_store:true }  // Initialize if undefined
        if(ctx.session?.allow_store){
            ctx.session.Repos.push(ctx.text)
        }
        // ctx.reply(JSON.stringify(ctx.session.Repos))
        ctx.session.allow_store=false;
    }
    else{
        ctx.reply('Freddy is Ready...')
    }  
})

bot.command('list',ctx => {
    ctx.session??={Repos:[],allow_store:false}
    ctx.reply(JSON.stringify(ctx.session.Repos))
})

bot.command('analyse', ctx=> {
    ctx.reply('which repo do you wish to analyse')
    ctx.session??={Repos:[],allow_store:false}
    ctx.reply(JSON.stringify(ctx.session.Repos))
})


bot.command('remove',ctx=>{
    ctx.reply('select the repository to remove.')
    ctx.session??={Repos:[],allow_store:false}
    ctx.reply(JSON.stringify(ctx.session.Repos))
})

bot.launch()



process.once('SIGINT',()=>bot.stop('SIGINT'))
process.once('SIGINT',()=>bot.stop('SIGTERM'))