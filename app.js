//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash')
var array = require('lodash/array');
var object = require('lodash/fp/object');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ejs');

const Entry = mongoose.model('Entry', { 
  title: String,
  post: String 
});


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// let Posts = []

// Entry.forEach(function(i){
  
// })

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/',function(req,res) {
  // res.render('home',{homeText:homeStartingContent,Posts:Posts})
  Entry.find({}, function(err, x){
    res.render('home', {
      homeText: homeStartingContent,
      Posts: x
      });
  });
})

app.get('/about',function(req,res) {
  res.render('about',{aboutText:aboutContent})
})

app.get('/contact',function(req,res) {
  res.render('contact',{contactText:contactContent})
})

app.get('/compose',function(req,res) {
  res.render('compose')
})


app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Entry.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.post
    });
  });
});


  //   Posts.forEach(function(i){
  //     const storedPostName=i.title
  //     if(_.lowerCase(storedPostName)===_.lowerCase(reqPostName)){
  //       console.log("match found")
  //       res.render('post',{i:i})
  //     }
  //     else{
  //       console.log("match not found")
  //     }
  // })
// })

app.post('/compose',function(req,res) {
  const Post = {
    title: req.body.titleMessage,
    post: req.body.postMessage
  }

  const entry = new Entry({ 
    title: req.body.titleMessage,
    post: req.body.postMessage
  });
  entry.save().then(() => console.log('Saved'));


  // Posts.push(Post)
  res.redirect('/')
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
