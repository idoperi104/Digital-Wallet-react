import axios from "axios";
export const bitcoinService = {
  getRate,
  getMarketPrice,
};

async function getRate(coins = 1) {
  try {
    const res = await axios.get(
      `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    );
    return coins / res.data;
  } catch (err) {
    return err;
  }
}

async function getMarketPrice() {
  try {
    let res = await axios.get(
      `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
    );
    res = res.data.values.map((val) => val.y);
    return res;
  } catch (err) {
    return err;
  }
}
