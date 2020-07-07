//functions
function loadPage() {
	
	
}

function clickCell() {
	
	//make sure cell is unclicked before doing anything
	//if (!this.clicked) {
		
		console.log("clicked");
		console.log("Value: " + this.getAttribute("value"));
		
		var url = "ms/empty.png";
		
		//change the image according to the value
		switch (this.getAttribute("value")) {
		case "-1":
			url = "ms/mine.png";
			//game over - TODO add a function
			break;
		case "0":
			url = "ms/empty.png";
			break;
		case "1":
			url = "ms/c1.png";
			break;
		case "2":
			url = "ms/c2.png";
			break;
		case "3":
			url = "ms/c3.png";
			break;
		case "4":
			url = "ms/c4.png";
			break;
		case "5":
			url = "ms/c5.png";
			break;
		case "6":
			url = "ms/c6.png";
			break;
		case "7":
			url = "ms/c7.png";
			break;
		case "8":
			url = "ms/c8.png";
			break;
		}
		//set html
		this.innerHTML = "<img class='square' src='" + url + "'/>";
		
		//this.clicked = true; //keep this at the end of the if statement
	//}
	
}

//store how many mines are touching a cell
function checkSurrounding(row, col) {
	//there are up to 8 surrounding cells, so the for loop will go 8 times
	var times = 0;
	var xs = [row - 1, row, row + 1];
	var ys = [col - 1, col, col + 1];
	
	for (var x = 0; x < xs.length; x++) {
		for (var y = 0; y < ys.length; y++) {
			//make sure cell is not less than 0 or over the max
			if (xs[x] == row && ys[y] == col) {
				//nothing actually happens, nothing should get added if it's the original cell
				//if the original is a mine though, then set that board image to mine
				
			}
		}
		
	}
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
			//grid[i][n].src = "ms/unclicked.png";
			//grid[i][n].clicked = false;
			//grid[i][n].onclick = clickCell;
		}
	}
	
	game.innerHTML = "";
	
	for (var r = 0; r < rows; r++) {
		//var rowName = "r" + r;
		var row = game.insertRow(r);
		for (var c = 0; c < cols; c++) {
			var cell = row.insertCell(c);
			cell.value = grid[r][c];
			cell.innerHTML = "<img class='square' src='" + "ms/unclicked.png" + "'/>";
			cell.onclick = clickCell;
			
			var val = document.createAttribute("value", "0");
		    cell.setAttributeNode(val);
		    val.value = "0";
		    cell.id = r + "-" + c;
		}
		
	}
	addMines();
	
}

//set the mines
function addMines() {
	//now randomly place the mines based on the level
	for (var i = 0; i < numMines; i++) {
		var row = Math.floor(Math.random() * rows);
		var col = Math.floor(Math.random() * cols);
		
		var cell = game.rows[row].cells[col];
		cell.setAttribute("value", "-1"); //-1 is a mine
		//val.value = "-1"; 
	}
	//now call function to set all surrounding values for all mines
}


//Variables
var level = "medium";
var rows = 16;
var cols = 16;
var numMines = 40;

var easyBtn = document.getElementById('easy');
var mediumBtn = document.getElementById('medium');
var hardBtn = document.getElementById('hard');

var grid;
var cells;

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


