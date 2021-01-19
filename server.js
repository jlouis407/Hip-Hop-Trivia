
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/playersDB", {useNewUrlParser: true})

const playerSchema = {
    name: String,
    score: Number
}

const Player = mongoose.model("Player", playerSchema);

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});


/* The handling of the user's responses */

app.post("/results.html", function(req, res){

    var plyr = req.body.player;

    /* The user's quantity of points is initialized to 0 */
    var points = 0;

    /* Each of the user's answers is assigned to the variables below */
    var q1_answer  = req.body.q1;
    var q2_answer = req.body.q2;
    var q3_answer = req.body.q3;
    var q4_answer = req.body.q4;
    var q5_answer = req.body.q5;

    /* Each of the user's answers are evaluated for their accuracy. If an answer is correct, the points are incremented*/
    
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

    /* The score ("points"), resulting from the control flow are rendered on the score page (score.ejs) */

    const player = new Player({
        name: plyr,
        score: points
    });

    player.save();

    res.render("score.ejs", {score: points});

});




