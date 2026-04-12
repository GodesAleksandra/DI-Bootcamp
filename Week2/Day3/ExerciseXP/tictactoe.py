#Mini-Project - Tic Tac Toe
#Goal: Create a Tic Tac Toe game in Python where two players can play against each other.
#What you will create: A command-line Tic Tac Toe game that allows two players to take turns marking a 3x3 grid.
#Instructions: Tic Tac Toe is played on a 3x3 grid. Players take turns marking empty squares with their symbol (‘O’ or ‘X’).
#The first player to get three of their symbols in a row (horizontally, vertically, or diagonally) wins.
#If all squares are filled and no player has three in a row, the game is a tie.
#Step 1: Representing the Game Board
#You’ll need a way to represent the 3x3 grid.
#A list of lists (a 2D list) is a good choice.
#Initially, each cell in the grid should be empty (e.g., represented by a space ‘ ‘).
#Step 2: Displaying the Game Board
#Create a function called display_board() to print the current state of the game board.
#The output should visually represent the 3x3 grid.
#Think about how to format the output to make it easy to read.
#Step 3: Getting Player Input
#Create a function called player_input(player) to get the player’s move.
#The function should ask the player to enter a position (e.g., row and column numbers).
#Validate the input to ensure it’s within the valid range and that the chosen cell is empty.
#Think about how to ask the user for input, and how to validate that input.
#Step 4: Checking for a Winner
#Create a function called check_win(board, player) to check if the current player has won.
#The function should check all possible winning combinations (rows, columns, diagonals).
#If a player has won, return True; otherwise, return False.
#Think about how to check every possible winning combination.
#Step 5: Checking for a Tie
#Create a function to check if the game has resulted in a tie.
#The function should check if all positions of the board are full, without a winner.
#Step 6: The Main Game Loop
#Create a function called play() to manage the game flow.
#Initialize the game board.
#Use a while loop to continue the game until there’s a winner or a tie.
#Inside the loop:
#Display the board.
#Get the current player’s input.
#Update the board with the player’s move.
#Check for a winner.
#Check for a tie.
#Switch to the next player.
#After the loop ends, display the final result (winner or tie).


board = [[" " for _ in range(3)] for _ in range(3)]

def display_board(board):
    for row in board:
        print("|".join(row))
        print("-|-|-")

def player_input(player):
    row = int(input("Enter row: "))
    column = int(input("Enter column: "))
    return row,column


display_board(board)
