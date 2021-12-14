import axios from 'axios'
import distance from './經緯度間距離.js'

export default async (event) => {
  try {
    const results = []
    const x = event.message.latitude
    const y = event.message.longitude
    const { data } = await axios.get('https://cafenomad.tw/api/v1.2/cafes/taipei')
    for (let i = 0; i <= data.length; i++) {
      // x,y,現在位置(經緯度)
      // 店家位置(經緯度)
      if (distance(x, y, data[i].latitude, data[i].longitude, 'K') < 5) {
        // event.reply(cafe.mrt)
        results.push({
          type: 'location',
          title: data[i].name,
          address: data[i].address,
          latitude: data[i].latitude,
          longitude: data[i].longitude
        })
        console.log(results[0])
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
    console.log(error)
    event.reply('錯誤')
  }
}
