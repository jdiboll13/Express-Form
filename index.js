const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  req.checkBody('email', 'You must give your email.').notEmpty()
  req.checkBody('firstName', 'Please provide your first name.').notEmpty()
  const errors = req.getValidationResult()
  if (errors) {
    res.render('index', { errors: errors })
  } else {
    res.render('next', {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mail: req.body.email
    })
  }
})

app.listen(3000, () => {
  console.log("Let's do this!")
})
