const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

const {User} = require('./server/db');

app.get('/api/users', function(req, res, next) {
  User.find({}, function(err, docs) {
    console.log("avem rez", docs);
    res.send(docs);
  });
});

app.get('/api/users/:id', function(req, res, next) {
  User.findOne({'id':req.params.id}, function(err, docs) {
    console.log("found user by id", docs);
    res.send(docs);
  });
});

app.post('/api/users', function(req,res,next) {
  new User({id: req.body.id, name: req.body.name,
            surname: req.body.surname, email: req.body.email,
            postions: req.body.position,phone: req.body.phone})
            .save(function(err, docs) {
              console.log("added",docs);
            });
});


app.listen(3000, function() {
  console.log("listening on port ...");
})
