const { contains } = "sequelize/types/lib/operators";

const fetchCrypto = async function (page) {
  const cryptoURL =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&page=" +
    page +
    "&tsym=USD&api_key=a4aab0aac84ce952d019d02f61fba54756f47ca0417926e2297e8156df016996";
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
  const containerAllEl = document.querySelector(".crypto-container-all");
  cryptoData.forEach((cryptoData, index) => {
    const containerSingleEl = document.createElement("div");

    containerSingleEl.setAttribute("class", "row crypto-container");
    containerSingleEl.setAttribute("data-ticker", cryptoData.ticker);
    containerSingleEl.setAttribute("data-fullName", cryptoData.fullName);

    const imageContainerEl = document.createElement("div");
    imageContainerEl.setAttribute("class", "col crypto-image-container");
    const imageEl = document.createElement("img");
    imageEl.setAttribute("class", "crypto-image");
    imageEl.setAttribute(
      "src",
      "https://www.cryptocompare.com" + cryptoData.image
    );
    imageContainerEl.append(imageEl);
    containerSingleEl.append(imageContainerEl);
    const fullNameEl = document.createElement("div");
    fullNameEl.setAttribute("class", "col crypto-fullName");
    fullNameEl.textContent = cryptoData.fullName;
    const fullNameHeaderEl = document.createElement("div");
    fullNameHeaderEl.setAttribute("class", "col fullName-header");
    fullNameHeaderEl.textContent = "Name:";
    fullNameHeaderEl.append(fullNameEl);
    containerSingleEl.append(fullNameHeaderEl);
    const tickerEl = document.createElement("div");
    tickerEl.setAttribute("class", "col crypto-ticker");
    tickerEl.textContent = cryptoData.ticker;
    const tickerHeaderEl = document.createElement("div");
    tickerHeaderEl.setAttribute("class", "col ticker-header");
    tickerHeaderEl.textContent = "Ticker:";
    tickerHeaderEl.append(tickerEl);
    containerSingleEl.append(tickerHeaderEl);
    const priceEl = document.createElement("div");
    priceEl.setAttribute("class", "col crypto-price");
    priceEl.textContent = cryptoData.price.toFixed(4);
    const priceHeaderEl = document.createElement("div");
    priceHeaderEl.setAttribute("class", "col price-header");
    priceHeaderEl.textContent = "Price:";
    priceHeaderEl.append(priceEl);
    containerSingleEl.append(priceHeaderEl);
    const lowEl = document.createElement("div");
    lowEl.setAttribute("class", "col crypto-low");
    lowEl.textContent = cryptoData.low.toFixed(2);
    const lowHeaderEl = document.createElement("div");
    lowHeaderEl.setAttribute("class", "col low-header");
    lowHeaderEl.textContent = "Low:";
    lowHeaderEl.append(lowEl);
    containerSingleEl.append(lowHeaderEl);
    const highEl = document.createElement("div");
    highEl.setAttribute("class", "col crypto-high");
    highEl.textContent = cryptoData.high.toFixed(2);
    const highHeaderEl = document.createElement("div");
    highHeaderEl.setAttribute("class", "col high-header");
    highHeaderEl.textContent = "High:";
    highHeaderEl.append(highEl);
    containerSingleEl.append(highHeaderEl);
    const changeEl = document.createElement("div");
    changeEl.setAttribute("class", "col crypto-change");
    changeEl.textContent = cryptoData.change.toFixed(4);
    const changeHeaderEl = document.createElement("div");
    changeHeaderEl.setAttribute("class", "col change-header");
    changeHeaderEl.textContent = "Change:";
    changeHeaderEl.append(changeEl);
    containerSingleEl.append(changeHeaderEl);
    const mktCapEl = document.createElement("div");
    mktCapEl.setAttribute("class", "col crypto-mktCap");
    mktCapEl.textContent = cryptoData.mktCap.toFixed(2);
    const mktCapHeaderEl = document.createElement("div");
    mktCapHeaderEl.setAttribute("class", "col mktCap-header");
    mktCapHeaderEl.textContent = "MktCap:";
    mktCapHeaderEl.append(mktCapEl);
    containerSingleEl.append(mktCapHeaderEl);
    containerAllEl.append(containerSingleEl);

    highlightSaved(cryptoData.ticker, containerSingleEl);
  });
};

const containerEl = document.querySelector(".crypto-container-all");
containerEl.addEventListener("click", function (event) {
  const loggedIn = document.getElementById("loggedIn").textContent;
  if (loggedIn) {
    const userId = document.getElementById("userId").textContent;
    let clickedItem = event.target.parentElement;
    // reload to show the item clicked is saved, only reloads if user is logged in and container is not already highlighted
    if (clickedItem.className === "row crypto-container") {
      const ticker = clickedItem.dataset.ticker;
      const fullName = clickedItem.dataset.fullname;
      duplicateValidation(fullName, ticker, userId);
    } else if (clickedItem.parentElement.className === "row crypto-container") {
      clickedItem = clickedItem.parentElement;
      const ticker = clickedItem.dataset.ticker;
      const fullName = clickedItem.dataset.fullname;
      duplicateValidation(fullName, ticker, userId);
    }
  }
});

async function addCrypto(crypto_name, ticker, user_id) {
  const response = await fetch("/api/cryptos", {
    method: "post",
    body: JSON.stringify({
      crypto_name,
      ticker,
      user_id,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    //res.else;
  } else {
    alert(response.statusText);
  }
}

const duplicateValidation = async function (cryptoName, ticker, userId) {
  let userCryptos = await fetch("/api/cryptos/" + userId);
  userCryptos = await userCryptos.json();
  let duplicate = false;
  userCryptos.forEach((crypto) => {
    if (crypto.ticker === ticker) {
      duplicate = true;
    }
  });
  if (!duplicate) {
    console.log("saved: ", cryptoName, ticker);
    //cryptoTicker is split here because to format the word properly for the database
    addCrypto(cryptoName, ticker, userId);
  } else {
    console.log("cannot save duplicate");
  }
  location.reload();
  return;
};

const highlightSaved = async function (ticker, containerSingleEl) {
  const loggedIn = document.getElementById("loggedIn").textContent;
  const userId = document.getElementById("userId").textContent;
  const highlightColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--highlight-color");
  if (loggedIn) {
    let userCryptos = await fetch("/api/cryptos/" + userId);
    userCryptos = await userCryptos.json();
    let isSaved = false;
    userCryptos.forEach((crypto) => {
      if (crypto.ticker === ticker) {
        isSaved = true;
      }
    });
    if (isSaved) {
      containerSingleEl.style.background = highlightColor;
    }
  }
};

const getPage = function () {
  if (!localStorage.getItem("page-number")) {
    document.getElementById("left-button").style.display = "none";
    localStorage.setItem("page-number", 0);
    return 0;
  } else {
    if (localStorage.getItem("page-number") === "0") {
      document.getElementById("left-button").style.display = "none";
    }
    return localStorage.getItem("page-number");
  }
};

const leftButtonEl = document.querySelector("#left-button");
const rightButtonEl = document.querySelector("#right-button");
rightButtonEl.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("click");
  let currentPage = localStorage.getItem("page-number");
  let nextPage = parseInt(currentPage) + 1;
  console.log(nextPage);
  localStorage.setItem("page-number", nextPage);
  location.reload();
});
leftButtonEl.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("click");
  let currentPage = localStorage.getItem("page-number");
  let nextPage = parseInt(currentPage) - 1;
  console.log(nextPage);
  localStorage.setItem("page-number", nextPage);
  location.reload();
});
const logoEl = document.querySelector(".navbar-brand");
logoEl.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.setItem("page-number", 0);
  location.reload();
});
const pageNumber = getPage();
fetchCrypto(pageNumber);
