/**
 * Created by lasha.k on 1/21/17.
 */
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


module.exports = mongoose.model('Comment', commentSchema);