const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const _ = require("lodash");

// Setting up the environment
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var posts = [];

const homeContent = "Hey Guys welcome to our blog"
const aboutContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
const contactContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

app.get("/", function (req, res) {
    res.render("home", {
        textMaster: homeContent,
        posts: posts
    });
});

app.get("/about", function (req, res) {
    res.render("about", { AboutInformation: aboutContent })
});

app.get("/contact", function (req, res) {
    res.render("contact", { contactInformation: contactContent })
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    var post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/")
});

// Show what is written in the 
app.get("/posts/:postName", function (req, res) {
    const reqTitle = _.lowerCase(req.params.postName);
    posts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title);
        if (reqTitle === storedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        }
    });
});

app.listen(3000, function () {
    console.log("Running");
});