const express = require('express')
const path = require('path');
const authToken = require('./middleware/authToken.js');
const authAdmin = require('./middleware/authAdmin.js');

const app = express()
const port = 3000

app.use(express.json());
require('./routing.js')(app);
app.use(express.static(path.join(__dirname, '/public')));

app.get('/movies', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/movies.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/register.html'));
});
app.get('/shows', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/shows.html'));
});
app.get('/user-panel', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/user-panel.html'));
});
app.get('/admin', authToken, authAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '/public/admin.html'));
});

app.use((req, res) =>{
  res.status(404);
  res.send(`<h1>Error 404: Page not found</h1>`);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})




app.get('/api', (req, res) => res.send('api test'));