var express = require('express')
var app = express()
const path=require('path')
app.set('view engine', 'pug')
//Instructs the app to get static files relative to the root directory
app.use(express.static(path.join(__dirname, '/')))

app.get('/', (req, res) => {
    try {
        res.render('game', { title: 'Hey', message: 'Hello there!' })
    } catch(e) {
        console.log(e.message)
    }
  })

/*app.get('/', function (req, res) {
  res.send('hello world')
})*/


app.listen(3000)