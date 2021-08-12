const fetchCryptoData = async function (ticker, fullName, index) {
  ticker = ticker.toUpperCase();
  const cryptoURL =
    "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
    ticker +
    "&tsyms=USD&api_key=a4aab0aac84ce952d019d02f61fba54756f47ca0417926e2297e8156df016996";
  try {
    let cryptoData = await fetch(cryptoURL);
    cryptoData = await cryptoData.json();
    cryptoData = parseObject(cryptoData.RAW[ticker].USD, ticker, fullName);
    console.log(cryptoData);
    generateRows(cryptoData, index);
    return 0;
  } catch (error) {
    console.log(error);
  }
};

const parseObject = function (data, ticker, fullName) {
  const cryptoData = {
    fullName,
    ticker,
    price: "No Info",
    low: "No Info",
    high: "No Info",
    change: "No Info",
    mktCap: "No Info",
    image: "No Info",
  };

  if (data.PRICE) {
    cryptoData.price = data.PRICE;
  }
  if (data.LOW24HOUR) {
    cryptoData.low = data.LOW24HOUR;
  }
  if (data.HIGH24HOUR) {
    cryptoData.high = data.HIGH24HOUR;
  }
  if (data.CHANGE24HOUR) {
    cryptoData.change = data.CHANGE24HOUR;
  }
  if (data.MKTCAP) {
    cryptoData.mktCap = data.MKTCAP;
  }
  if (data.IMAGEURL) {
    cryptoData.image = data.IMAGEURL;
  }

  return cryptoData;
};

const generateRows = function (cryptoData, index) {
  const containerAllEl = document.querySelector(".crypto-container-all");
  const containerSingleEl = document.createElement("div");
  containerSingleEl.setAttribute("class", "crypto-container");
  containerSingleEl.setAttribute("data-index", index);

  const fullNameEl = document.createElement("div");
  fullNameEl.setAttribute("class", "crypto-fullName");
  fullNameEl.textContent = cryptoData.fullName;
  containerSingleEl.append(fullNameEl);
  const tickerEl = document.createElement("div");
  tickerEl.setAttribute("class", "crypto-ticker");
  tickerEl.textContent = cryptoData.ticker;
  containerSingleEl.append(tickerEl);
  const priceEl = document.createElement("div");
  priceEl.setAttribute("class", "crypto-price");
  priceEl.textContent = cryptoData.price;
  containerSingleEl.append(priceEl);
  const lowEl = document.createElement("div");
  lowEl.setAttribute("class", "crypto-low");
  lowEl.textContent = cryptoData.low;
  containerSingleEl.append(lowEl);
  const highEl = document.createElement("div");
  highEl.setAttribute("class", "crypto-high");
  highEl.textContent = cryptoData.high;
  containerSingleEl.append(highEl);
  const changeEl = document.createElement("div");
  changeEl.setAttribute("class", "crypto-change");
  changeEl.textContent = cryptoData.change;
  containerSingleEl.append(changeEl);
  const mktCapEl = document.createElement("div");
  mktCapEl.setAttribute("class", "crypto-mktCap");
  mktCapEl.textContent = cryptoData.mktCapt;
  containerSingleEl.append(mktCapEl);
  const imageContainerEl = document.createElement("div");
  imageContainerEl.setAttribute("class", "crypto-image-container");
  const imageEl = document.createElement("img");
  imageEl.setAttribute("class", "crypto-image");
  imageEl.setAttribute(
    "src",
    "https://www.cryptocompare.com" + cryptoData.image
  );
  imageContainerEl.append(imageEl);
  containerSingleEl.append(imageContainerEl);

  containerAllEl.append(containerSingleEl);
};

const getUserCryptos = function (userCryptos) {
  userCryptos.forEach((crypto, index) => {
    //
    fetchCryptoData(crypto.ticker, crypto.crypto_name, index);
    //
  });
};

const getProfileData = async function (user_id) {
  const response = await fetch("/api/cryptos/" + user_id, {
    method: "get",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    response.json().then((userCryptos) => {
      //
      getUserCryptos(userCryptos);
      //
    });
  } else {
    alert(response.statusText);
  }
};
const user_id = 1; // temporay variable, eventually user_id will be pulled from cookies
getProfileData(user_id);
