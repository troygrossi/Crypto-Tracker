

var Cryptourl = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"

async function displayFiveDayForecast() {

    var queryURL = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"

   

fetch('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
  .then(response => response.json())
  .then(data => console.log(data));}

  fetch("https://coinranking1.p.rapidapi.com/exchanges", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coinranking1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

  
  
