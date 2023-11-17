const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
 

let port = 3000;

app.listen(port, ()=> {
    console.log("app listening");
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


let posts = [
    {
        id:uuidv4(),
        username: "Sayan",
        content: "no"
    },
    {
        id:uuidv4(),
        username: "Souvik",
        content: "sreha"
    },
    {
        id:uuidv4(),
        username: "Ankan",
        content: "nona"
    }
]

app.get("/posts", (req, res)=> {            // /post likhle webapp ar home page a jawa
    res.render("home.ejs", {posts});        
    console.log('sayan')
});

app.get("/posts/new", (req, res)=> {        // home ar creat post a click korle /posts/new a get request patahabe anchor tag, form show ar jonno
    res.render("form.ejs")
})

app.get("/posts/:id", (req, res)=> {        // per post click korle /posts/:id te get req pathale showpost.ejs render hobe
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id)  // id basis a post find 
    res.render("showPost.ejs", {post})
})

app.post("/posts", (req, res)=> {           // form submit a post req jabe r redirect hobe home page a 
    let {username, content} = req.body;
    let id = uuidv4()
    posts.push({id, username, content});
    res.redirect("/posts")  //by default get request ai jabe
});

app.get("/posts/:id/edit", (req, res)=> {   // edit btn click korle get req jabe and edit post .ejs show hobe
    let {id} = req.params;
    let post = posts.find((p)=> id==p.id)  //id basis a post find 
    res.render("editPost.ejs", {post})
})

app.patch("/posts/:id", (req, res)=> {      //edit post page ar submit btn a click korle /posts/id te patch req jabe and redirect hobe main home page a
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id===p.id)  //id basis a post find 
    post.content = newContent;
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res)=> {     // home ar delete btn a click korle /posts/id te delete req jabe and post delet hobe
    let {id} = req.params;
    posts = posts.filter((p)=> id!==p.id)  //id basis a post find 
    res.redirect("/posts");
});