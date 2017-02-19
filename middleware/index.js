var Campground = require('../models/campground');
var Comment = require('../models/comment');

var middlewareObj = {
    checkCampOwnership:function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash("error", "Campground was not found");
                    res.redirect('back');
                }else{
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error", "You do not have permission to do that");
                        res.redirect("back");
                    };
                }
            });
        }else{
            res.redirect("back");
        }
    },
    checkCommentOwnership:function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.commentId, function(err, foundComment){
                if(err){
                    req.flash("error", "Comment was not found");
                    res.redirect('back');
                }else{
                    if(foundComment.author.id.equals(req.user._id)){
                        next()
                    }else{
                        req.flash("error", "You do not have permission to do that");
                        res.redirect("back");
                    };
                }
            });
        }else{
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }
    },
    isLoggedIn:function(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You need to be logged in to do that");
        res.redirect('/login');
    }
};

module.exports = middlewareObj;