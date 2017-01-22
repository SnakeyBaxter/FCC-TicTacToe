$(document).ready(function(){
	
	var player;
	var comp;
	var turn = 0;
    var empty_squares;
	var score;
		
	var boardval = [];
	
    var boardObject = {
        line1: [0,1,2],
        line2: [3,4,5],
        line3: [6,7,8],
        line4: [0,3,6],
        line5: [1,4,7],
        line6: [2,5,8],
        line7: [0,4,8],
        line8: [2,4,6]
    }
	$(".board").hide();
	
	//winning combinations
	//var winline =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; //if an array adds up to 3 - player wins. 
																					  //If an array adds up to 15 - comp wins.
			
	
	function checkForSquare(){
		var empty = [];
		if(
		   boardval[0]+boardval[1]+boardval[2] === 10 ||
		   boardval[3]+boardval[4]+boardval[5] === 10 ||
		   boardval[6]+boardval[7]+boardval[8] === 10 ||
		   boardval[0]+boardval[3]+boardval[6] === 10 ||
		   boardval[1]+boardval[4]+boardval[7] === 10 ||
		   boardval[2]+boardval[5]+boardval[8] === 10 ||
		   boardval[0]+boardval[4]+boardval[8] === 10 ||
		   boardval[2]+boardval[4]+boardval[6] === 10){
			   
				winline.forEach(function(line){
					console.log("THIS LINE " + line);
				});
				console.log("Finish line");
		   }
		
	}
	
	function checkForBlock(){
		var block_array = [];
		if(
		   boardval[0]+boardval[1]+boardval[2] === 2 ||
		   boardval[3]+boardval[4]+boardval[5] === 2 ||
		   boardval[6]+boardval[7]+boardval[8] === 2 ||
		   boardval[0]+boardval[3]+boardval[6] === 2 ||
		   boardval[1]+boardval[4]+boardval[7] === 2 ||
		   boardval[2]+boardval[5]+boardval[8] === 2 ||
		   boardval[0]+boardval[4]+boardval[8] === 2 ||
		   boardval[2]+boardval[4]+boardval[6] === 2){
			   
				console.log("Block required");
				for(var i; i<boardval.length; i++){
					if(boardval[i] === 0){
						block_array.push(boardval[square]);
						console.log(block_array);
					}
				}
		   } else {
			   checkForSquare();
		   }
		   
	}
	
	
	function checkForMove(){
		console.log("Move somewhere");
		checkForBlock();
	}
	
	function compMove(square){
		square = "suggest one";
		checkForMove();
		square.innerHTML = comp;
		boardval[square] = 5;
		checkForWin();
        empty_squares--;
		turn = 0;
	}
	
	function checkForWin(){
		if(
		   boardval[0]+boardval[1]+boardval[2] === 3 ||
		   boardval[3]+boardval[4]+boardval[5] === 3 ||
		   boardval[6]+boardval[7]+boardval[8] === 3 ||
		   boardval[0]+boardval[3]+boardval[6] === 3 ||
		   boardval[1]+boardval[4]+boardval[7] === 3 ||
		   boardval[2]+boardval[5]+boardval[8] === 3 ||
		   boardval[0]+boardval[4]+boardval[8] === 3 ||
		   boardval[2]+boardval[4]+boardval[6] === 3){
			   
				console.log("Well done, you won!");
		   }
		else if(
		   boardval[0]+boardval[1]+boardval[2] === 15 ||
		   boardval[3]+boardval[4]+boardval[5] === 15 ||
		   boardval[6]+boardval[7]+boardval[8] === 15 ||
		   boardval[0]+boardval[3]+boardval[6] === 15 ||
		   boardval[1]+boardval[4]+boardval[7] === 15 ||
		   boardval[2]+boardval[5]+boardval[8] === 15 ||
		   boardval[0]+boardval[4]+boardval[8] === 15 ||
		   boardval[2]+boardval[4]+boardval[6] === 15){
			   
				console.log("Bad luck, computer won");
		   }
	
	
	};
	//set up board and player symbols
	$("#start").click(function(){
		boardval = [0,0,0,0,0,0,0,0,0]; //initialise board array
		empty_squares = 9;
		for(var j =0; j<9; j++){
		$(".square")[j].innerHTML = "";
		}
		for(var i=0; i<2; i++){
		if(symbol.setsymbol[i].checked){
			player = symbol.setsymbol.value;
			}
		}
		if(player === "X"){
			comp = "O";
		} else {
			comp = "X";
		}
		 $(".board").show();
		 
		 console.log("Player =", player);
		 console.log("AI =", comp);
	});
	
	//moves
	
	$(".square").click(function(){
		this.innerHTML = player;
		console.log(this,this.innerHTML);
		boardval[this.id] = 1;
		console.log(boardval[this.id]);
		checkForWin();
		turn = 1;
        empty_squares--;
		console.log(empty_squares);
		if(turn === 1){
			compMove();
		}
		
	});
	
	


}); 

