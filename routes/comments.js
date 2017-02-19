var express = require("express");
var router = express.Router({mergeParams:true});
var middleware = require('../middleware');
var Campground = require('../models/campground');
var Comment = require('../models/comment');

router.post('/', middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, camp) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash('error', 'Error while creating comment');
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    req.flash('success', 'Comment successfully added');
                    res.redirect('/campgrounds/' + camp._id);
                }
            })
        }
    });
});

router.get('/new', middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, camp) {
        if (err) {
            req.flash('error', 'Campground was not found');
            console.log(err);
        } else {
            res.render('comments/new', {camp: camp})
        }
    });
});

router.get('/:commentId/edit', middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.commentId, function(err, found){
       if(err){
           req.flash('error', 'Comment was not found');
           res.redirect('back');
       } else{
           res.render('comments/edit', {campground:req.params.id, comment: found});
       }
    });
});

router.put('/:commentId', middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, found){
        if(err){
            req.flash('error', 'Error while updating comment');
            console.log(err);
            res.redirect('back');
        } else{
            req.flash('success', 'Comment successfully updated');
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

router.delete('/:commentId', middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.commentId, function(err){
      if(err){
          res.redirect('back');
      }else{
          req.flash('success', 'Comment successfully deleted');
          res.redirect('/campgrounds/'+req.params.id);
      }
   });
});

module.exports = router;