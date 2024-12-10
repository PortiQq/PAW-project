const db = require('./db.js');
const bodyParser = require("body-parser");

module.exports = function(app) {

app.get('/helloworld', (req, res) => {
    res.send('Hello World!')
  })
  
  app.get('/movies', async (req, res) => {
      try {
        const result = await db.query('SELECT id, title FROM cinema_schema.movies');
        if (result.rows.length === 0) {
            return res.status(404).send({ error: 'No movies in database!' });
        }
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });


    app.get('/movies/:id', async (req,res) => {
        const id = req.params.id;
        try {
            const result = await db.query(`
                SELECT * FROM cinema_schema.movies 
                WHERE id=$1`, [id]
                );

            if (result.rows.length === 0) {
                return res.status(404).send({ error: 'Movie not found' });
            }

            res.json(result.rows[0]);
          } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          }
    });


    //TODO: sprawdzanie roli admina
    app.post('/movies/add', bodyParser.json(), async (req,res) => {
        try{
    const {title, release_date, description, duration} = req.body;

    if (!title || !release_date) {
        return res.status(400).send({ error: 'title, release_date are required fields' });
    }

    const result = await db.query(
        `INSERT INTO cinema_schema.movies (title, release_date, description, duration)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, release_date, description, duration]
    );
    res.status(201).send(result.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
    });

}