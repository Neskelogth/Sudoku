/**
	I don't like global variables, but I think in this case simplifies some things
*/
let currentCell = 0
let difficulty = 0
let puzzle = []
let maskedPuzzle = []

document.addEventListener("DOMContentLoaded", (event)=>{

	//building the table 
	let string = "<table>"

	for(let i = 0; i < 9; i++){
		string += "<tr>"
		for(let j = 0; j < 9; j++){

			let id = i * 9 + j
			let td = "<td class='"
			
			if(j == 2 || j == 5 || j == 8){

				td += " right"
			}
			if(j == 0){

				td += " left"
			}
			if(i == 0){

				td += " top"
			}
			if(i == 2 || i == 5 || i == 8){

				td += " bottom"
			}

			td += "' id=" + id + " onclick='updateCurrentCell(id)' ></td>"
			string += td
		}
		string += "</tr>"
	}

	string += "</table>"

	document.getElementById("sudokuDiv").innerHTML = string
	updateCurrentCell(0)
	fillCells()
})

/**
	insertion, movement and deleting with keyboard
*/
document.addEventListener('keydown', (event)=>{

	//arrow left
	if(event.keyCode == '37'){
		if(currentCell > 0){

			currentCell --
			updateCurrentCell(currentCell)
		}
	}
	//arrow up
	if(event.keyCode == '38'){
		if(currentCell > 8){

			currentCell -= 9
			updateCurrentCell(currentCell)
		}
	}
	//arrow right
	if(event.keyCode == '39'){
		if(currentCell < 80){

			currentCell ++
			updateCurrentCell(currentCell)
		}
	}
	//arrow down
	if(event.keyCode == '40'){
		if(currentCell < 72){

			currentCell += 9
			updateCurrentCell(currentCell)
		}
	}
	if(event.keyCode == '49' || event.keyCode == '97'){
		//1
		insert(1)
	}
	if(event.keyCode == '50' || event.keyCode == '98'){
		//2
		insert(2)
	}
	if(event.keyCode == '51' || event.keyCode == '99'){
		//3
		insert(3)
	}
	if(event.keyCode == '52' || event.keyCode == '100'){
		//4
		insert(4)
	}
	if(event.keyCode == '53' || event.keyCode == '101'){
		//5
		insert(5)
	}
	if(event.keyCode == '54' || event.keyCode == '102'){
		//6
		insert(6)
	}
	if(event.keyCode == '55' || event.keyCode == '103'){
		//7
		insert(7)
	}
	if(event.keyCode == '56' || event.keyCode == '104'){
		//8
		insert(8)
	}
	if(event.keyCode == '57' || event.keyCode == '105'){
		//9
		insert(9)
	}
	if(event.keyCode == '46' || event.keyCode == "8"){
		//canc or backspace
		deleteCell()
	}
})

/**
	Temporary implementations, just fills the cells as they are needed for my tests
*/
function fillCells(array=[]){

	//Temporary implementation
	let total = [
					["", "", "", "5", "1", "", "", "3", ""],
					["3", "9", "1", "6", "7", "", "5", "", "2"],
					["6", "2", "", "8", "9", "", "4", "1", "7"],
					["", "3", "2", "", "", "", "", "6", "4"],
					["", "", "", "", "6", "", "2", "", "8"],
					["8", "", "", "", "", "1", "", "", ""],
					["2", "5", "", "", "3", "7", "", "", ""],
					["", "1", "8", "", "", "6", "7", "", ""],
					["", "", "", "", "2", "", "", "4", ""]
				]
	
	for(let i = 0; i < 9; i++){
		for(let j = 0; j < 9; j++){

			document.getElementById(i * 9 + j).innerHTML = total[i][j]
		}
	}
}


/**
	Inserts newly find numbers in solving process
*/
function fillNewCells(domains) {
	
	domains.forEach((domain, i) => {

		//console.log(i)
		if(Array.isArray(domain) && domain.length == 1){

			domains[i] = domain[0]
			domains = clearRows(domains)
			domains = clearCols(domains)
			domains = clearSquares(domains)
			document.getElementById(i).innerHTML = domain[0]
		}
	})

	return domains
}

/**
	remove element from array by value
*/
function removeByValue(arr, value){

	if(!Array.isArray(arr)){

		return arr
	}

	let index = arr.indexOf(value)
	
	if(index != -1){

		arr.splice(index, 1)
	}

	return arr
}


/**
	Checks if domains of possible values of cells are 
	single value or have multiple values. Single values are not
	stored in arrays
*/
function allSingleDomains(domains){

	for(let i = 0; i < 81; i++){
		if(Array.isArray(domains[i])){

			return false
		}
	}
}

/**
	Removes all the impossible values (for the row rule) from the row
*/
function clearRows(domains){

	
	for(let row = 0; row < 9; row++){

		let singleValues = []
		for (let i = 0; i < 9; i++){

			let id = i + row * 9
			if(document.getElementById(id).innerHTML != ""){

				singleValues.push(parseInt(document.getElementById(id).innerHTML))
			}
		}

		for(let i = 0; i < 9; i++){

			let id = row * 9 + i
			let currentCellDomain = domains[id]

			if(Array.isArray(currentCellDomain)){

				singleValues.forEach((element) =>{

					domains[id] = removeByValue(currentCellDomain, element)
				})
			}
		}
	}
	
	//console.log(domains)
	return domains
}

/**
	Removes all the impossible values (for the column rule) from the column
*/
function clearCols(domains){

	for(let col = 0; col < 9; col++){

		let singleValues = []
		for (let i = 0; i < 9; i++){

			let id = i * 9 + col
			if(document.getElementById(id).innerHTML != ""){

				singleValues.push(parseInt(document.getElementById(id).innerHTML))
			}
		}

		for(let i = 0; i < 9; i++){

			let id = i * 9 + col
			let currentCellDomain = domains[id]

			if(Array.isArray(currentCellDomain)){

				singleValues.forEach((element) =>{

					domains[id] = removeByValue(currentCellDomain, element)
				})
			}
		}
	}
	return domains
}

/**
	Removes all the impossible values (for the square rule) from the square
*/
function clearSquares(domains){

	
	for(let auxRow = 0; auxRow < 3; auxRow++){

		for(let auxCol = 0; auxCol < 3; auxCol++){

			let startingRow = auxRow * 3
			let startingCol = auxCol * 3
	
			let singleValues = []

			for(let i = 0; i < 3; i++){
				for(let j = 0; j < 3; j++){

					let currentId = (startingRow + i) * 9 + startingCol + j
					if(document.getElementById(currentId).innerHTML != ""){

						singleValues.push(parseInt(document.getElementById(currentId).innerHTML))
					}
				}
			}

			for(let i = 0; i < 3; i++){
				for(let j = 0; j < 3; j++){

					let id = (startingRow + i) * 9 + startingCol + j
					let currentCellDomain = domains[id]

					if(Array.isArray(currentCellDomain)){

						singleValues.forEach((element) =>{

							domains[id] = removeByValue(currentCellDomain, element)
						})
					}
				}
			}
		}
	}
	return domains
}

/**
	Work in progress, should solve the sudoku
*/
function solve(){

	//Represent all possible values of all cells
	//Already given cells have only one value, all the others 
	//start at all values between 1 and 9. Domains will be 
	//restricted later
	let domains = []
	let counter = 3

	for(let i = 0; i < 81; i++){

		let n = parseInt(document.getElementById(i).innerHTML)
		if(!isNaN(n)){

			domains.push(n)
		}else{
		
			domains.push([1, 2, 3, 4, 5, 6, 7, 8, 9])
		}
	}

	

	while(!allSingleDomains(domains) && counter > 0){	

		domains = clearRows(domains)
		domains = clearCols(domains)
		domains = clearSquares(domains)

		domains = fillNewCells(domains)
		
		counter --
	}

	console.log(counter)

	/*
	
	if(!allSingleDomains(domains)){
	
		alert("Could not resolve the sudoku, are you sure the ")
	}

	*/

	console.log(domains)

}


//TODO
function createSudoku(){}

/**
	Checks if all elements in an array are different or not
*/
function allDiff(array){

	return (new Set(array)).size === array.length;
}

/**
	Checks if the column is fully compiled, with the right number 
	and if there are repetition
*/
function checkColumns(){

	for(let i = 0; i < 9; i++){
		let col = []
		for(let j = 0; j < 9; j++){

			let n = parseInt(document.getElementById(j * 9 + i).innerHTML)

			if(isNaN(n)){

				return false;
			}

			if(n > 9 || n < 1){

				return false;
			}

			col.push(n)
			
			if(!allDiff(col)){
				return false;
			}
		}
		
	}
	return true;
}

/**
	Checks if the row is fully compiled, with the right number 
	and if there are repetition
*/
function checkRows(){

	for(let i = 0; i < 9; i++){
		let row = []
		for(let j = 0; j < 9; j++){

			let n = parseInt(document.getElementById(i * 9 + j).innerHTML)
			
			if(isNaN(n)){

				return false;
			}

			if(n > 9 || n < 1){

				return false;
			}

			row.push(n)
			
			if(!allDiff(row)){
				return false;
			}
		}
		
	}
	return true;
}

/**
	Checks if the square is fully compiled, with the right number 
	and if there are repetition
*/
function checkSquares(){

	for(let i = 0; i < 9; i++){
		let sq = []
		for(let j = 0; j < 3; j++){
			for(let k = 0; k < 3; k++){

				let superRow = Math.floor(i / 3)
				let superCol = Math.floor(i % 9) % 3
				let id = (superRow * 27) + (j * 9) + (superCol * 3) + k
				let n = parseInt(document.getElementById(id).innerHTML)
				sq.push(n)
				if(n < 1 || n > 9 || isNaN(n)){

					return false;
				}
			}
		}

		console.log(sq)

		if(!allDiff(sq)){

			return false;
		}
	}
	return true;
}

/**
	Checks if the sudoku is correct
*/
function checkSudoku(){

	if(checkColumns() && checkRows() && checkSquares()){

		alert("Correct!")
	}else{

		alert("Incorrect!")
	}
}

/**
	Deletes the content of a cell
*/
function deleteCell(){

	document.getElementById(currentCell).innerHTML = ""
}


/**
	updates the current Cell global variable and colors the background of 
	the current row, column and square
*/
function updateCurrentCell(id){

	//remove background color from all cells
	for(let i = 0; i < 81; i++){

		document.getElementById(i).style.backgroundColor = "rgb(255, 255, 255)"
	}

	//update cell and compute current row and col
	currentCell = id;
	let row = Math.floor(currentCell / 9)
	let col = currentCell % 9

	//add background color in row and col
	for(let i = 0; i < 9; i++){

		document.getElementById(row * 9 + i).style.backgroundColor = "rgba(171, 205, 239, 0.4)"
		document.getElementById(i * 9 + col).style.backgroundColor = "rgba(171, 205, 239, 0.4)"
	}

	//aux Indexes for square background
	let startingCol = Math.floor((currentCell % 9) / 3) * 3
	let startingRow = Math.floor(currentCell / 27) * 3

	//add background to square
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){

			let id = (startingRow * 9) + (i * 9) + (startingCol) + j
			document.getElementById(id).style.backgroundColor = "rgba(171, 205, 239, 0.4)"
		}
	}
	
	//highlight current cell
	document.getElementById(currentCell).style.backgroundColor = "rgb(171, 205, 239)";
}

/**
	Decides if we have to insert a note or a number
*/
function insert(value){

	if(document.getElementsByTagName("input")[1].checked){
		insertNumber(parseInt(value));
	}else{
		insertNote(parseInt(value));
	}
}

/**
	Inserts a number normal
*/
function insertNumber(value){

	if(!isNaN(value)){

		document.getElementById(currentCell).classList.remove("small")
		document.getElementById(currentCell).innerHTML = value
	}
}

/**
	Inserts/removes a small note on the
*/
function insertNote(value){
	
	let content = document.getElementById(currentCell).innerHTML

	//TO FIX

	if(content.indexOf(value) != -1){

		content = content.replace(value, "")
		document.getElementById(currentCell).innerHTML = content
	}else{
		if(!isNaN(value)){
			document.getElementById(currentCell).classList.add("small")
			document.getElementById(currentCell).innerHTML += value	
		}
	}
}

/**
	Just a setter of the global variable
*/
function selectDifficulty(){

	difficulty = document.getElementById("diff").value
}