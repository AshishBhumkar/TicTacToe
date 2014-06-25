/*
 * Function for the TIC TAC TOE game
 */
$(function () {

    var squares = [],
        SIZE = 3,				//Size for the board
        MINSIZE = 3,			//Min Size of the board
        MAXSIZE = 100,			//Max Size of the board
        EMPTY = "&nbsp;",		//Empty to put in cell
        moves,					//Number foe the moves done in game
        turn = "X",				//Turn for player
        gameFlag = false,		//Check for game has finished or not

        /*
         * Move count, set the gameFlag, erases the board, and makes it
         * X's turn.
         */
        startNewGame = function () {
    		gameFlag = false;
            turn = "X";
            moves = 0;
            squares.forEach(function (square) {
                square.html(EMPTY);
            });
        },

        /*
         * Returns whether the given score is a winning score.
         */
        win = function (clicked) {
            // Get all of the classes this cell belongs to
            var memberOf = clicked[0].className.split(/\s+/);

            // Check elements with the same class, and see if they contain "turn", i.e. X or O
            for (var i = 0; i < memberOf.length; i++) {
                var testClass = '.' + memberOf[i];
                // If the number of elements containing "turn" == SIZE,
                // we have a winning condition
                if ($('#divBoard').find(testClass + ':contains(' + turn + ')').length == SIZE) {
                    return true;
                }
            }

            return false;
        },

        /*
         * Sets the clicked-on square to the current player's mark,
         * then checks for a win or draw game.  Also changes the
         * current player.
         */
        set = function () {
        	if(gameFlag == true) {
        		$("#pWinner").html(turn + " wins!!!");
            	$("#divWinner").modal("show");
            	return;
        	}
            if ($(this).html() !== EMPTY) {
                return;
            }
            $(this).html(turn);
            moves += 1;
            if (win($(this))) {
            	gameFlag = true;
            	$("#pWinner").html(turn + " wins!!!");
            	$("#divWinner").modal("show");
            } else if (moves === SIZE * SIZE) {
            	gameFlag = true;
            	$("#pWinner").html("Draw!!!");
            	$("#divWinner").modal("show");
            } else {
                turn = turn === "X" ? "O" : "X";
            }
            $("#helpPlayer").text("Player '"+turn+"' turns");
        },

        /*
         * Creates and attaches the DOM elements for the board as an
         * HTML table, assigns the classes for each cell, and starts
         * a new game.
         */
        initializePlay = function () {
            var board = $("<table>");
            for (var i = 0; i < SIZE; i += 1) {
                var row = $("<tr>");
                board.append(row);
                for (var j = 0; j < SIZE; j += 1) {
                    var cell = $("<td></td>");
                    cell.addClass('col' + j); // The cell is in column j
                    cell.addClass('row' + i); // The cell is in row i
                    if (i == j) {
                        cell.addClass('dia0'); // The cell is in the down/right diagonal
                    }
                    if (j == SIZE - i - 1) {
                        cell.addClass('dia1'); // The cell is in the up/right diagonal
                    }
                    cell.click(set);
                    row.append(cell);
                    squares.push(cell);
                }
            }

            $("#divBoard").append(board);
            $("#helpPlayer").text("Player 'X' turns");
            startNewGame();
        };
   
        /*
         * Creates the game dropdown with n sizes
         */
        setOptions = function() {
        	var selectOption = "";
        	for(var i = 3; i <= MAXSIZE; i++) {
        		selectOption += "<option id="+i+">"+i+" x "+i+"</option>";
        	}
        	$("#slcBoardSize").append(selectOption);
        };
        
        /*
         * Change the size of the board with the specified value
         */
        changeBoard = function() {
        	SIZE = $("#slcBoardSize :selected").attr("id");
        	$("#divBoard").html("");
        	initializePlay();
        };
        
        /*
         * Check for the game whether it is finished or not, when startNewGame is clicked
         */
        checkGame = function() {
        	if(moves > 0)
        		$("#divNewGame").modal("show");
        };
        
        /*
         * Starts new game 
         */
        $("#btnNewGame").click(function() {
        	$("#divNewGame").modal("hide");
        	startNewGame();          	
        });
        
        /*
         * Starts new game 
         */
        $("#btnWinner").click(function() {
        	$("#divWinner").modal("hide");
        	startNewGame();          	
        });       
        
        setOptions();
        initializePlay();        
});