const db = require('../db.js');
const authToken = require('../middleware/authToken'); 

module.exports = function(app) {

    app.get('/reservations', async (req, res) => {
          try {
            const result = await db.query('SELECT show_id, user_id FROM cinema_schema.reservations');
            if (result.rows.length === 0) {
                return res.status(404).send({ error: 'No reservations in database!' });
            }
            res.json(result.rows);
          } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          }
        });

    app.get('/reservations/myreservations', authToken, async (req,res) =>{
        try {

          const userId = req.user.id;
            //TODO: rozszerzyć informacje o filmie
            const result = await db.query('SELECT show_id FROM cinema_schema.reservations WHERE user_id = $1', [userId]);
            if (result.rows.length === 0) {
                return res.status(404).send({ error: 'You have no reservations!' });
            }
            res.json(result.rows);
          } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          }
    })

    app.post('/reservations/reserve', authToken, async (req,res) => {
      try{
          const {show_id} = req.body;
          const user_id = req.user.id;
          const now = Date.now(); //TODO: sprawdzanie daty

          if (!show_id) {
              return res.status(400).send({ error: 'show_id is required' });
          }

          const result = await db.query(
              `INSERT INTO cinema_schema.reservations (show_id, user_id)
              VALUES ($1, $2) RETURNING *`,
              [show_id, user_id]
          );
          res.status(201).send(result.rows[0]);
  
          } catch (err) {
            if (err.code === '23505') { // duplikaty
              return res.status(409).send({ error: 'This user already has this reservation.' });
            }
              console.error(err);
              res.status(500).send({ error: 'Internal Server Error' });
          }
  });
}