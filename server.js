const axios = require('axios');
const { ENTRY } = require('./src/constants');

// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/entries/aggregations', async (req, res) => {
  await axios.get('http://localhost:3001/entries')
  .then(({ data }) => {
    const aggregations = {
      income: 0,
      expense: 0,
      total: 0,
    }

    data.forEach(entry => {
      if (entry.type === ENTRY.INCOME) aggregations.income += entry.amount
      if (entry.type === ENTRY.EXPENSE) aggregations.expense += entry.amount
    });

    aggregations.total = aggregations.income - aggregations.expense;

    res.jsonp(aggregations);
  })
  .catch(error => {
    console.log(error);
  });
})

// Use default router
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001')
})