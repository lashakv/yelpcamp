var express = require("express");
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

router.get('/', function (req, res) {
    Campground.find({}, function (error, camps) {
        if (error) {
            console.log('error');
        } else {
            res.render('campgrounds/index', {
                campgrounds: camps,
                currentUser: req.user
            })
        }
    });

});

router.post('/', middleware.isLoggedIn, function (req, res) {
    req.user
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    console.log(req.user)
    Campground.create(
        {name: req.body.name, price: req.body.price, image: req.body.image, description: req.body.description, author: author},

        function (err, newCamp) {
            if (err) {
                console.log('error');
            } else {
                console.log(newCamp);
            }
        }
    );
    res.redirect('/campgrounds');
});

router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function (err, camp) {
        if (err) {
            console.log("error");
        } else {
            console.log(camp);
            res.render("campgrounds/show", {camp: camp});
        }
    });
});

router.get('/:id/edit', middleware.checkCampOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campgrounds/edit', {campground: foundCampground})
    })
});

router.put('/:id', middleware.checkCampOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

router.delete('/:id', middleware.checkCampOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds')
        }
    });
});

module.exports = router;