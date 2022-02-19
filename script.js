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
})

function createSudoku(){}

function adjournCurrentCell(id){

	currentCell = id;
}

function insert(value){

	//console.log(value)

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
	console.log(content)

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