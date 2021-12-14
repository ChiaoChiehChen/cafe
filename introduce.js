export default (event) => {
  try {
    if (event.message.text === '使用介紹') {
      event.reply({
        type: 'text',
        text: '☕How to use?☕\n 輸入\n 1️⃣ !name 咖啡廳店名➔ 即可獲得店家位置及資訊，e.g. !name 蜂巢咖啡\n\n 2️⃣ 不限時➔ 即可獲得隨機8家沒有限時用餐的咖啡廳 \n\n 3️⃣ 傳送 📍目前位置所在地➔ 即可獲得鄰近10公里處的5家咖啡廳。'
      })
    }
  } catch (error) {
    console.log(error)
    event.reply('您可能打錯字摟')
  }
}
