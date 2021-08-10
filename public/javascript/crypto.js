const cryptoURL =
  "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=a4aab0aac84ce952d019d02f61fba54756f47ca0417926e2297e8156df016996";

const fetchCrypto = async function (cryptoURL) {
  try {
    let cryptoData = await fetch(cryptoURL);
    cryptoData = await cryptoData.json();
    return cryptoData.Data;
  } catch (error) {
    console.log(error);
  }
};

fetchCrypto(cryptoURL).then((data) => {
  const cryptoData = data.map((data) => {
    let ticker = "No Info";
    let fullName = "No Info";
    let image = "No Info";
    let mktCap = "No Info";
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
      ticker,
      fullName,
      image,
      mktCap,
      price,
      low,
      high,
      change,
    };
  });

  console.log(cryptoData);
});
