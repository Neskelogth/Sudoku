let currentCell = 0;

document.addEventListener("DOMContentLoaded", (event)=>{

	let string = "<table>"

	for(let i = 0; i < 9; i++){
		string += "<tr>"
		for(let j = 0; j < 9; j++){

			let id = i * 9 + j
			let td = "<td class='"
			
			if(j == 2 || j == 5 || j == 8){

				td += " right "
			}
			if(j == 0){

				td += " left "
			}
			if(i == 0){

				td += " top "
			}
			if(i == 2 || i == 5 || i == 8){

				td += " bottom "
			}

			td += "' id=" + id + " onclick='adjournCurrentCell(id)' >" + (j + 1) + "</td>"
			string += td
		}
		string += "</tr>"
	}

	string += "</table>"

	document.getElementById("sudokuDiv").innerHTML = string
	adjournCurrentCell(0)
	fillCells()
})

function fillCells(array=[]){

	//TEMP IMPLEMENTATION FOR TEST PURPOSES
	let arr = [1,2,3,1,2,3,1,2,3]
	let arr2 = [4,5,6,4,5,6,4,5,6]
	let arr3 = [7,8,9,7,8,9,7,8,9]

	let total = [arr, arr2, arr3, arr, arr2, arr3, arr, arr2, arr3]

	//console.log(total)

	for(let i = 0; i < 9; i++){
		for(let j = 0; j < 9; j++){

			document.getElementById(i * 9 + j).innerHTML = total[i][j]
		}
	}
}

function createSudoku(){}

function allDiff(array){

	return (new Set(array)).size === array.length;
}

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

function deleteCell(){

	document.getElementById(currentCell).innerHTML = ""
}

function checkSudoku(){

	if(checkColumns() && checkRows() && checkSquares()){

		alert("Correct!")
	}else{

		alert("Incorrect!")
	}
}

function adjournCurrentCell(id){

	let row = Math.floor(currentCell / 9)
	let col = currentCell % 9

	let startingRow = Math.floor(currentCell / 27) * 3
	let startingCol = Math.floor((currentCell % 9) / 3) * 3		

	document.getElementById(currentCell).style.backgroundColor = "#fff"

	for(let i = 0; i < 9; i++){


		document.getElementById(row * 9 + i).style.backgroundColor = "#fff"
		document.getElementById(i * 9 + col).style.backgroundColor = "#fff"
	}
	
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){

			let id = (startingRow * 9) + (i * 9) + (startingCol) + j
			document.getElementById(id).style.backgroundColor = "#fff"
		}
	}	

	currentCell = id;
	row = Math.floor(currentCell / 9)
	col = currentCell % 9
	for(let i = 0; i < 9; i++){

		document.getElementById(row * 9 + i).style.backgroundColor = "rgba(171, 205, 239, 0.4)"
		document.getElementById(i * 9 + col).style.backgroundColor = "rgba(171, 205, 239, 0.4)"
	}

	startingCol = Math.floor((currentCell % 9) / 3) * 3
	startingRow = Math.floor(currentCell / 27) * 3

	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){

			let id = (startingRow * 9) + (i * 9) + (startingCol) + j
			document.getElementById(id).style.backgroundColor = "rgba(171, 205, 239, 0.4)"
		}
	}
	
	document.getElementById(currentCell).style.backgroundColor = "rgb(171, 205, 239)";
}

function insert(value){

	if(document.getElementsByTagName("input")[1].checked){
		insertNumber(parseInt(value));
	}else{
		insertNote(parseInt(value));
	}
}

function insertNumber(value){

	if(!isNaN(value)){

		document.getElementById(currentCell).classList.remove("small")
		document.getElementById(currentCell).innerHTML = value
	}
}

function insertNote(value){
	
	let content = document.getElementById(currentCell).innerHTML
	//console.log(content)

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

function resetAllCells(){

	console.clear()
	for(let i = 0; i < 80; i++){

		document.getElementById(i).innerHTML = ""
	}
}