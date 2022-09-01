const seatArray = [];
const seatWidth = 4;
const seatHeigth = 12;
const seatCount = 46;

function start(){
	createTableStructure()
	renderSeats()

	// occupy 30% of seats
	occupySeats()
}

function createTableStructure(){

	
	for(let i = 0; i <= seatCount; i++){
		seatArray.push(new seat(i));
	}
}

function renderSeats(){
	let html = '<table cellpadding=0 cellspacing=0>'

	for(let row = 0; row < seatHeigth; row++){
		html += '<tr>'

		for(let column = 0; column < seatWidth; column++){
			html += '<td>'

			const pixelIndex = column + (seatWidth * row)
			if(pixelIndex < seatCount){
				let seatRoute = seatArray.find(x => x.index == pixelIndex).route
				if(!seatRoute)
					seatRoute = ''

				html += `<div class="pixel-index">${pixelIndex+1}</div>`
				html += seatRoute
			}
			
			html += '</td>'
		}

		html += '</tr>'
	}

	html += '</table>'

	document.getElementById('seats').innerHTML = html
}

function occupySeats(){
	const seatsToOccupy = Math.round(seatCount * 0.3)
	for(let i = 0; i < seatsToOccupy; i++){
		let s = seatArray.find(x => x.index == i)

		if(i < seatsToOccupy / 2)
			s.route = 'Porto Alegre -> Florianópolis'
		else
			s.route = 'Porto Alegre -> Criciúma'
	}

	renderSeats()
}


function seat(index,route,time){
	this.index = index
	this.route = route
	this.time = time
	this.setTime = function (time){
		this.time = time
	}
	this.setRoute = function (route){
		this.route = route;
	}
}

start()