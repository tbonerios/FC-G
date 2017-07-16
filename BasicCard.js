var fs = require('fs');

function Basic(front, back) {

	this.front = front;
	this.back = back;
};
Basic.prototype.printInfo = function() {
    console.log("Question: " + this.question + "\nAnswer: " + this.answer + "\nThis card has been added to the database!");
  
};




module.exports = BasicCard;