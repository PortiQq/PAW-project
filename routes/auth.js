const db = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authToken = require('../middleware/authToken.js')
const SECRET_KEY = 'PAWkino';


module.exports = function(app) {

    app.post('/auth/register', async (req,res) =>{
        const { username, email, password } = req.body;

        try {

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const result = await db.query(
        'INSERT INTO cinema_schema.users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, password_hash',
        [username, email, passwordHash]
      );
      res.status(201).json({ user: result.rows[0] });

    } catch (err) {
        console.error(err);
        if (err.code === '23505') { // duplikaty
          return res.status(409).send({ error: 'This email already exists in database.' });
        }
        res.status(500).send('Internal Server Error');
      }
    })


    app.post('/auth/login', async (req, res) => {
        const { email, password } = req.body;
      
        try {
          const result = await db.query('SELECT * FROM cinema_schema.users WHERE email = $1', [email]);
          if (result.rows.length === 0) {
            return res.status(401).send({ error: 'Invalid email or password.' });
          }
          const user = result.rows[0];
      
          const passwordMatch = await bcrypt.compare(password, user.password_hash);
          if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid email or password.' });
          }
      
          // Generowanie tokena JWT
          const token = jwt.sign({ id: user.id, username: user.name, email: user.email }, SECRET_KEY, { expiresIn: '48h' });
      
          // Opcjonalnie: przechowywanie tokena w ciasteczku
          res.cookie('token', token, { httpOnly: true });
      
          res.json({ message: 'Logged in successfully', token });
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      });

      app.post('/auth/logout', (req, res) => {
        res.clearCookie('token');
        res.send({ message: 'Logged out successfully' });
      });

      
      app.get('/protected', authToken, (req, res) => {
        res.send({ message: 'Welcome to the protected route!', user: req.user });
      });
}

