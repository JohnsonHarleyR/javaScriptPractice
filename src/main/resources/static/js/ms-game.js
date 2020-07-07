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
	    this.setAttribute("src", url);
		
		//if it's blank, uncover those around it too
		if (this.getAttribute('value') === '0') {
			console.log("Clicked cell equals 0. Uncovering surrounding for: ")
			uncoverAround(this.getAttribute('r'), this.getAttribute('c'), true);
		} 
		
		//this.clicked = true; //keep this at the end of the if statement
	//}
	
}


//if a cell is blank, uncover the surrounding cells too. - does not ensure it's blank
function uncoverAround(r, c, uncoverNext) {
	
	console.log("# of rows: " + rows + " # of cols: " + cols);
	
	var row = Number(r);
	var col = Number(c);
	
	//uncover next is to prevent too much looping while figuring this out
	
	console.log("row: " + row + " col: " + col);
	//console.log("cell: " + cell.id);
	
	//if it's a blank cell, uncover more
	var xs = [row - 1, row, row + 1];
	var ys = [col - 1, col, col + 1];
	
	var r;
	var c;
	
	var surCells = new Array(); //using this should help make the function run faster
								//Because it eliminates extra double looping
	
	console.log("Surrounding cells: ");
	
	for (var x = 0; x < xs.length; x++) {
		for (var y = 0; y < ys.length; y++) {
			//make sure cell is not less than 0 or over the max
			var addIt = true; //this will check whether to add cell to new array
			
			if (xs[x] === row && ys[y] === col) {
				//nothing actually happens, nothing should get added if it's the original cell
				//it is done this way to simplify things
				console.log("This is the same original cell...");
				addIt = false;
			} else {
				
				console.log("row: " + xs[x] + " col: " + ys[y]);
				r = xs[x];
				c = ys[y];
				
				//if any of the numbers are below or above the limit, change to limit
				if (xs[x] < 0) {
					r = 0;
					addIt = false;
				}
				if (xs[x] >= rows) {
					r = rows - 1;
					addIt = false;
				}
				if (ys[y] < 0) {
					c = 0;
					addIt = false;
				}
				if (ys[y] >= cols) {
					c = cols - 1;
					addIt = false;
				}
				console.log("After fix - row: " + r + " col: " + c);
				//loop through surCells to make sure there are no repeats
				for (var i = 0; i < surCells.length; i++) {
					
					//save memory by also checking if that cell is already uncovered
					if (surCells[i].getAttribute('src') !== "ms/unclicked.png") {
						console.log("Already clicked so skip this cell...");
						addIt = false;
					}
					
					//check for same coordinates
					if (Number(surCells[i].getAttribute('r')) === r &&
							Number(surCells[i].getAttribute('c')) === c) {
						console.log("Already in surrounding cells...");
						addIt = false;
					}
					
					
					
				}
				
				
			}
			
			
			//if it's a new cell, add it to array
			//if addIt
			if (addIt) {
				var tempCell = game.rows[r].cells[c];
				console.log("Adding it to surrounding cell list...");
				surCells.push(tempCell);
			}
			
		}
	}
	
	
	
	//now loop through it again, uncovering each cell.
	console.log("");
	console.log("now uncovering these surrounding cells...");
	
	for (var i = 0; i < surCells.length; i ++) {
		var cell = surCells[i];
		console.log("Cell: " + "row " + cell.getAttribute('r') + ", col " + cell.getAttribute('c'));
		var tUrl = getImageUrl(cell.getAttribute('value'));
		console.log("New src: " + tUrl);
		cell.innerHTML = "<img class='square' src='" + tUrl + "'/>";
		cell.setAttribute("src", tUrl);
		
	}
	
	
	//COME BACK TO THIS
	
	if (uncoverNext) {
		//now loop through it again, uncovering each cell.
		console.log("");
		console.log("Now doing the same for newly uncovered blank cells...");
		
		var uncoverCells = new Array();
		
		console.log("List of cells to also uncover around: ");
		for (var i = 0; i < surCells.length; i ++) {
			if (surCells[i].getAttribute('value') === '0') {
				console.log("Cell " + surCells[i].id);
				uncoverCells.push(surCells[i]);
			}
		}
		
		//now call function to uncover these cells recursively
		console.log("Uncovering around these cells as well.");
		checkNewBlanks(uncoverCells, false); //boolean is to help with testing
	}
	
}
	
	/*
	//loop again - if the cell equals 0, recursively uncover around that one to0
	console.log("now uncovering surrounding cells of new blanks...");
	for (var i = 0; i < surCells.length; i ++) {
		var cell = surCells[i];
		
		if (cell.getAttribute('value') === "0") {
			console.log("Cell: " + "row " + cell.getAttribute('r') + ", col " + cell.getAttribute('c'));
			console.log("This cell is also 0, so uncovering around that...");
			uncoverAround(cell.getAttribute('r'), cell.getAttribute('c'));
		}
		
	}
	*/


//to uncover surrounding of new uncovered cells too
function checkNewBlanks(cells, uncoverNext) {
	//console.log("now uncovering these surrounding cells...");
	
	for (var i = 0; i < cells.length; i ++) {
		var cell = cells[i];
		var r = cell.getAttribute('r');
		var c = cell.getAttribute('c');
		
		console.log("Uncovering around " + cell.id);
		uncoverAround(r, c, uncoverNext);
		console.log("Done uncovering around that cell...");
	}
}




//get the correct url for a cell, change it
function getImageUrl(value) {
	var url = "ms/empty.png";
	
	//change the image according to the value
	switch (value) {
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
	
	return url;
}

//store how many mines are touching a cell
function setValues() {
	//console.log("setting cells");
	
	for (var row = 0; row < rows; row++) {
		for (var col = 0; col < cols; col++) {
			
			//there are up to 8 surrounding cells, so the for loop will go 8 times
			var times = 0;
			var cell = game.rows[row].cells[col];
			//console.log("cell: " + cell.id);
			
			var xs = [row - 1, row, row + 1];
			var ys = [col - 1, col, col + 1];
			var counts = true; //making sure it's ok to add to times
			
			for (var x = 0; x < xs.length; x++) {
				for (var y = 0; y < ys.length; y++) {
					//make sure cell is not less than 0 or over the max
					counts = true;
					if (xs[x] == row && ys[y] == col) {
						//nothing actually happens, nothing should get added if it's the original cell
						//it is done this way to simplify things
						counts = false;
					} else {
						//if any of the numbers are below or above the limit, correct them
						if (xs[x] < 0) {
							counts = false;
						}
						if (xs[x] >= rows) {
							counts = false;
						}
						if (ys[y] < 0) {
							counts = false;
						}
						if (ys[y] >= cols) {
							counts = false;
						}
						//now check if the cell is a mine
						//get the cell
						//console.log("counts? " + counts);
						if (counts) {
							var ce = game.rows[xs[x]].cells[ys[y]];
							//console.log("touching cell: " + ce.id);
							if (ce.getAttribute('value') === "-1") {
								times++;
								//console.log("times++");
							}
						}
							
					}
				}
				
			}
			//console.log("mines touching: " + times);
			//now store the number of times in the cell as the value
			if (cell.getAttribute('value') !== "-1") {
				cell.setAttribute('value', times + "");
			}
			
			
		}
	}
	
	
}

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
			var url = "ms/unclicked.png";
			var cell = row.insertCell(c);
			cell.innerHTML = "<img class='square' src='" + url + "'/>";
			cell.onclick = clickCell;
			
			var src = document.createAttribute("src", url);
		    cell.setAttributeNode(src);
		    src.value = url; //necessary?
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


