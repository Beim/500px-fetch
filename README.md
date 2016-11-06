# usage

获取[500px](https://500px.com) 网站上的高清图片

auth1 中填入 `X-CSRF-Token` 和 `Cookie`
(浏览器F12, 从photos?imagee.... 开头的XHR的 Request Header 中找到这两个参数, 第一行填入X-CSRF-Token, 第二行填入Cookie)

运行
`$ node --harmony-async-await app.js 'xxx'`

xxx为点开图片时浏览器显示的URL

