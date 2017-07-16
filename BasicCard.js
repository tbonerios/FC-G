//Constructor for the basic flashcard
var BasicFlashcard = function(front, back){
	this.front = front;
	this.back = back;
};

//Empty array that will house our basic flashcard objects
var arr = [];

//Key Value pairs for the basic object
var material = {
	"What national holiday in Mexico has picnickers munching chocolate coffins and sugar skulls?": "The Day of the Dead",
	"What color is Absynth?" : "Green",
	"Name the world's largest ocean." : "Pacific",
	"What is the world's longest river?": "Amazon"
};

//Loop through material and construct objects
for (var key in material){
	arr.push(new BasicFlashcard(key, material[key]));
}

//Export the array of objects and the constructor out to flashcards.js
module.exports = {arr, BasicFlashcard};