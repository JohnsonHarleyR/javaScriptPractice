//functions
function loadPage() {
	
	
}

//set level
function setEasy() {
	level = "easy";
	rows = 10;
	cols = 10;
	numMines = 10;
	newGame();
	console.log("Easy level");
}

function setMedium() {
	level = "medium";
	rows = 16;
	cols = 16;
	numMines = 40;
	newGame();
	console.log("Medium level");
}

function setHard() {
	level = "hard";
	rows = 16;
	cols = 30;
	numMines = 99;
	newGame();
	console.log("Hard level");
}

//start the game
function newGame() {
	
	grid = new Array(rows);
	
	//set up where all the mines are
	
	//first set them all to 0
	for (var i = 0; i < rows; i++) {
		grid[i] = new Array(cols);
	}
	for (var i = 0; i < rows; i++) {
		for (var n = 0; n < cols; n++) {
			grid[i][n] = 0;
		}
	}
	
	//now randomly place the mines based on the level
	for (var i = 0; i < numMines; i++) {
		var x = Math.floor(Math.random() * rows);
		var y = Math.floor(Math.random() * cols);
		//this will now be a mine. Set mines to 1, grid to -1 (represents mine,
		//so mines may not even be necessary... Let's not count it
		grid[x][y] = -1;
	}
	
	
	//set up the HTML for the table
	play = "<table id='board'>" +
		"<tr id='head'></tr>";
	
	//the first 'for loop' is for the rows - use javascript, not core
	for (var r = 0; r < rows; r++) {
		var rowName = "r" + r;
		play += "<tr id='" + rowName + "'>";
			for (var c = 0; c < cols; c++) {
				play += "<td id='" + r + "-" + c + "'>";
					play += "<img class='square' id='" + r + "-" + c + "'  src='ms/unclicked.png'/>";
				play += "</td>"
			}
		play += "</tr>"
	}
	
	play += "</table>"
		
	
	game.innerHTML = play;
	
	
	
}

//set the mines


//Variables
var level = "medium";
var rows = 16;
var cols = 16;
var numMines = 40;

var easyBtn = document.getElementById('easy');
var mediumBtn = document.getElementById('medium');
var hardBtn = document.getElementById('hard');

var g;
var grid;

var body = document.getElementById('body');
var game = document.getElementById('game');
var start = document.getElementById('start');
var play;

var cell = {
	row: 0,
	col: 0,
	value: 0, //mine equals -1
	mine: false,
	clicked: false,
	src: "ms/unclicked.png",

	//cell functions
	checkAvailability: function setRow(row) {
		this.row = row;
	},
	
	checkAvailability: function setCol(col) {
		this.col = col;
	},
	
	checkAvailability: function setMine(mine) {
		this.mine = mine;
	},
	
	checkAvailability: function setClicked(clicked) {
		this.clicked = clicked;
	},
	
	checkAvailability: function setSrc(src) {
		this.src = src;
	},
	
	checkAvailability: function setValue(value) {
		this.value = value;
	}
};


//Event handlers
easyBtn.onclick = setEasy;
mediumBtn.onclick = setMedium;
hardBtn.onclick = setHard;

