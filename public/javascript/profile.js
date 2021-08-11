const fetchSingleCrypto = async function (cryptoName) {
  cryptoName = cryptoName.toUpperCase();
  const cryptoURL =
    "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
    cryptoName +
    "&tsyms=USD&api_key=a4aab0aac84ce952d019d02f61fba54756f47ca0417926e2297e8156df016996";
  try {
    let cryptoData = await fetch(cryptoURL);
    cryptoData = await cryptoData.json();
    // cryptoData = mapObject(cryptoData.Data);
    console.log(cryptoData);
    // .DISPLAY[cryptoName].USD
    return 0;
  } catch (error) {
    console.log(error);
  }
};

const getProfileData = async function () {
  const response = await fetch("/api/cryptos/1", {
    method: "get",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    response.json().then((cryptoName) => {
      console.log(cryptoName);
    });
  } else {
    alert(response.statusText);
  }
};
getProfileData();
fetchSingleCrypto("eth");
