/**
 * Created by lasha.k on 1/21/17.
 */
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
        description: "Bresaola short loin strip steak cow, chicken pancetta pork belly flank salami turducken shankle biltong cupim beef. Flank leberkas spare ribs ham. Chuck leberkas bacon ham hock, cow sirloin beef ribs tail ball tip picanha. Tail pork chop kielbasa shoulder burgdoggen pork belly."
    },
    {
        name: "Desert Mesa",
        image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg",
        description: "Pork belly andouille chicken spare ribs. Shank shoulder pork loin ball tip sirloin jowl prosciutto, ground round landjaeger bacon bresaola capicola tail cow. Meatball frankfurter biltong porchetta pork, ball tip jerky swine turkey tenderloin salami corned beef. Beef ribs pork andouille, sirloin short loin brisket frankfurter alcatra kevin. Cow pork loin biltong tri-tip rump capicola brisket shoulder beef ribs landjaeger."
    },
    {
        name: "Canyon Floor",
        image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
        description: "Bresaola doner beef short ribs meatball pork tenderloin drumstick sausage beef ribs ground round salami turducken capicola. Tongue ground round chicken, cow short loin rump tenderloin corned beef leberkas ham capicola alcatra spare ribs burgdoggen. Beef ribs tail ground round, alcatra cow bacon shoulder ham hock brisket fatback beef chuck jowl venison. Brisket burgdoggen jerky pork loin andouille picanha. Pork loin turducken turkey boudin sausage pork picanha."
    }
];
function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Campgrounds removed');
            data.forEach(function (seed) {
                // Campground.create(seed, function (err, campground) {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         console.log("Campground added");
                //         Comment.create(
                //             {
                //                 text: "This place is great, but I wish there was internet",
                //                 author: "Homer"
                //             }, function (err, comment) {
                //                 if (err) {
                //                     console.log(err);
                //                 } else {
                //                     campground.comments.push(comment);
                //                     campground.save();
                //                     console.log('Created new comment!');
                //                 }
                //             });
                //     }
                // });
            })
        }
    });
}

module.exports = seedDB;

