const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
app.set("view engine", "ejs");

let items = ["buy food", "cook food", "eat food"];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    let day = date.getDay();
    res.render("list", {listTitle: day, newListItem: items});
});

app.post("/", function (req, res) {
    var item = req.body.inputText;
    console.log(req.body);
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", {listTitle: "Work List", newListItem: workItems})
})

app.post("/work", function (req, res) {
    let item = req.body.inputText
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function (req, res) {
    req.render("about");
})

app.listen(3000, function () {
    console.log("running on port 3000");
})