/* eslint-disable no-alert, no-console */

//Pull in our exports
var clozeExports = require("./ClozeCard.js");
var basicExports = require("./BasicCard.js");

//Inquirer will help us create the CLI
var inquirer = require("inquirer");
//FS will let us write to file
var fs = require("fs");

//Variables to help keep track of our game logic
var count = 0;
var rightCount = 0;
var wrongCount = 0;

//This is the main component of the CLI, all options are accessed from here
function start(){
	console.log("");
	console.log("==================================");
	console.log("Welcome to the Flashcard Generator");
	console.log("==================================");

	inquirer.prompt([

		{
			type: "list",
			message: "Make your choice",
			choices: ["Quiz me with cloze flashcards!", 
				"Quiz me with basic flashcards!",
				"Add a cloze flashcard", 
				"Add a basic flashcard", 
				"End Program"],
			name: "choices"
		}

	]).then(function(data){

		if(data.choices === "Quiz me with cloze flashcards!"){
			quiz();
		}else if(data.choices === "Quiz me with basic flashcards!"){
			basicQuiz();
		}else if(data.choices === "Add a cloze flashcard"){
			newCloze();
		}else if(data.choices === "Add a basic flashcard"){
			newBasic();
		}else {
			process.exit();
		}

	});
}


function newCloze(){
	//Use inquirer to gather the two necessary inputs for the cloze constructor
	inquirer.prompt([

		{
			type: "input",
			message: "Enter the text that will be your answer",
			name: "cloze",
			default: ""
		},

		{
			type: "input",
			message: "Enter the entire question including your answer",
			name: "question",
			default: ""
		}

	]).then(function(data){
		//Validating that the entire question includes the cloze phrase
		if(data.question.indexOf(data.cloze) !== -1){
			//If yes, construct and push to the array from exports
			clozeExports.arr.push(new clozeExports.ClozeFlashcard(data.cloze, data.question));
			//Give the user the option to export their card to output.txt
			inquirer.prompt([

				{
					type: "confirm",
					name: "confirm",
					message: "Do you want to save your card to output.txt?"
				}

			]).then(function(data){
				if(data.confirm){
					saveCloze(clozeExports.arr[clozeExports.arr.length - 1]);
					start();
				}else {
					start();
				}
			});

		}else {
			console.log("Your answer is not included in the question");
			newCloze();
		}

	});
}

function newBasic(){
	//Use inquirer to gather the two necessary inputs for the basic constructor
	inquirer.prompt([

		{
			type: "input",
			message: "Enter the text that will be the front of the card",
			name: "front",
			default: ""
		},

		{
			type: "input",
			message: "Enter the text that will be the back of the card",
			name: "back",
			default: ""
		}

	]).then(function(data){
		//Construct and push to the array from exports
		basicExports.arr.push(new basicExports.BasicFlashcard(data.front, data.back));
		//Give the user the option to export their card to output.txt
		inquirer.prompt([

			{
				type: "confirm",
				name: "confirm",
				message: "Do you want to save your card to output.txt?"
			}

		]).then(function(data){
			if(data.confirm){
				saveBasic(basicExports.arr[basicExports.arr.length - 1]);
				start();
			}else {
				start();
			}
		});

	});
}

//Use FS to save the basic card
function saveBasic(flashcard){
	fs.appendFile("output.txt", `Front: ${flashcard.front} Back: ${flashcard.back} \n`, "UTF-8", function(error){
		if (error) throw error;
	});
}

//Use FS to save the cloze card
function saveCloze(flashcard){
	fs.appendFile("output.txt", `Cloze: ${flashcard.cloze} Question: ${flashcard.question} \n`, "UTF-8", function(error){
		if (error) throw error;
	});
}

//Notice we're using 'recursion' to call quiz() from inside of itself a number of times that
//is equal to the number of indices in clozeExports.arr
function quiz(){
	if(count < clozeExports.arr.length){

		inquirer.prompt([

			{
				type: "input",
				message: `${clozeExports.arr[count].displayQuestion()}`,
				name: "question",
				default: ""
			}

		]).then(function(data){
			//If right, increase correct answers, else increase wrong answers
			if(data.question === clozeExports.arr[count].cloze) {
				console.log("correct");
				rightCount++;
			}else {
				console.log(clozeExports.arr[count].question);
				wrongCount++;
			}

			count++;
			quiz();

		});

	}else {
		//When count is equal to the number of indices in clozeExports.arr, we can break our loop
		gameOver();
	}

}

//Notice we're using 'recursion' to call basicQuiz() from inside of itself a number of times that
//is equal to the number of indices in basicExports.arr
function basicQuiz(){
	if(count < basicExports.arr.length){

		inquirer.prompt([

			{
				type: "input",
				message: `${basicExports.arr[count].front}`,
				name: "question",
				default: ""
			}

		]).then(function(data){
			//If right, increase correct answers, else increase wrong answers
			if(data.question === basicExports.arr[count].back) {
				console.log("correct");
				rightCount++;
			}else {
				console.log(basicExports.arr[count].back);
				wrongCount++;
			}

			count++;
			basicQuiz();

		});

	}else {
		//When count is equal to the number of indices in basicExports.arr, we can break our loop
		gameOverBasic();
	}

}

//This closes out our quiz and provides a summary of the user's performance then
//allows the user to take it again or return to the main menu
function gameOver(){
	console.log(`You had ${rightCount} right answers and ${wrongCount} wrong answers`);
	console.log("");

	inquirer.prompt([

		{
			type: "confirm",
			name: "confirm",
			message: "Play again?"
		}

	]).then(function(data){

		count = 0;
		rightCount = 0;
		wrongCount = 0;

		if(data.confirm){
			quiz();
		}else {
			start();
		}

	});

}

//This closes out our quiz and provides a summary of the user's performance then
//allows the user to take it again or return to the main menu
function gameOverBasic(){
	console.log(`You had ${rightCount} right answers and ${wrongCount} wrong answers`);
	console.log("");

	inquirer.prompt([

		{
			type: "confirm",
			name: "confirm",
			message: "Play again?"
		}

	]).then(function(data){

		count = 0;
		rightCount = 0;
		wrongCount = 0;

		if(data.confirm){
			basicQuiz();
		}else {
			start();
		}

	});

}

//Starts the CLI when file is ran
start();
