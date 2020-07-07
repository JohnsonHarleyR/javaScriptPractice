//functions
function newGame() {
	askLevel();
	
}

function askLevel() {
	main.innerHTML = "<div id='navigation'><a href='/'>Go Back</a></div>" +
	"<h1 id='title'>Minesweeper</h1>";
	
	start = document.createElement("div");
	game.id = "start";
	game.innerHTML = "";
	main.appendChild(start);
	
	console.log("Ask level");
	start.innerHTML = "<h2>Which level?</h2>";
	
	easyBtn = document.createElement("button");
	easyBtn.id = "easy";
	easyBtn.innerHTML = "Easy";
	easyBtn.addEventListener("click", setEasy);
	start.appendChild(easyBtn);
	
	mediumBtn = document.createElement("button");
	mediumBtn.id = "medium";
	mediumBtn.innerHTML = "Medium";
	mediumBtn.addEventListener("click", setMedium);
	start.appendChild(mediumBtn);
	
	hardBtn = document.createElement("button");
	hardBtn.id = "hard";
	hardBtn.innerHTML = "Hard";
	hardBtn.addEventListener("click", setHard);
	start.appendChild(hardBtn);
}

function clickCell() {
	
	//make sure cell is unclicked before doing anything
	//if (!this.clicked) {
		
		//console.log("clicked");
		//console.log("Value: " + this.getAttribute("value"));
		
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
function setValues() {
	console.log("setting cells");
	
	for (var row = 0; row < rows; row++) {
		for (var col = 0; col < cols; col++) {
			
			//there are up to 8 surrounding cells, so the for loop will go 8 times
			var times = 0;
			var cell = game.rows[row].cells[col];
			console.log("cell: " + cell.id);
			
			var xs = [row - 1, row, row + 1];
			var ys = [col - 1, col, col + 1];
			
			for (var x = 0; x < xs.length; x++) {
				for (var y = 0; y < ys.length; y++) {
					//make sure cell is not less than 0 or over the max
					if (xs[x] == row && ys[y] == col) {
						//nothing actually happens, nothing should get added if it's the original cell
						//it is done this way to simplify things
					} else {
						//if any of the numbers are below or above the limit, correct them
						if (xs[x] < 0) {
							xs[x] = 0;
						}
						if (xs[x] >= rows) {
							xs[x] = rows - 1;
						}
						if (ys[y] < 0) {
							ys[y] = 0;
						}
						if (ys[y] >= cols) {
							ys[y] = cols - 1;
						}
						//now check if the cell is a mine
						//get the cell
						var ce = game.rows[xs[x]].cells[ys[y]];
						console.log("touching cell: " + ce.id);
						if (ce.getAttribute('value') === "-1") {
							times++;
						}
							
					}
				}
				
			}
			console.log("mines touching: " + times);
			//now store the number of times in the cell as the value
			if (cell.getAttribute('value') !== "-1") {
				cell.setAttribute('value', times + "");
			}
			
			
		}
	}
	
	
}

//ask for the level
//method to show level buttons to get the level again - use layout from newGame for squares

//start the game
function startGame() {

	main.innerHTML = "<div id='navigation'><a href='/'>Go Back</a></div>" +
	"<h1 id='title'>Minesweeper</h1>";
	
	game = document.createElement("table");
	game.id = "game";
	game.innerHTML = "";
	main.appendChild(game);
	
	for (var r = 0; r < rows; r++) {
		var row = game.insertRow(r);
		for (var c = 0; c < cols; c++) {
			var cell = row.insertCell(c);
			cell.innerHTML = "<img class='square' src='" + "ms/unclicked.png" + "'/>";
			cell.onclick = clickCell;
			
			var val = document.createAttribute("value", "0");
		    cell.setAttributeNode(val);
		    val.value = "0";
		    var ro = document.createAttribute("r", r + "");
		    cell.setAttributeNode(ro);
		    ro.value = r + "";
		    var co = document.createAttribute("c", c + "");
		    cell.setAttributeNode(co);
		    co.value = c + "";
		    cell.id = r + "-" + c;
		}
		
	}
	
	addMines();
	setValues();
	
	//set cell values
	/*for (var r = 0; r < rows; r++) {
		for (var c = 0; c < cols; c++) {
			var ce = game.rows[r].cells[c];
			console.log("ce: " + ce.getAttribute('value'));
			ce.setCell;
		}
	}*/
	
	//Add button section
	var buttons = document.createElement("div");
	buttons.id = "buttons";
	
	main.appendChild(buttons);
	
	//Add new game button
	newGameBtn = document.createElement("button");
	newGameBtn.id = "new-game";
	newGameBtn.innerHTML = "New Game";
	newGameBtn.addEventListener("click", askLevel);
	buttons.appendChild(newGameBtn);
	
	
	
}

//set the mines
function addMines() {
	//now randomly place the mines based on the level
	var alreadySet;
	for (var i = 0; i < numMines; i++) {
		do { //loop to prevent setting the same cell twice
			alreadySet = false;
			var row = Math.floor(Math.random() * rows);
			var col = Math.floor(Math.random() * cols);
			
			var cell = game.rows[row].cells[col];
			
			if (cell.getAttribute("value") === "-1") {
				alreadySet = true;
			} else {
				cell.setAttribute("value", "-1"); //-1 is a mine
			}
			//val.value = "-1"; 
		} while (alreadySet);
		
	}
}

//set level
function setEasy() {
	level = "easy";
	rows = 10;
	cols = 10;
	numMines = 10;
	startGame();
	//console.log("Easy level");
}

function setMedium() {
	level = "medium";
	rows = 16;
	cols = 16;
	numMines = 40;
	startGame();
	//console.log("Medium level");
}

function setHard() {
	level = "hard";
	rows = 16;
	cols = 30;
	numMines = 99;
	startGame();
	//console.log("Hard level");
}

//Variables
var level = "medium";
var rows = 16;
var cols = 16;
var numMines = 40;

var easyBtn = document.getElementById('easy');
var mediumBtn = document.getElementById('medium');
var hardBtn = document.getElementById('hard');
var newGameBtn;

var cells;

var body = document.getElementById('body');
var main = document.getElementById('main');
var start;
var game;
var buttons;




//Event handlers
//body.onload = loadPage;

easyBtn.onclick = setEasy;
mediumBtn.onclick = setMedium;
hardBtn.onclick = setHard;


