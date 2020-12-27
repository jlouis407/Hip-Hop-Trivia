
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/quiz.html", function(req, res){

    var plyr = req.body.player;
    res.render("questions.ejs", {playerName: plyr});
});

app.post("/results.html", function(req, res){
    var points = 0;
    var q1_answer  = req.body.q1;
    var q2_answer = req.body.q2;
    var q3_answer = req.body.q3;
    var q4_answer = req.body.q4;
    var q5_answer = req.body.q5;
    
    if (q1_answer === "q1-choice2"){
        points++;
    }

    if(q2_answer === "q2-choice4"){
        points++;
    }

    if (q3_answer === "q3-choice1"){
        points++;
    }

    if (q4_answer === "q4-choice3"){
        points++;
    }

    if (q5_answer === "q5-choice2"){
        points++;
    }

    res.render("score.ejs", {score: points});

});




