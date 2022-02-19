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

			td += "' id=" + id + " onclick='insertNumber(id, 9)' ></td>"
			string += td
		}
		string += "</tr>"
	}

	string += "</table>"

	document.getElementById("sudokuDiv").innerHTML = string
})

function createSudoku(){}

function insertNumber(id, n){

	document.getElementById(id).innerHTML = n
}
