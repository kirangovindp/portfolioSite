
class c_cell {
    constructor(x, y, _size) {
        //---------------------------- Attribuites of each cells--------------------------------------
        this.bombCount = 0;
        this.xPos = x;
        this.yPos = y;
        this.cellSize = _size;
        this.active = false;
        this.colour = 220;
        this.cellIndex = 0;
        this.reveal = false;
        this.strokeWeight = 4;
        //--------------------------------------------------------------------------------------------



        this.drawCell = function () {
            if (this.reveal) {
                this.colour = color(this.bombCount * 100, this.bombCount * 20, this.bombCount * 3); // Assign CELL BACKGROUNDcolor after revealed.
                if (this.active) { this.colour = color(200, 0, 0,1); }
                
            }
            else {
                //fill(this.colour);
            }
            fill(this.colour);
            rect(this.xPos, this.yPos, this.cellSize, this.cellSize); //draw rectangle at xPos,yPos
            strokeWeight(this.strokeWeight);



        }

        this.drawTextOnCell = function () {

            if (this.reveal) {
                //this.colour = 120;  // turn the                  
                if (!this.active) {         // check the CELL contains BOMB or not.
                    textSize(14);
                    var num = String(this.bombCount);       // Storing bombCount of CELL to 'num'. 
                    var textColor;      // create 'textColor' to store color value. 
                    //
                    if (this.bombCount < 2) { // If bombCount is less than 2.
                        textColor = color(this.bombCount * 2, this.bombCount * 10, this.bombCount * 150); // Assign color value to 'textColor' based on bombCount. 

                        if (this.bombCount == 0) {
                            textColor = color(0, 0, 0, 0);   // Assign color if no BOMB in CELL. 

                        }

                    }
                    else {  // If bombCount is greater than 2.
                        textColor = color(this.bombCount * 2, this.bombCount * 10, this.bombCount * 150); // 

                        //console.log(textColor);
                    }
                    fill(textColor);
                    text(num, this.xPos + this.cellSize / 2 - this.strokeWeight, this.yPos + this.cellSize / 2 + this.strokeWeight); // Print text on CELL(x,y);
                }

                else {      // if BOMB not revealed.
                    fill('black');
                    textSize(this.cellSize/2);
                    console.log(textSize());
                    text("X", this.xPos + this.cellSize / 2 - this.strokeWeight, this.yPos + this.cellSize / 2 + this.strokeWeight); // Print text on CELL(x,y);
                }

            }
        }

    }
}
