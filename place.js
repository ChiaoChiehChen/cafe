import distance from '../template/distance.js'
import axios from 'axios'
import flex from '../template/flex.js'

export default async (event) => {
  try {
    const { data } = await axios.get('https://cafenomad.tw/api/v1.2/cafes')
    const myLatitude = event.message.latitude
    const myLongitude = event.message.longitude
    const distanceResults = []

    for (let i = 0; i < data.length; i++) {
      if (distance(myLatitude, myLongitude, data[i].latitude, data[i].longitude, 'K') < 5) {
        // 用 switch 判斷插座，修改資料文字
        // 如果API資料為空的，就顯示 -
        let socket = ' -'
        // API 資料顯示 yes 就改成 有
        switch (data[i].socket) {
          case 'yes':
            socket = ' 有'
            break
          case 'no':
            socket = ' 無'
            break
          case 'maybe':
            socket = ' 可能有'
            break
        }

        distanceResults.push({
          Name: data[i].name,
          index: i,
          address: data[i].address,
          // open_time: data[i].music
          socket,
          url: data[i].url || encodeURI('https://www.google.com/maps/search/?api=1&query=' + data[i].name)
          // url: data[i].url
        })
        distanceResults.sort((a, b) => a.distance - b.distance)
        if (distanceResults.length >= 5) {
          break
        }
      }
    }

    if (distanceResults.length !== 0) {
      for (let i = 0; i < distanceResults.length; i++) {
        flex.contents.contents.push({
          type: 'bubble',
          size: 'micro',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: distanceResults[i].Name,
                weight: 'bold',
                size: 'lg',
                wrap: true,
                style: 'italic'
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
                    text: '4.0',
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
                    layout: 'vertical',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '地址',
                        wrap: true,
                        color: '#336666',
                        size: 'sm',
                        weight: 'bold'
                      },
                      {
                        type: 'text',
                        text: distanceResults[i].address,
                        size: 'xs',
                        color: '#666666',
                        wrap: true
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '營業時間',
                        size: 'sm',
                        color: '#336666',
                        weight: 'bold',
                        offsetTop: 'sm'
                      },
                      {
                        type: 'text',
                        text: '12:00~18:00',
                        size: 'xs',
                        offsetTop: 'xs',
                        margin: 'sm'
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '插座',
                        wrap: false,
                        contents: [
                          {
                            type: 'span',
                            text: '插座',
                            size: 'sm',
                            color: '#336666',
                            weight: 'bold'
                          },
                          {
                            type: 'span',
                            text: distanceResults[i].socket,
                            size: 'xs'
                          }
                        ]
                      },
                      {
                        type: 'button',
                        action: {
                          type: 'uri',
                          label: '觀看更多',
                          uri: distanceResults[i].url
                        },
                        margin: 'sm',
                        height: 'sm'
                      }
                    ]
                  }
                ]
              }
            ],
            spacing: 'sm',
            paddingAll: '14px'
          }
        })
      }
      console.log(distanceResults)
      // if (distanceResults.length !== 0) {
      //   event.reply(flex)
      // } else {
      //   event.reply('附近沒有 可惜')
      // }
      event.reply(flex)
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
