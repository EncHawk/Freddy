// @ts-nocheck
import { Telegraf, session, Scenes, Markup } from 'telegraf'
import dotenv from 'dotenv'
import {pollIssues} from './test'
dotenv.config()

/* ───────────── TYPES ───────────── */

interface SessionData {
  Repos: string[]
  CurrentAction: 'monitor' | 'list' | 'remove' | 'analyse' | null
}

type CurrContext = Scenes.SceneContext<SessionData>

/* ───────────── SCENE ───────────── */

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

/* ───────────── STAGE ───────────── */

const stage = new Scenes.Stage<CurrContext>([HomeScene])

/* ───────────── BOT ───────────── */

const bot = new Telegraf<CurrContext>("8328045325:AAEZJDHB0FatE8EkCsY_usE06Fvx8YfsH6w")

bot.use(session())
bot.use(stage.middleware())

bot.start(async (ctx) => {
  ctx.session ??= { Repos: [], CurrentAction: null }
  ctx.reply('Welcome to feddy bot, say /start to get going!')
  await ctx.scene.enter('HomeScene')
})

/* ───────────── SCENE ACTIONS ───────────── */

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
      ctx.reply('Analysis pipeline coming soon.')
      pollIssues(ctx.session.Repos)
      return await ctx.scene.enter('HomeScene')
    }
  }
})

/* ───────────── LIFECYCLE ───────────── */

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))