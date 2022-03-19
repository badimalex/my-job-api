const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = process.env.PORT || 3002
var cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
  let products = [
    {id: 1, title: 'product 1', salary: 100, company: 'NY'},
    {id: 2, title: 'product 2', salary: 100, company: 'NY'},
    {id: 3, title: 'product 3', salary: 100, company: 'NY'},
    {id: 4, title: 'product 4', salary: 100, company: 'NY'},
  ]

  if(req.query.price) {
    products = products.filter(product => product.price == req.query.price)
  }

  res.json(products)
})

app.get('/resumes', (req, res) => {
  let products = []

  for (let index = 0; index < 25; index++) {
    products.push({
      id: index+1,
      name: 'Petr' + index,
      experience: 8,
      level: index % 2 == 0 ? 'Senior' : 'Middle',
      tags: index % 2 == 0 ? ['react', 'php', 'typescript'] : ['html', 'css', 'redux']
    })
  }

  if(req.query.tags) {
    let list = [];
    req.query.tags.forEach(tag=> {
      list = list.concat(products.filter(product => product.tags.indexOf(tag) > -1));
    })
    products=list;
  }

  if(req.query.level) {
    products = products.filter(product => product.level == req.query.level)
  }

  res.json(products)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
