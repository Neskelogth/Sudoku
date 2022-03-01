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

			td += "' id=" + id + " onclick='adjournCurrentCell(id)' ></td>"
			string += td
		}
		string += "</tr>"
	}

	string += "</table>"

	document.getElementById("sudokuDiv").innerHTML = string
	adjournCurrentCell(0)
	fillCells()
})

document.addEventListener('keydown', (event)=>{

	if(event.keyCode == '37'){
		//arrow left
		if(currentCell > 0){

			currentCell --
			adjournCurrentCell(currentCell)
		}
	}
	if(event.keyCode == '38'){
		//arrow up
		if(currentCell > 8){

			currentCell -= 9
			adjournCurrentCell(currentCell)
		}
	}
	if(event.keyCode == '39'){
		//arrow right
		if(currentCell < 80){

			currentCell ++
			adjournCurrentCell(currentCell)
		}
	}
	if(event.keyCode == '40'){
		//arrow down
		if(currentCell < 72){

			currentCell += 9
			adjournCurrentCell(currentCell)
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

function removeFromRow(domains, value, index){

	if(index > 80 || index < 0){

		alert("something went wrong")
		return domains
	}

	let row = Math.floor(index / 9)
	
	for(let i = 0; i < 9; i++){

		//console.log(domains[i])
		let auxIndex = row * 9 + i
		if(Array.isArray(domains[auxIndex]) && (auxIndex != index)){

			domains[auxIndex] = removeByValue(domains[i], value)
		}
	}

	return domains
}

function removeFromCol(domains, value, index){

	if(index > 80 || index < 0){

		alert("something went wrong")
		return domains
	}

	let col = index % 9
	
	for(let i = 0; i < 9; i++){

		let auxIndex = i * 9 + col
		if(Array.isArray(domains[auxIndex]) && (auxIndex != index)){

			domains[auxIndex] = removeByValue(domains[i], value)
		}
	}

	return domains
}
function removeFromSquare(domains, value, index){

	return domains
}

function restrictDomains(domains){
}

function allSingleDomains(domains){

	for(let i = 0; i < 81; i++){
		if(!Array.isArray(domains[i])){

			return false
		}
	}
}

function solve(){

	alert("Still not working")
	domains = [
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9]
			  ]

	let values = []
	for(let i = 0; i < 81; i++){

		let n = document.getElementById(i).innerHTML;
		console.log(n)
		if(n != ""){
			console.log("id " + i)
			domains[i] = parseInt(n)
		}		
	}


	//console.log(values)
	//console.log(domains)
	let maxN = 10
	removeFromRow(domains, 5, 3)
	removeFromCol(domains, 5, 3)

	//console.log(domains)

	/*while(!allSingleDomains(domains) && (maxN > 0)){

		restrictDomains(domains)
		maxN--
	}*/

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

	for(let i = 0; i < 81; i++){

		document.getElementById(i).style.backgroundColor = "#fff"
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

