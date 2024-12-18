const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})


require('./routing.js')(app);

app.get('/api', (req, res) => res.send('api test'));