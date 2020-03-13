const express = require('express')
const fs = require('fs')
const app = express()
const router = require('./router.js')
var bodyParser = require('body-parser') // body-parser 解析表单 post 请求体


app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))

app.engine('html', require('express-art-template'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(router)

app.listen(3000, () => {
    console.log('running at 3000...')
})