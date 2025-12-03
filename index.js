const express = require("express");
const mongoose= require("mongoose");
const app = express ();
const Article = require("./models/Article");

mongoose.connect("mongodb+srv://rimeh:09091997AHRahr@cluster0.b0okjak.mongodb.net/?appName=Cluster0"

).then( () => {
console.log("connected successfully");
})
.catch( (error) => {
    console.log("error with connecting with the data base", error);
});
app.use(express.json());
app.get("/hello", (req,res) => {
res.send("hello");
});
app.get("/") , (req,res) => {
    res.send("hello in node js project");
}
app.get("/numbers", (req,res) => {
    let number = "";
    for (let i=0; i<=100; i++){
        number =number + i + "-";
    }
//res.send(`les nombre est: ${number}`);
//res.send("<h1>Hello World</h1>")
//res.send(__dirname + "/views/numbers.html")
//res.sendFile(__dirname + "/views/numbers.html")
res.render("numbers.ejs", {
    name: "Rimeh",
    numbers: number
});
});
app.get("/findSummation/:number1/:number2" , (req,res) => {
const num1 = req.params.number1;
const num2 = req.params.number2;
const total = Number(num1) + Number(num2) ;
res.send(`the total is ${total}`);
});
app.get("/sayHello" , (req,res) => {
//console.log(req.body);
console.log(req.query);
res.send(`hello ${req.body.name}, age is ${req.query.age} `);
});
app.get("/sayHi" , (req,res) => {
//console.log(req.body);
res.json({
    name: req.body.name,
    age:req.query.age,
    language: "arabic"
})
});
app.put("/test", (req,res) => {
res.send("test");
});
app.delete("/delete", (req,res) => {
res.send("delete");
});
app.post ("/articles", async (req,res) => {
    const newArticle = new Article();
    const articleTitle = req.body.articleTitle;
        const articleBody = req.body.articleBody;
        newArticle.title = articleTitle;
    newArticle.body = articleBody;
    newArticle.numberOfLikes = 0;
   await newArticle.save();
    res.json(newArticle);
});
app.get ("/articles", async (req,res) => {
 const articles = await Article.find();
  res.json(articles);
});
app.get ("/articles/:articleId", async (req,res) => {
 const id = req.params.articleId;
 try{ const article = await Article.findById(id);
      res.json(article);
return;
}
catch(error){
    console.log("error while reading article with id", id);
    return res.send("error");
}
    //const articles = await Article.find();
});
app.delete("/articles/:articleId", async (req, res)=>{
 const id = req.params.articleId;
 try{ const article = await Article.findByIdAndDelete(id);
      res.json(article);
return;
}
catch(error){
    console.log("error while reading article with id", id);
    return res.send("error");
}
});
app.get("/showArticles", async (req,res)=> {
    const articles = await Article.find();
    res.render("articles.ejs", {
        allArticles: articles
    }

    );
});
app.listen(3000,()=>{
    console.log("i am listening in port 3000");
});