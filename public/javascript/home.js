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
    containerSingleEl.setAttribute("data-index", index);

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
    fullNameEl.textContent = `Name: ${cryptoData.fullName}`;
    containerSingleEl.append(fullNameEl);
    const tickerEl = document.createElement("div");
    tickerEl.setAttribute("class", "col rypto-ticker");
    tickerEl.textContent = `Ticker: ${cryptoData.ticker}`;
    containerSingleEl.append(tickerEl);
    const priceEl = document.createElement("div");
    priceEl.setAttribute("class", "col crypto-price");
    priceEl.textContent = `Price: ${cryptoData.price}`;
    containerSingleEl.append(priceEl);
    const lowEl = document.createElement("div");
    lowEl.setAttribute("class", "col crypto-low");
    lowEl.textContent = `Low: ${cryptoData.low}`;
    containerSingleEl.append(lowEl);
    const highEl = document.createElement("div");
    highEl.setAttribute("class", "col crypto-high");
    highEl.textContent = `High: ${cryptoData.high}`;
    containerSingleEl.append(highEl);
    const changeEl = document.createElement("div");
    changeEl.setAttribute("class", "col crypto-change");
    changeEl.textContent = `Change: ${cryptoData.change}`;
    containerSingleEl.append(changeEl);
    const mktCapEl = document.createElement("div");
    mktCapEl.setAttribute("class", "col crypto-mktCap");
    mktCapEl.textContent = `Market Cap: ${cryptoData.mktCap}`;
    containerSingleEl.append(mktCapEl);

    //create button element and append to div

    containerAllEl.append(containerSingleEl);

    highlightSaved(cryptoData.ticker, containerSingleEl);
  });
};

const containerEl = document.querySelector(".crypto-container-all");
containerEl.addEventListener("click", function (event) {
  const loggedIn = document.getElementById("loggedIn").textContent;
  if (loggedIn) {
    const userId = document.getElementById("userId").textContent;
    const clickedItem = event.target.parentElement;
    // reload to show the item clicked is saved, only reloads if user is logged in and container is not already highlighted
    if (clickedItem.className === "row crypto-container") {
      const cryptoName = clickedItem.children[1].textContent;
      const cryptoTicker = clickedItem.children[2].textContent;
      duplicateValidation(
        cryptoName.split(" ")[1],
        cryptoTicker.split(" ")[1],
        userId
      );
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
