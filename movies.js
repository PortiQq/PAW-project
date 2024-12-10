const db = require('./db.js');

module.exports = function(app) {

app.get('/helloworld', (req, res) => {
    res.send('Hello World!')
  })
  
  app.get('/movies', async (req, res) => {
      try {
        const result = await db.query('SELECT * FROM cinema_schema.movies');
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });

}