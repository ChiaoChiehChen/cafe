import axios from 'axios'

export default async (event) => {
  try {
    // const time = event.message.text.replace('不限時', '')
    const results = []
    const { data } = await axios.get('https://cafenomad.tw/api/v1.2/cafes/taipei')
    for (const cafe of data) {
      if (cafe.limited_time === 'no') {
        results.push(cafe.name)

        if (results.length >= 5) {
          break
        }
      }
    }
    console.log(results)
    if (results.length > 0) {
      event.reply(results)
    } else {
      event.reply('找不到')
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
