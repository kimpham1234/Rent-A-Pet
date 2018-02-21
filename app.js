var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//database connection
mongoose.connect('mongodb://localhost/rent-a-pet');


//define schema
var petSchema = mongoose.Schema({
	name: String,
	img: String,
	breed: String,
	diet: String,
	personality: String,
	urgent: Boolean
})

//add to model
var Pet = mongoose.model('Pet', petSchema);
/*
//create pet
var p1 = new Pet({ 
		name: "Wacky", 
		img: "http://3dogmedia.com/wp-content/uploads/2016/08/120251710-632x3531.jpg",
		breed: "Beagle",
		diet: "Gourmet Organics only",
		personality: "Playful",
		urgent: false
	});

var p2 = new Pet({	 
		name: "Bacon", 
		img: "https://boulderinn.com/bldrinn/wp-content/uploads/2010/10/pets-712-X-495.jpg",
		breed: "Unknown",
		diet: "Gourmet Organics only",
		personality: "Like to take a walk",
		urgent: false
	});

var p3 = new Pet({	 
		name: "Kiwi", 
		img: "https://timedotcom.files.wordpress.com/2017/11/dogs-cats-brain-study.jpg",
		breed: "Golden Retriever",
		diet: "Gourmet Organics only",
		personality: "Very friendly",
		urgent: false
	});

var p4 = new Pet({	 
		name: "Bambu", 
		img: "http://saveapetil.org/wp-content/uploads/2018/01/310374456.jpg",
		breed: "Meowington",
		diet: "Gourmet Organics only",
		personality: "Funny but grumpy when hungry",
		urgent: false
	});

var p5 = new Pet({	 
		name: "Pixie", 
		img: "http://www.bestfriendspetcare.com/wp-content/uploads/2011/04/111.jpg",
		breed: "Meowobble",
		diet: "Gourmet Organics only",
		personality: "Very cute",
		urgent: false
	});
p1.save();
p2.save();
p3.save();
p4.save();
p5.save();
*/

var pets = null;
Pet.find(function(err, res){
	if(err)
		console.log("can't find pets");
	else{
		pets = res;
	}
});


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
	var newPet = new Pet({name: petName, img: url, breed: breed, diet: diet, personality: personality, urgent: false});
	pets.push(newPet);
	newPet.save(function(err, newPet){
		if(err)
			console.log(err);
		else res.redirect('/pet/'+newPet._id);
	});
})

app.get('/pet/:id', function(req, res){
	var pet = null;
	Pet.find({_id: req.params.id}, function(err, results){
		if(err){
			console.log("can't find pet");
			res.send("The pet you view is no longer available");
		}
		else{
			pet = results[0];
			console.log(JSON.stringify(pet));
			res.render("petDetail", {pet: pet, max: pets.length});
		} 
	});
	
	
});

app.listen(3000, function(){
    console.log("Application starting at port "+3000); 
});