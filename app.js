const https = require('https')
const cheerio = require('cheerio')
const fs = require('fs')


const getPic = (id, csrf, cookie) => {
    return new Promise((resolve, reject) => {
        let options = {
            hostname: `api.500px.com`,
            path: `/v1/photos?image_size%5B%5D=1&image_size%5B%5D=2&image_size%5B%5D=32&image_size%5B%5D=31&image_size%5B%5D=33&image_size%5B%5D=34&image_size%5B%5D=35&image_size%5B%5D=36&image_size%5B%5D=2048&image_size%5B%5D=4&image_size%5B%5D=14&include_tags=true&include_licensing=true&include_releases=true&expanded_user_info=true&is_following=true&ids=${id}`,
            headers: {
               'Accept': '*/*',
                'Cookie': cookie,
                'X-CSRF-Token': csrf
            }
        }
        let req = https.request(options, (res) => {
            res.setEncoding('utf8')
            let data = ''
            res.on('data', c => data += c)
            res.on('end', () => resolve(data))
        })
        req.end()
    })
}

const sstart = async () => {
    let URL = process.argv[2] || 'https://500px.com/photo/181500709/tokyo-city-by-takashi-yasui?from=following&user_id=20089549'
    let patt1 = /photo\/([^\/]*)\//
    let id = parseInt(URL.match(patt1)[1])

    let authInfo = fs.readFileSync('./auth1').toString().split('\n').filter(x => x)
    if (authInfo.length < 2)
        return console.log('need for auth')

    let data = await getPic(id, authInfo[0], authInfo[1])
    data = JSON.parse(data)
    if (data.error) return console.log(data)

    if (!data.photos || !data.photos[id]) return console.log(`not found id: ${id}`)
    let picArr = data.photos[id].images
    let picUrl = picArr[picArr.length - 1]
    console.log(picUrl)

}

sstart()


// const getData = (key, auth, cookie) => {
//     return new Promise((resolve, reject) => {
//         let options = {
//             hostname: 'webapi.500px.com',
//             path: `/home/following?next_page=${key}&rpp=10`,
//             headers: {
//                 'Accept': 'application/json, text/javascript, */*; q=0.01',
//                 'AUTHORIZATION': auth,
//                 'Cookie': cookie,
//                 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36'
//             }
//         }
//         let req = https.request(options, (res) => {
//             res.setEncoding('utf8')
//             let data = ''
//             res.on('data', (c) => data += c)
//             res.on('end', () => resolve(data))
//         })
//         req.end()
//     })
// } 
// 
// const start = async () => {
//     /*
//      * 从url中提取出图片id 和页面key
//      */
//     let URL = process.argv[2] || 'https://500px.com/photo/181302305/untitled-by-gabriela-tulian?current_page=4743987495669071872ACYABc4UJVWgKWoA&from=following&user_id=20089549'
//     let patt1 = /photo\/([^\/]*)\//
//     let patt2 = /current_page=([^&]*)&/
//     let id = parseInt(URL.match(patt1)[1])
//     let key = URL.match(patt2)[1]
// 
//     /*
//      * 从auth 文件中提取出auth和cookie
//      */
//     let authInfo = fs.readFileSync('./auth').toString().split('\n').filter(x => x)
//     if (authInfo.length < 2)
//         return console.log('need for auth')
// 
//     /*
//      * 从500px 网站获取图片信息
//      */
//     let data = await getData(key, authInfo[0], authInfo[1])
//     data = JSON.parse(data)
//     if (data.error) return console.log(data)
// 
//     /*
//      * 筛选出图片url
//      */
//     let item = data.activities.filter((it) => it.object_item_id === id)
//     if (item.length > 0) {
//         let url = item[0].object.images
//         console.log(url[url.length - 1])
//     } else {
//         console.log(`not found id: ${id}`)
//     }
// }
// 
// start()
