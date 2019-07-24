var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) { 
  //http://localhost:3000?id=5d0f7c49e0e230450cd79e52
  if(req.app.get('dbStatus') != undefined){
    res.send({error:'DB Connection error'});
  }
  
  if(req.query.id != null){
    User.findOne({_id:req.query.id}).then(function(user){
      res.send(user);
    }).catch(function(err){
      console.log(err.message);
      res.send({error:err.message})
    });
  }else{//http://localhost:3000/
    User.find({}).then(function(users){
      res.send(users);
    }).catch(function(err){
    console.log(err.message);
    res.send({error:err.message})
  });
  }
});
router.delete('/:id', function(req, res, next) {//http://localhost:3000/5d0f7c49e0e230450cd79e52
  User.findByIdAndRemove({_id:req.params.id}).then(function(user){
    console.log(user);
    res.send(user);
  }).catch(function(err){
    console.log(err.message);
    res.send({error:err.message})
  });
});
router.put('/:id', function(req, res, next) { // {	"name":"Shinoy"} 
                                              //http://localhost:3000/5d0f7c49e0e230450cd79e52
  User.findByIdAndUpdate({_id:req.params.id},req.body).then(function(user){
    console.log(user);
    User.findOne({_id:req.params.id}).then(function(user){
      res.send(user);
    }).catch(function(err){
      console.log(err.message);
      res.send({error:err.message})
    });
  }).catch(function(err){
    console.log(err.message);
    res.send({error:err.message})
  });
});
router.post('/', function(req, res, next) { //http://localhost:3000
                                            //{	"name":"Shinoy2","age":38,"address":"kerala"}
  User.create(req.body).then(function(user){
     res.send(user);
  }).catch(function(err){
    console.log(err.message);
    res.send({error:err.message})
  });
    //res.render('index', { title: 'Express' });
});
module.exports = router;