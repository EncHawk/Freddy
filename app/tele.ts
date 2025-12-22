// @ts-nocheck
import { Telegraf, session, Scenes, Markup } from 'telegraf'
import dotenv from 'dotenv'
import {pollIssues} from './test'
dotenv.config()

const key = process.env.telegram_api
console.log(key)
interface SessionData {
  Repos: string[]
  CurrentAction: 'monitor' | 'list' | 'remove' | 'analyse' | null
}

type CurrContext = Scenes.SceneContext<SessionData>

//declaring the scenes. 
const HomeScene = new Scenes.BaseScene<CurrContext>('HomeScene')

HomeScene.enter(async (ctx) => {
  ctx.session ??= { Repos: [], CurrentAction: null }

  await ctx.reply(
`Welcome to Freddy Bot.

Commands:
/monitor — add a GitHub repo  
/list — list monitored repos  
/remove — remove a repo  
/analyse — analyse a repo`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback('Monitor a repo', 'Monitor'),
          Markup.button.callback('List your repos', 'List'),
        ],
        [
          Markup.button.callback('Remove a repo', 'Remove'),
          Markup.button.callback('Analyse a repo', 'Analyse'),
        ],
      ]),
    }
  )
})


const stage = new Scenes.Stage<CurrContext>([HomeScene])


const bot = new Telegraf<CurrContext>("8328045325:AAEZJDHB0FatE8EkCsY_usE06Fvx8YfsH6w")

bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {
  ctx.session ??= { Repos: [], CurrentAction: null }
  ctx.reply('Welcome to feddy bot, say /start to get going!')
  ctx.scene.enter('HomeScene')
})

HomeScene.action('Monitor', async (ctx) => {
  await ctx.answerCbQuery()
  ctx.session ??= { Repos: [], CurrentAction: 'monitor' }
  ctx.session.CurrentAction = 'monitor'
  await ctx.reply('Send a valid public GitHub repo URL.')
})

HomeScene.action('List', async (ctx) => {
  await ctx.answerCbQuery()
  const repos = ctx.session?.Repos ?? []
  await ctx.reply(repos.length ? JSON.stringify(repos) : 'No repos monitored.')
  return ctx.scene.enter("HomeScene")
})

HomeScene.action('Remove', async (ctx) => {
  await ctx.answerCbQuery()
  ctx.session ??= { Repos: [], CurrentAction: null }
  ctx.session.CurrentAction = 'remove'
  await ctx.reply('Send the repo name or org to remove.')
})

HomeScene.action('Analyse', async (ctx) => {
  await ctx.answerCbQuery()
  ctx.session ??= { Repos: [], CurrentAction: null }
  ctx.session.CurrentAction = 'analyse'
  await ctx.reply('Which repo do you want to analyse?')
})

/* ───────────── TEXT HANDLER ───────────── */

bot.on('text', async (ctx) => {
  ctx.session??={ Repos: [], CurrentAction: null }
  ctx.session.Repos??=[]
  const text = ctx.text.trim()

  switch (ctx.session.CurrentAction) {
    case 'monitor': {
      if (!text.startsWith('https://github.com/')) {
        ctx.session.CurrentAction = null
        return ctx.reply('Invalid GitHub URL.')
      }
      ctx.session.Repos.push(text)
      ctx.session.CurrentAction = null
      ctx.reply(`Repo added:\n${text}`)
      return await ctx.scene.enter('HomeScene')
    }

    case 'remove': {
      ctx.session.Repos = ctx.session.Repos.filter(repo => !repo.includes(text))
      ctx.session.CurrentAction = null
      ctx.reply(
        ctx.session.Repos.length
          ? JSON.stringify(ctx.session.Repos, null, 2)
          : `Successfully removed ${text}`
      )
      return await ctx.scene.enter('HomeScene')
    }

    case 'analyse': {
      ctx.session.CurrentAction = null
      // ctx.reply('Analysis pipeline coming soon.')
      const repositories = ctx.session.Repos
      const result = await Promise.all(
        repositories.map(async(repo)=>{
          const response = await pollIssues(repo)
          if(!response){
            return ""
          }
          return response
        })
      )
      ctx.reply(`response found :${JSON.stringify(result)}`)
      // pollIssues(ctx.session.Repos)
      return await ctx.scene.enter('HomeScene')
    }
  }
})
// bot.on('')
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))