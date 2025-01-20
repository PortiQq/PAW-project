module.exports = function(app) {

    require('./routes/movies.js')(app);
    require('./routes/shows.js')(app);
    require('./routes/auth.js')(app);
    require('./routes/reservations.js')(app);

    app.get("/api",(req, res) =>{

        res.json({"test response": ["You have successfully connected to API!"]});

    })

}