//Array of all states
var boxes = document.querySelectorAll(".box");
//heading to edit user information
var info = document.querySelector("h2");
//array to store all the states
var box2darray;
//Gets the number of rows. rows is expected to equal columns
let rows = Math.round(Math.sqrt(boxes.length)); // Should be 7
//Used for class comparison
let water = "water";
//boolean to determine whether the string version 
var arrows;
//keeps track of horizontal position
var right;
//keeps track of vertical position
var bottom;
//mouse element
var mouse;
//Runs the start function once the window loads
window.onload = start
//boolean used to determine if the program is finished
var finished = false;
//Array to store what values the user has answered
var entered = [];
//Paragraph to display results
var ans = document.querySelector("#ans");
//Run is used on setInterval to run the user string to completion
var run;

/*
main function of the program
*/
function start()
{
	init2d();
	determineType();
	if(arrows)
	{
		document.addEventListener('keydown', function(event){
    		getCode(event);
		});
	}
	else
	{
		var str = getUserString();

		let milliseconds = 1000;
		var itr = 0;
		run = setInterval(function(){ runUserString(itr, str); itr++;}, milliseconds);
	}
}

/*
Initializes a 2d array of the states
*/
function init2d()
{
	//Initialize 2D array
	box2darray = new Array(rows);
	for(var ii = 0; ii < rows; ii++)
	{
		box2darray[ii] = new Array(rows);
	}
	//Put box elements in 2D array
	for(var ii = 0; ii < rows; ii++)
	{
		for(var jj = 0; jj < rows; jj++)
		{
			box2darray[ii][jj] = boxes[jj+(rows*ii)];
		}
	}

	box2darray[3][3].id = "mouse";
	//Create mouse 
	mouse = document.createElement("img");
	mouse.setAttribute("src", "mouse.png");
	mouse.setAttribute("style", "width: 100%; height: 100%;");
	//Add mouse picture to element
	box2darray[3][3].appendChild(mouse);
	//Set tracking information
	right = 3;
	down = 3;
}

/*
Determine if a string or an arrows
*/
function determineType()
{
	var valid = false;
	do
	{
		var type = prompt("Please enter either \'arrows\' or \'strings\'", "arrows");
		if(type == "arrows")
		{
			arrows = true;
			valid = true;
		}
		if(type == "strings")
		{
			arrows = false;
			valid = true;
		}
	}while(false == valid);
}

/*
value: int between 0 and 3
left = 0
up = 1
right = 2
down = 3
*/
function move(value)
{
	entered.push(value);
	if(value == 0)
	{
		info.textContent = "Input: Left";
	}
	else if(value == 1)
	{
		info.textContent = "Input: Up"
	}
	else if(value == 2)
	{
		info.textContent = "Input: Right"
	}
	else if(value == 3)
	{
		info.textContent = "Input: Down"
	}
	if(!finished && (box2darray[down][right].className).indexOf(water) === -1)
	{
		if(value == 0)
		{
			//determine if it is in the leftmost row
			if(right != 0)
			{
				box2darray[down][right].id = "";
				box2darray[down][right].removeChild(mouse);
				right = right - 1;
				box2darray[down][right].id = "mouse";
				box2darray[down][right].appendChild(mouse);
			}
		}
		else if(value == 1)
		{
			//determine if it is in the topmost row
			if(down != 0)
			{
				box2darray[down][right].id = "";
				box2darray[down][right].removeChild(mouse);
				down = down - 1;
				box2darray[down][right].id = "mouse";
				box2darray[down][right].appendChild(mouse);
			}
		}
		else if(value == 2)
		{
			//determine if it is in the rightmost row
			if(right != (rows - 1))
			{
				box2darray[down][right].id = "";
				box2darray[down][right].removeChild(mouse);
				right = right + 1;
				box2darray[down][right].id = "mouse";
				box2darray[down][right].appendChild(mouse);
			}
		}
		else if(value == 3)
		{
			//determine if it is in the bottommost row
			if(down != (rows - 1))
			{
				box2darray[down][right].id = "";
				box2darray[down][right].removeChild(mouse);
				down = down + 1;
				box2darray[down][right].id = "mouse";
				box2darray[down][right].appendChild(mouse);
			}
		}
	}
}

/*
From the arrow keys pressed by the user, decides where to move
*/
function getCode(e)
{
	if(e.keyCode == 49)
	{
		endCode();
	}
	else if(e.keyCode == 37)
	{
		move(0)
	}
	else if(e.keyCode == 38)
	{
		move(1);
	}
	else if(e.keyCode == 39)
	{
		move(2);
	}
	else if(e.keyCode == 40)
	{
		move(3);
	}
}

/*
Code that runs on execution finish
*/
function endCode()
{
	finished = true;
	if(down == 0 || down == 6 || right == 0 || right == 6)
	{
		info.textContent = "Congratulations! You're in an accept state! Refresh to go again"
	}
	else
	{
		info.textContent = "Sorry, you're input was not accepted. Refresh to go again"
	}
	for(var ii = 0; ii < entered.length; ii++)
	{
		var str = "";
		if(entered[ii] == 0)
		{
			str = "LEFT "
		}
		else if(entered[ii] == 1)
		{
			str = "UP "
		}
		else if(entered[ii] == 2)
		{
			str = "RIGHT "
		}
		else if(entered[ii] == 3)
		{
			str = "DOWN "
		}
		ans.textContent += str;
	}

}

/*
Gets user string for the DFA
*/
function getUserString()
{
	return prompt("Enter your string into the DFA", "Hello World");
}

/*
Executes the user sttring
*/
function runUserString(ii, str)
{
	if( ii < str.length)
	{
		let char = str.charCodeAt(ii);
		move(char % 4);
	}
	else
	{
		clearInterval(run);
		endCode();
	}
}