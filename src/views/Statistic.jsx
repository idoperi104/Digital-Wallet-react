import { Component } from "react";
import { bitcoinService } from "../services/bitcoin.service";
import { Chart } from "../cmps/Chart";

export class Statistic extends Component {
  state = {
    marketPrice: null,
  };

  componentDidMount() {
    this.getMarketPrice();
  }

  getMarketPrice = async () => {
    try {
      const marketPrice = await bitcoinService.getMarketPrice();
      this.setState({ marketPrice });
    } catch (error) {
      console.log("error:", error);
    }
  };

  render() {
    const { marketPrice } = this.state;
    if (!marketPrice) return <div>loading...</div>;
    return (
      <div>
        <h1>statistic</h1>
        {/* <h2>current Bitcoin Rate: {`${marketPrice}`}</h2> */}
        <Chart data={marketPrice} />
      </div>
    );
  }
}
