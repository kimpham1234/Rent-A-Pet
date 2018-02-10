var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var pets = [
	{
		id: 0, 
		name: "Wacky", 
		img: "http://3dogmedia.com/wp-content/uploads/2016/08/120251710-632x3531.jpg",
		breed: "Beagle",
		diet: "Gourmet Organics only",
		personality: "Playful"
	},
	{	
		id: 1, 
		name: "Bacon", 
		img: "https://boulderinn.com/bldrinn/wp-content/uploads/2010/10/pets-712-X-495.jpg",
		breed: "Unknown",
		diet: "Gourmet Organics only",
		personality: "Like to take a walk"
	},
	{	
		id: 2, 
		name: "Kiwi", 
		img: "https://timedotcom.files.wordpress.com/2017/11/dogs-cats-brain-study.jpg",
		breed: "Golden Retriever",
		diet: "Gourmet Organics only",
		personality: "Very friendly"
	},
	{	
		id: 3, 
		name: "Bambu", 
		img: "http://saveapetil.org/wp-content/uploads/2018/01/310374456.jpg",
		breed: "Meowington",
		diet: "Gourmet Organics only",
		personality: "Funny but grumpy when hungry"
	},
	{	
		id: 4, 
		name: "Pixie", 
		img: "http://www.bestfriendspetcare.com/wp-content/uploads/2011/04/111.jpg",
		breed: "Meowobble",
		diet: "Gourmet Organics only",
		personality: "Very cute"
	}
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
	var breed = req.body.breed;
	var diet = req.body.diet;
	var personality = req.body.personality;
	id++;
	var newPet = {id: id, name: petName, img: url, breed: breed, diet: diet, personality: personality};
	pets.push(newPet);
	res.redirect('/pet/'+id);
})

app.get('/pet/:id', function(req, res){
	var petId = Number(req.params.id);
	var pet = pets[petId];
	if(petId >= 0 && petId < pets.length){
		res.render("petDetail", {pet: pet, max: pets.length});
	}
	else res.send("This page is not available");
});

app.listen(3000, function(){
    console.log("Application starting at port "+3000); 
});