const seatArray = []
const seatWidth = 4
const seatHeigth = 12
const seatCount = 46

function start(){
	createTableStructure()
	renderSeats()

	// occupy 30% of seats
	occupySeats()

	//
	populateLists()
}

function createTableStructure(){
	for(let i = 0; i <= seatCount; i++){
		seatArray.push(new seat(i))
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
				
				html += `<div class="pixel-index">Assento ${pixelIndex+1}</div>`

				let s = seatArray.find(x => x.index == pixelIndex)

				html += '<div class="time">'
				html += `<div class="time-available">${times.filter(x=>x !== s.time)}</div>`
				if(s.time)
					html += `<div class="time-occupied">${s.time}</div>`
				html += '</div>'

				if(s.route)
					html += s.route
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
		let route
		
		if(i < seatsToOccupy / 2)
			route = routes[0]
		else
			route = routes[1]
		
		s.time = route.time[0]
		s.route = route.route
	}

	renderSeats()
}

function occupySeat(index){
	let s = seatArray.find(x => x.index == index)
	s.route = routes[0].route
	s.time = routes[0].time[0]

	renderSeats()
	populateLists()
}

function populateLists(){
	let html = ''

	for(let i = 0; i < seatArray.length; i++){
		let s = seatArray.find(x => x.index == i)
		if(!s.time)
			html += `<option value="${i}">Assento ${s.index+1}</option>`
	}

	document.getElementById('bookSeat').innerHTML = html;
}


function seat(index, route, time){
	this.index = index
	this.route = route
	this.time = time
}
const routes = [{
	route: "Porto Alegre -> Florianópolis",
	time: ["6h","16h"]},
{
	route: "Porto Alegre -> Criciúma",
	time: ["6h","16h"]},
{
	route: "Criciúma -> Florianópolis",
	time: ["10h","20h"]
}]
const times = ["6h", "10h", "16h", "20h"]


start()