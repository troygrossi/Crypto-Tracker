const cryptoURL =
  "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=a4aab0aac84ce952d019d02f61fba54756f47ca0417926e2297e8156df016996";

const fetchCrypto = async function (cryptoURL) {
  try {
    let cryptoData = await fetch(cryptoURL);
    cryptoData = await cryptoData.json();
    cryptoData = mapObject(cryptoData.Data);
    generateRows(cryptoData);
    return 0;
  } catch (error) {
    console.log(error);
  }
};
const mapObject = function (data) {
  const cryptoData = data.map((data) => {
    let ticker = "No Info";
    let fullName = "No Info";
    let image = "No Info";
    let mktCap = "No Info";
    let price = "No Info";
    let low = "No Info";
    let high = "No Info";
    let change = "No Info";
    if (data.CoinInfo.Name) {
      ticker = data.CoinInfo.Name;
    }
    if (data.CoinInfo.FullName) {
      fullName = data.CoinInfo.FullName;
    }
    if (data.CoinInfo.ImageUrl) {
      image = data.CoinInfo.ImageUrl;
    }
    if (data.RAW) {
      mktCap = data.RAW.USD.MKTCAP;
      price = data.RAW.USD.PRICE;
      low = data.RAW.USD.LOW24HOUR;
      high = data.RAW.USD.HIGH24HOUR;
      change = data.RAW.USD.CHANGE24HOUR;
    }
    return {
      fullName,
      ticker,
      price,
      low,
      high,
      change,
      mktCap,
      image,
    };
  });
  return cryptoData;
};

// Generate containers that contain the list of crypto
// Idea is: have a container that already exists with no data called .crypto-container, this will hold all the cryptos
// Then, this function creates a new container for every crytpo pulled from the API
// Then, they are assigned the class .cryptos
// Then, a container for every object variable(ex: fullname) will be created and appended to the respectivc crypto
// Then, the crypto will be appended to .crypto-container
const generateRows = function (cryptoData) {
  console.log(cryptoData);
  const containerAllEl = document.querySelector(".crypto-container-all");
  cryptoData.forEach((cryptoData, index) => {
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
  });
  console.log("test");
};

fetchCrypto(cryptoURL);
