var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var pets = [
	{id: 0, name: "Wacky", img: "http://3dogmedia.com/wp-content/uploads/2016/08/120251710-632x3531.jpg"},
	{id: 1, name: "Bacon", img: "https://boulderinn.com/bldrinn/wp-content/uploads/2010/10/pets-712-X-495.jpg"},
	{id: 2, name: "Kiwi", img: "https://timedotcom.files.wordpress.com/2017/11/dogs-cats-brain-study.jpg"},
	{id: 3, name: "Bambu", img: "http://saveapetil.org/wp-content/uploads/2018/01/310374456.jpg"},
	{id: 4, name: "Pixie", img: "http://www.bestfriendspetcare.com/wp-content/uploads/2011/04/111.jpg"}
]

var id = 4;

app.get('/', function(req, res){
	res.render("home", {pets: pets});
});


app.get('/pet/new', function(req, res){
	res.render("newPet");
})

app.post('/pet/new', function(req, res){
	var petName = req.body.petName;
	var url = req.body.picUrl;
	id++;
	pets.push({id: id, name: petName, img: url});
	res.redirect('/');
})

app.get('/pet/:id', function(req, res){
	var petId = Number(req.params.id);
	var pet = pets[petId];
	res.render("petDetail", {pet: pet});
});

app.listen(3000, function(){
    console.log("Application starting at port "+3000); 
});