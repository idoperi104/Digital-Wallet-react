import { Component } from "react";
import { bitcoinService } from "../services/bitcoin.service";
import { userService } from "../services/user.service";
import { connect } from "react-redux";
import MovesList from "../cmps/MovesList";

class _Home extends Component {
  state = {
    rate: null,
  };

  componentDidMount() {
    this.getRate();
  }

  getRate = async () => {
    try {
      const rate = await bitcoinService.getRate();
      this.setState({ rate });
    } catch (error) {
      console.log("error:", error);
    }
  };

  get movesToShow(){
    const {moves} = this.props.loggedInUser
    console.log('moves', moves);
    return moves.length <= 3
    ? moves
    : moves.slice(0, 3)
  }

  render() {
    const { rate } = this.state;
    const {loggedInUser} = this.props;
    return loggedInUser ? (
      <section className="home">
        <h1>Hello {`${loggedInUser.username}`}!</h1>
        {/* <pre>{JSON.stringify(loggedInUser)}</pre> */}
        <h2>current Bitcoin Rate: {`${rate}`}</h2>
        <MovesList title={'Your last 3 moves:'} moves={this.movesToShow}/>
      </section>
    ) : (
      <h1>Please Sign up!</h1>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.userModule.loggedInUser
});

export const Home = connect(
  mapStateToProps
)(_Home);
