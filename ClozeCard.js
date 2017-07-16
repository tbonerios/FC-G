//Constructor for the cloze flashcard
var ClozeFlashcard = function(cloze, question){
	this.cloze = cloze;
	this.question = question;

	this.displayQuestion = function(){
		var display = question.replace(cloze, "...");
		return display;
	};
};
//Empty array that will house our cloze flashcard objects
var arr = [];
//Key Value pairs for the cloze object
var material = {
	"Dictionary": "Another word for lexicon is Dictionary",
	"The Matrix": "Keanu Reeves played Neo in The Matrix",
	"Casablanca": "Humphrey Bogart said, 'We'll always have Paris in Casablanca",
	"Pimento": "Allspice is alternatively known as Pimento",
	"Lake Superior": "The largest freshwater lake in the world is Lake Superior",
	"Louis Pastuer": "Inventor of the rabies vaccine is Louis Pastuer"
};

//Loop through material and construct objects
for (var key in material){
	arr.push(new ClozeFlashcard(key, material[key]));
}

//Export the array of objects and the constructor out to flashcards.js
module.exports = {arr, ClozeFlashcard};
