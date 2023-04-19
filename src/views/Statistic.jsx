import { Component, useEffect, useState } from "react";
import { bitcoinService } from "../services/bitcoin.service";
import { Chart } from "../cmps/Chart";

export function Statistic(props) {
  const [marketPrice, setMarketPrice] = useState()

  useEffect(() => {
    getMarketPrice()
  }, [])
  

  async function getMarketPrice () {
    try {
      const marketPrice = await bitcoinService.getMarketPrice();
      setMarketPrice( marketPrice );
    } catch (error) {
      console.log("error:", error);
    }
  };

    if (!marketPrice) return <div>loading...</div>;
    return (
      <div>
        <Chart title="Market Price:" data={marketPrice} />
      </div>
    );
}
