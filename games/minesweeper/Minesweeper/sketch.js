var cell = [];
var cellSize,  // in pixels
	noOfCells = 10; // In multiple of 10;

var gameOverFlag = false;

function setup() {
	cellSize = 40;
	displayOrientation();

	createCanvas(1500, 1500);
	UI = createGraphics(cellSize * 6, cellSize * 6);
	UI.background('rgba(255,255,210, 0.25)');

	createTileObjects();
	assignBombtoTiles(10);


}

function draw() {		// All drawings
	//console.log(screen.width , screen.height);
	if (!gameOverFlag) { // If  GameOverFlag is false.
		mouseLocation();
		displayCells();

	}
	else {		// If  GameOverFlag is true.

		GameOver();
	}


	//image(UI, 0, 0, 50, 50);




}

function GameOver() {

	var w = cellSize * noOfCells / 4;
	var h = cellSize * noOfCells / 2;
	//Text Styling properties
	//textFont('Arial');
	fill("White");
	//Print text
	UI.textSize(cellSize / 1.2);
	UI.text("Game Over", cellSize * 1, cellSize * 1);
	UI.textSize(cellSize / 3);
	UI.text("Press 'F5' to play again", cellSize * 1, cellSize * 4);
	
	// mouseOver(UI.text("Play Again", cellSize*2,cellSize*4)) {
	// 	console.log('test	');
	// }
	// UI.textSize(cellSize / 2);
	image(UI, cellSize * 2, cellSize * 2);

}

// Reveal all bombs after gameover
// Clock
// Reset game

function displayOrientation() { // Check display orientation and set cellSize
	if ((screen.width / screen.height) > 1) {
		cellSize = screen.height / 14;
	}
	else {
		cellSize = screen.width / 14;

	}
}
function createTileObjects() { // Create 'tile' Objects (cell:class);

	for (var i = 0; i < noOfCells; i++) {

		cell[i] = [];

		for (var j = 0; j < noOfCells; j++) {
			cell[i][j] = new c_cell(i * cellSize, j * cellSize, cellSize);
			cell[i][j].cellIndex = (i * noOfCells) + j;
			//print(i*noOfTiles,"+",j);
			//print(tile[i][j].cellIndex);
		}
	}

}

function DestroyCellObjects() { // Create 'tile' Objects (cell:class);

	for (var i = 0; i < noOfCells; i++) {

		cell[i] = [];

		for (var j = 0; j < noOfCells; j++) {
			cell[i][j] = '';
		}
	}

}

function displayCells() {	// Display all cells
	for (var i = 0; i < cell.length; i++) {
		for (var j = 0; j < cell.length; j++) {
			cell[i][j].drawCell();
			cell[i][j].drawTextOnCell();

		}
	}
}

function mouseLocation() {	// Find mouse location and locate the tile ;
	var x = dist(0, 0, mouseX, 0);
	var y = dist(0, 0, 0, mouseY);
	var i = int(x / cellSize);
	var j = int(y / cellSize);

	if (i <= 9 && j <= 9) {
		if (mouseIsPressed && !cell[i][j].reveal) {
			console.log("clicked" + i, j);
			revealTile(i, j);

		}
	}

	//Reset Game

	// if (mouseX >= 2 * cellSize && mouseY >= 2 * cellSize) {
	// 	if (mouseX <= 5 * cellSize && mouseX <= 5 * cellSize) {
	// 		if (gameOverFlag == true && mouseIsPressed) {
	// 			DestroyCellObjects();
	// 			console.log('test');
	// 		}
	// 		console.log("exit MouseLocation");
	// 	}

	// }
}

function revealTile(i, j) {

	if (!cell[i][j].reveal) { // if tile not revealed
		cell[i][j].reveal = true;
		//console.log("revealed "+i,j);
	}

	if (cell[i][j].bombCount == 0) {
		console.log("Adj Tile of " + i + "," + j);
		adjacentTiles(i, j);

	}

	if (cell[i][j].active) {
		gameOverFlag = true;
	}

}


function adjacentTiles(row, col) {

	var counter = 0;
	for (var y = -1; y <= 1; y++) {
		for (var x = -1; x <= 1; x++) {

			var newRow = row + x;
			var newCol = col + y;

			counter++;
			if (newRow >= 0 && newRow <= 9) {
				if (newCol >= 0 && newCol <= 9) {
					if (!cell[newRow][newCol].reveal) {
						print(newRow, newCol);
						revealTile(newRow, newCol);

					}
					//}					
				}
			}
		}
	}
}

function assignBombtoTiles(numOfBombs) {	// Activate bomb in random tile * 'numOfbombs' ;

	//for (var k = 0; k < numOfBombs; k++) {
	var counter = 0;
	while (counter < numOfBombs) {
		var row = int(random(noOfCells));	// random row
		var col = int(random(noOfCells));	// random col
		if (!cell[row][col].active) {
			cell[row][col].active = true;
			assignNumOfBombToTiles(row, col);
			counter++;
		}
	}
}

function resetGame() { //UNDERWORK

	assignBombtoTiles(10);
}

function assignNumOfBombToTiles(row, col) { // Find number of bombs around and increase 'bombCount';
	//print(tile[row][col+1].bombCount);

	//print("the" + row, col);
	for (var y = -1; y <= 1; y++) {
		for (var x = -1; x <= 1; x++) {
			newRow = row + x;
			newCol = col + y;

			if (newRow >= 0 && newRow <= 9) {
				if (newCol >= 0 && newCol <= 9) {
					if (cell[newRow][newCol].active == false) {
						cell[newRow][newCol].bombCount += 1;
						//tile[newRow][newCol].colour = 10 * tile[newRow][newCol].bombCount;
						//print(tile[newRow][newCol].cellIndex);
					}
				}
			}
		}
	}
}


