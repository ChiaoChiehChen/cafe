import template from './template/flex.js'
import axios from 'axios'
import fs from 'fs'

export default async (event) => {
  const flex = JSON.parse(JSON.stringify(template))
  const { data } = await axios.get('https://cafenomad.tw/api/v1.2/cafes/taipei')
  const cafeArr = []
  while (cafeArr.length < 8) {
    const randomCafe = Math.round(Math.random() * 1618)
    // console.log(randomCafe)
    // 陣列內 含 隨機數(重複) 或 隨機數的 limited_time===yes => continue(跳過當前，跑下一次)
    if (cafeArr.includes(randomCafe) || data[randomCafe].limited_time === 'yes') {
      continue
    } else {
      cafeArr.push(randomCafe)
      // cafeArr.push({
      //   type: 'location',
      //   title: data[randomCafe],
      //   address: data[randomCafe].address,
      //   latitude: data[randomCafe].latitude,
      //   longitude: data[randomCafe].longitude,
      //   tasty: data[randomCafe].tasty + ''
      // })
    }

    flex.contents.contents.push(
      {
        type: 'bubble',
        size: 'micro',
        hero: {
          type: 'image',
          url: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip11.jpg',
          size: 'full',
          aspectMode: 'cover',
          aspectRatio: '320:213'
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: data[randomCafe].name,
              weight: 'bold',
              size: 'sm',
              wrap: true
            },
            {
              type: 'box',
              layout: 'baseline',
              contents: [
                {
                  type: 'icon',
                  size: 'xs',
                  url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                },
                {
                  type: 'icon',
                  size: 'xs',
                  url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                },
                {
                  type: 'icon',
                  size: 'xs',
                  url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                },
                {
                  type: 'icon',
                  size: 'xs',
                  url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                },
                {
                  type: 'icon',
                  size: 'xs',
                  url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
                },
                {
                  type: 'text',
                  text: '☕評價:' + data[randomCafe].tasty + '',
                  size: 'xs',
                  color: '#8c8c8c',
                  margin: 'md',
                  flex: 0
                }
              ]
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'baseline',
                  spacing: 'sm',
                  contents: [
                    {
                      type: 'text',
                      text: '📍' + data[randomCafe].address,
                      wrap: true,
                      color: '#8c8c8c',
                      size: 'xs',
                      flex: 5
                    }
                  ]
                }
              ]
            }
          ],
          spacing: 'sm',
          paddingAll: '13px'
        },
        action: {
          type: 'message',
          label: 'action',
          text: '!name ' + data[randomCafe].name
        }
      }
    )
    // if (data[randomCafe].tasty === '5') {
    //   flex.contents.contents.body.contents[1].contents[4].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
    //   console.log(flex.contents.contents[0].body.contents[1].contents[4].url)
    // } else if (data[randomCafe].tasty === '3') {
    //   flex.contents.contents.body.contents[1].contents[3].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
    // } else if (data[randomCafe].tasty === '2') {
    //   flex.contents.contents.body.contents[1].contents[2].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
    //   flex.contents.contents.body.contents[1].contents[3].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
    //   flex.contents.contents.body.contents[1].contents[4].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
    // } else if (data[randomCafe].tasty === '1') {
    //   flex.contents.contents.body.contents[1].contents[1].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
    //   flex.contents.contents.body.contents[1].contents[2].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
    //   flex.contents.contents.body.contents[1].contents[3].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
    //   flex.contents.contents.body.contents[1].contents[4].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
    // }
  }
  event.reply(flex)
  // console.log(flex)
  fs.writeFileSync('cafe', JSON.stringify(flex, null, 2))
}
// if (flex.length > 0) {
//   event.reply(flex)
// } else {
//   event.reply('找不到')
// }
