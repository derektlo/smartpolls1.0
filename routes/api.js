var express     = require('express'),
    bodyParser  = require('body-parser'),
    Poll        = require('../models/poll');

var router      = express.Router();

router
    .use(bodyParser.urlencoded({ extended: true}))
    .use(bodyParser.json())
    .route('/polls')
        .get(function (req, res) {
            console.log("all polls");
            Poll.find({userId : req.user._id}, function (err, doc) {
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
                poll.userId = req.user._id;
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
                    console.log("Error");
                } else {
                    console.log("response " + doc);
                    res.json(doc);
                }
            });
        })
        .put(function (req, res) {
            // To do
        })
        .delete(function (req, res){
            Poll.findByIdAndRemove({ _id : req.params.id }, function (err) {
                res.json(null);
            });
            console.log("DELETEING");
        });

router
    .use(bodyParser.urlencoded({ extended: true}))
    .use(bodyParser.json())
    .route('/polls/:username')
        .get(function (req, res) {
            console.log("getting polls for user");
            Poll.findOne({username : req.params.username }, function (err, doc) {
                if (err) {
                    console.log("Error");
                } else {
                    console.log("response " + doc);
                    res.json(doc);
                }
            });
        });

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
