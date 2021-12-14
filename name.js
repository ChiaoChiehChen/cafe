import axios from 'axios'

export default async (event) => {
  console.log(event)
  const name = event.message.text.replace('!name ', '')
  if (event.message.type === 'text' && event.message.text.startsWith('!name ')) {
    try {
      const { data } = await axios.get('https://cafenomad.tw/api/v1.2/cafes/taipei')
      for (let i = 0; i <= data.length; i++) {
        if (data[i].name === name) {
          if (data[i].mrt === '' || data[i].open_time === '') {
            data[i].mrt = '尚未更新捷運站資訊'
            data[i].open_time = '尚未更新營業資訊'
          }
          // console.log(cafe.mrt)
          // event.reply(cafe.mrt)
          event.reply([{
            type: 'location',
            title: data[i].name,
            address: data[i].address,
            latitude: data[i].latitude,
            longitude: data[i].longitude
          },
          {
            type: 'text',
            text: '🚇捷運：' + data[i].mrt
          },
          {
            type: 'text',
            text: '營業時間：' + data[i].open_time
          }])
          return
        }
      }
      event.reply('找不到')
    } catch (error) {
      console.log(error)
      event.reply('您可能打錯字摟')
    }
  }
}
