module.exports = function(app) {

    require('./movies.js')(app);

    app.get("/api",(req, res) =>{

        res.json({"test response": ["You have successfully connected to API!"]});

    })

}