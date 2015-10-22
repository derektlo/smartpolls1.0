var express     = require('express'),
    bodyParser  = require('body-parser'),
    Poll        = require('../models/poll');

var router      = express.Router();

router
    .use(bodyParser.urlencoded({ extended: true}))
    .use(bodyParser.json())
    .route('/polls')
        .get(function (req, res) {
            Poll.find({userId : id}, function (err, doc) {
                if (err) {

                } else {

                }
            });
        });

router
    .route('/polls/:id')
        .put(function (req, res) {
            // To do
        })
        .delete(function (req, res) {
            Poll.remove({ ObjectId : req.body.objectId }, function (err, doc) {
                res.json(null);
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
