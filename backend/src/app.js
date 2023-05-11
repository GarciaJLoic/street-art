// import some node modules for later

const fs = require('node:fs')
const path = require('node:path')
const cookieParser = require('cookie-parser')

const express = require('express')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // on remplie l'objet req.body avec les data envoyer du front ou postman

app.set('views', path.join(__dirname, 'views/articles'))
app.set('view engine', 'ejs')

const cors = require('cors')
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    credentials: true,
    'Access-Control-Allow-Origin':
      process.env.FRONTEND_URL ?? 'http://localhost:5173',
    allowedHeaders: ['Authorization', 'Content-Type', 'sessionId'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
)

const router = require('./router') // on importe notre routeur

app.use(router)
app.use(express.static(path.join(__dirname, '../public')))

// serve REACT APP
console.info('yolo')

const reactIndexFile = path.join(
  __dirname,
  '..',
  '..',
  'frontend',
  'dist',
  'index.html'
)

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'dist')))

  // redirect all requests to the REACT index file

  app.get('*', (req, res) => {
    res.sendFile(reactIndexFile)
  })
}

// ready to export

module.exports = app
