

var Cryptourl = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"

async function displayFiveDayForecast() {

    var queryURL = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"

   

fetch('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
  .then(response => response.json())
  .then(data => console.log(data));}