const express = require('express')
const db = require('./db');
const app = express()
const port = 3000

app.get('/helloworld', (req, res) => {
  res.send('Hello World!')
})

app.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM test_schema.test');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
