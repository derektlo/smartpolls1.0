var express     = require('express'),
    bodyParser  = require('body-parser'),
    Poll        = require('../models/poll');

var router      = express.Router();

router
    .use(bodyParser.urlencoded({ extended: true}))
    .use(bodyParser.json())
    .route('/polls')
        .get(function (req, res) {
            console.log("all polls for username: " + req.user.username);
            Poll.find({username : req.user.username}, function (err, doc) {
                if (err) {

                } else {
                    res.json(doc);
                }
            });
        })
        .post(function (req, res){
            var poll = new Poll(req.body);
            if (poll.name.length == 0 || poll.parameters.length == 0) {
                res.json({message : 'There was an error.'});
            } else {
                poll.username = req.user.username;
                poll.save(function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
        // .delete(function (req, res) {
        //     console.log("id: " + req.params.id);
        //     Poll.findByIdAndRemove({ _id : req.params.id }, function (err) {
        //         res.json(null);
        //     });
        // });

router
    .use(bodyParser.urlencoded({ extended: true}))
    .use(bodyParser.json())
    .route('/polls/:id')
        .get(function (req, res) {
            console.log("particular poll");
            Poll.findOne({_id : req.params.id }, function (err, doc) {
                if (err) {
                    Poll.find({username: req.params.id}, function(err, doc){
                        if (err) {
                            console.log("Error");
                        } else {
                            res.json({ result: doc });
                        }
                    });
                } else {
                    console.log("response " + doc);
                    res.json(doc);
                }
            });
        })
        .put(function (req, res) {
            console.log("values: " + req.params.values);
            console.log("values: " + req.body.values);
            if (req.body.values) {
                Poll.findByIdAndUpdate( {_id : req.params.id }, {values : req.body.values}, function(err, doc){
                    if (err) {
                        console.log("Error in update");
                    }
                });
            }
        })
        .delete(function (req, res){
            Poll.findByIdAndRemove({ _id : req.params.id }, function (err) {
                res.json(null);
            });
            console.log("DELETEING");
        });

// router
//     .use(bodyParser.urlencoded({ extended: true}))
//     .use(bodyParser.json())
//     .route('/polls/:username')
//         .get(function (req, res) {
//             console.log("getting polls for username " + req.params.username);
//             Poll.find({username : req.params.username }, function (err, doc) {
//                 if (err) {
//                     console.log("Error");
//                 } else {
//                     console.log("response " + doc);
//                     res.json(doc);
//                 }
//             });
//         });

router
    .route('/createpoll')
        .post(function (req, res) {
            var newPoll =  new Poll();
            newPoll.name = req.body.name;
            newPoll.userId = req.user.objectId;
            newPoll.parameters = req.body.parameters;   // This is an array
            newPoll.values = req.body.values;

            newPoll.save(function(err) {

            });
        });

module.exports = router;
