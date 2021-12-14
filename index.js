// 讀取 .env 變數
import 'dotenv/config'
// 引用 linebot 套件
import linebot from 'linebot'
import name from './name.js'
// import nolimitedtime from './no_limited_time.js'
import flex from './flex.js'
import distance from './distance.js'
import introduce from './introduce.js'
import roastedbeans from './roastedbeans.js'
import coffeebeans from './coffeebeans.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('!name ')) {
      name(event)
    } else if (event.message.text === '不限時') {
      flex(event)
    } else if (event.message.text === '使用介紹') {
      introduce(event)
    } else if (event.message.text === '烘焙小知識') {
      roastedbeans(event)
    } else if (event.message.text === '咖啡豆小知識') {
      coffeebeans(event)
    }
  }

  if (event.message.type === 'location') {
    distance(event)
  }
})
