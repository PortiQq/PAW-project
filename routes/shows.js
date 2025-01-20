const db = require('../db.js');
const bodyParser = require("body-parser");

module.exports = function(app) {

    app.get('/show', async (req, res) => {
        res.send('Show must go on!')
      })

    app.get('/shows', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM cinema_schema.shows');
        if (result.rows.length === 0) {
            return res.status(404).send({ error: 'No shows in database!' });
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
    });

    app.get('/shows/:id', async (req,res) => {
        const id = req.params.id;
        try {   //TODO: rozszerzyć kwerendę o dane filmu
            const result = await db.query(`
                SELECT * FROM cinema_schema.shows
                WHERE id=$1`, [id]
                );

            if (result.rows.length === 0) {
                return res.status(404).send({ error: 'Show not found!' });
            }

            res.json(result.rows[0]);
          } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          }
    });

    app.get('/futureshows', async (req, res) => {
        try {
            const now = new Date().toISOString();
            const result = await db.query(`
                SELECT * FROM cinema_schema.shows
                WHERE date > $1`, [now]
                );
            if (result.rows.length === 0) {
                return res.status(404).send({ error: 'No shows in database!' });
            }
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        });
    

    app.post('/shows/add', bodyParser.json(), async (req,res) => {
    
        try{
        const {movie_id, date} = req.body;

        if (!movie_id || !date) {
            return res.status(400).send({ error: 'movie_id, date are required fields' });
            }

        const result = await db.query(
            `INSERT INTO cinema_schema.shows (movie_id, date)
            VALUES ($1, $2) RETURNING *`,
            [movie_id, date]
        );
        res.status(201).send(result.rows[0]);

        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });

}