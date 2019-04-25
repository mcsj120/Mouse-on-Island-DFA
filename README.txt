Mouse DFA

This project uses the concepts of a DFA to implement the mouse on an island simulation. In this simulation a mouse is stuck on an island, and must escape by following the inputs from the user. If the mouse ends in the water or is stuck on the island when the simulation ends, he did not make it.

In this project, the states of the DFA are represented by each of the boxes on the screen. The accept states are all the perimeter states, which represents that the mouse has left the island. The water acts as a dead state, where the string will never be accepted once a water state is touched. The input alphabet depends on the mode selected. If arrows, it is the up, down, left, right keys. If strings, it is the keys on the keyboard, which will be converted to ASCII values and then implemented as left, down, up, right. The start state is the center of the island, which is where the mouse begins its journey.

To run the program: Open up main.html in a web browser (preferably chrome). Make sure the file that is loaded is the one in the directory you selected. (Make sure it isn't a cached version in AppData or a similiar folder). 

Once the files has loaded enter either 'arrows' or 'strings' in the dialog box. 'arrows' is chosen by default for the user.

If arrows is selected: press the up, left, down, and right keys to navigate around the map. Once you are done, press '1', and the program will tell you whether or not the string was accepted.

If strings is selected: a new prompt will appear asking you to enter in your string. Type in a string and then press enter. The program will then execute one string a second until completed, and then will tell you if the string was accepted.

Files:
main.html 		- webpage that is used to run the simulation
main.css 		- css file used to edit style of main.html
DFA.js 		- js file used to execute simulation
mouse.png 		- mouse picture used in simulation
SCAN0140.jpg 	- picture of the DFA used in simulation
readme.txt 	- readme file