var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var pets = [
	{name: "Wacky", img: "http://3dogmedia.com/wp-content/uploads/2016/08/120251710-632x3531.jpg"},
	{name: "Bacon", img: "https://boulderinn.com/bldrinn/wp-content/uploads/2010/10/pets-712-X-495.jpg"},
	{name: "Kiwi", img: "https://timedotcom.files.wordpress.com/2017/11/dogs-cats-brain-study.jpg"},
	{name: "Bambu", img: "http://saveapetil.org/wp-content/uploads/2018/01/310374456.jpg"},
	{name: "Pixie", img: "http://www.bestfriendspetcare.com/wp-content/uploads/2011/04/111.jpg"}
]

app.get('/', function(req, res){
	res.render("home", {pets: pets});
});


app.get('/pet/new', function(req, res){
	res.render("newPet");
})

app.post('/pet/new', function(req, res){
	var petName = req.body.petName;
	var url = req.body.picUrl;
	pets.push({name: petName, img: url});
	res.redirect('/');
})

app.listen(3000, function(){
    console.log("Application starting at port "+3000); 
});