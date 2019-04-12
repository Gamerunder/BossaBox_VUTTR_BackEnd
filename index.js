const app = require('express')()
const consign = require('consign')
const mysql = require('./config/mysql')

app.mysql = mysql

consign()
    .then('./config/middleUse.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Server ON')
})

module.exports = app