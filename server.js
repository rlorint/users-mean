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

app.post('/api/users', function(req,res,next) {
  var userToAdd = new User();
  userToAdd.id = req.body.id;
  userToAdd.name = req.body.name;
  userToAdd.surname = req.body.surname;
  userToAdd.email =  req.body.email;
  userToAdd.position = req.body.position;
  userToAdd.phone = req.body.phone;
  userToAdd.save(function(err, docs) {
    res.send(docs);
    });
});

app.get('/api/users/:id', function(req, res, next) {
  User.findOne({'id':req.params.id}, function(err, docs) {
    console.log("found user by id", docs);
    res.send(docs);
  });
});

app.put('/api/users/:id', function(req, res, next) {
  User.findOne({'id':req.params.id}, function(err, user) {
    console.log("found user");
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.email =  req.body.email;
    user.position = req.body.position;
    user.phone = req.body.phone;
    user.save(function(err,docs) {
      res.send(docs);
    });
  });
})

app.delete('/api/users/:id', function(req, res, next) {
  console.log("suntem in delete");
  User.remove({'id':req.params.id}, function(err, docs) {
    res.send(docs);
  })
})

app.listen(3000, function() {
  console.log("listening on port ...");
})
