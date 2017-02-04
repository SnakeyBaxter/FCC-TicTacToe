$(document).ready(function(){
	
	var human;
	var comp;
	var turn = 0;
    var empty_squares;
	var square = [] //holds the board status
		
	$(".board").hide(); //hide until start clicked
	$("#panel").slideUp("fast");
	
	var winlines =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];  //winning combinations
    var corners =[0,2,6,8]; //corner squares
	
	function insertMark(mark, location){
		while(turn === 1){
			document.getElementById(location).innerHTML = mark;
			square[location] = mark;
			empty_squares--;
			$("#empty").html(empty_squares);
			checkForWin(mark);
			checkForDraw();
			turn = 0;
		}
	}
	
	function tryToWin(){
		winlines.forEach(function(line){
			if(square[line[0]] === comp && square[line[1]] === comp || square[line[1]] === comp && square[line[2]] === comp ||
			   square[line[0]] === comp && square[line[2]] === comp){
					for(var space = 0; space<line.length; space++){ 
							if(square[space] === " "){
								insertMark(comp, space);
								return;
								
                            };
						};
					
				}
		});
		
		checkForBlock(winlines);
    
	}  
			  
			
	//if human player is one turn away from a winning combination - block it.
	function checkForBlock(arr){
		console.log("CHECKBLOCK");
		for(var z=0; z<arr.length; z++){
			var line = arr[z];
			if(square[line[0]] === human && square[line[1]] === human || square[line[0]] === human && square[line[2]] === human 
				|| square[line[1]] === human && square[line[2]] === human){
						for(var i = 0; i<line.length; i++){
							if(square[line[i]] === " "){
									var space = line[i];
									insertMark(comp, space);
									break;
							};
						}
						
				}
			};
        
	}
	
	function oppositeCorner(arr){
		if(turn === 1){
			var opp = [];
			for(var y = 3; y>=0; y--){
				opp.push(arr[y]);
			}
			
			for(var i=0; i<arr.length; i++){
				if(square[arr[i]] === human){
				   console.log("OPPOSITE", [opp[i]]);
				   if(square[opp[i]] === " "){
					   var space = opp[i];
					   insertMark(comp, space);
				   }
				} 
			}
        }
	}
    
	function checkForMove(){ //check for non-blocking move
    console.log("CHECKMOVE");
		//debugger;
        var others = [1,3,5,7];
        var random = Math.floor(Math.random() * 5);
        console.log(random);
		if(square[0] == " " && square[2] === " " && square[6] == " " && square[8] == " "){
            //choose random empty corner
			var i = corners[random];
            insertMark(comp,i);
			return;
        }
		
        else if(square[0] !== " " && square[2] !== " " && square[6] !== " " && square[8] !== " "){
            //corners full choose center
			insertMark(comp, "4");
			return;
        }
		
				
		else {
			var pos = others[random];
			var space = square[pos];
			insertMark(comp, space);
			return;
		}		
	} 
	
	function checkForWin(player){
       console.log("CHECKWIN");
       winlines.forEach(function(line){
			if(square[line[0]] === player && square[line[1]] === player && square[line[2]] === player){
					$("#panel").html(player + " Wins!");
					$("#panel").slideDown("slow");
					endGame();
				}
			});
	};
	
	function checkForDraw(){
		if(empty_squares === 0){
				$("#panel").html("It's a Draw!");
				$("#panel").slideDown("slow");
				endGame();
			}
	}
	
	function compMove(){
		tryToWin();
		oppositeCorner(corners);
		//checkForMove();
		
	}
	
	//disable any further moves.
	function endGame(){
		turn = 2;
		$(".square").off('click');  
	} 
    
    //reset game
    
    $("#reset").click(reset);
    
	 function reset(){
        turn = 0;
        empty_squares = 9;
	    square = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        for(var i = 0; i < square.length; i++){
            document.getElementById(i).innerHTML = " ";
        }
        $("#panel").html(" ");
        $("#empty").html(" ");
        $(".square").on('click'); 
        $(".board").hide(); //hide until start clicked
	    $("#panel").slideUp("fast");
        $("#symbol").show();
        
     }
	
	
	//set up board and player symbols
	$("#start").click(function(){
		empty_squares = 9;
	    square = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
		for(var i=0; i<2; i++){
			if(symbol.setsymbol[i].checked){
				human = symbol.setsymbol.value;
			}
		}
		if(human === "X"){
			comp = "O";
		} else {
			comp = "X";
			turn = 1;
			setTimeout(checkForMove, 1500);
		}
		$(".board").show();
		$("#symbol").hide();
	});
	
	//human moves
	$(".square").click(function(){
		this.innerHTML = human;
		square[this.id] = human;
		checkForWin(human);
		turn = 1;
        empty_squares--;
		if(turn === 1){
			compMove();
		}
		$("#empty").html(empty_squares);
		
	});
	
	


}); 

