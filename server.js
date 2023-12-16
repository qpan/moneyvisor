const axios = require('axios');
const { groupBy, first } = require('lodash');

// server.js
const jsonServer = require('json-server');
const { JSON_SERVER_URL, JSON_SERVER_PORT } = require('./src/constants');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/entries/aggregations', async (req, res) => {
  try {
    const { data: entries } = await axios.get(`${JSON_SERVER_URL}/entries`);
    const aggregations = {
      income: 0,
      expense: 0,
      total: 0,
    }

    const { data: types } = await axios.get(`${JSON_SERVER_URL}/types`);
    const typesGroupById = groupBy(types, 'id');

    entries.forEach(entry => {
      const { name } = first(typesGroupById[entry.typeId]);
      aggregations[name] += entry.amount;
    });

    aggregations.total = aggregations.income - aggregations.expense;

    res.jsonp(aggregations);
  } catch(error) {
    console.log(error);
  }
})

// Use default router
server.use(router)
server.listen(3001, () => {
  console.log(`JSON Server is running on port ${JSON_SERVER_PORT}`)
})