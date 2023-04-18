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
        <Chart title="Market Price:" data={marketPrice} />
      </div>
    );
  }
}
