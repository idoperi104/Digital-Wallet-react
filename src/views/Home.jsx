import { Component } from "react";
import { bitcoinService } from "../services/bitcoin.service";
import { userService } from "../services/user.service";
import { connect } from "react-redux";
import MovesList from "../cmps/MovesList";
import { Link } from "react-router-dom";

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

  get movesToShow() {
    const { moves } = this.props.loggedInUser;
    console.log("moves", moves);
    return moves.length <= 3 ? moves : moves.slice(0, 3);
  }

  render() {
    const { rate } = this.state;
    const { loggedInUser } = this.props;
    return (
      <section className="home">
        {loggedInUser && (
          <section className="user-info">
            <h3>Hello {`${loggedInUser.username}`}!</h3>
            <MovesList title={"Your last 3 moves:"} moves={this.movesToShow} />
          </section>
        )}
        <section className="hero">
          <h2>
            Get easy access to your crypto assets with <span>WALLET</span>
          </h2>
          <h3>
            Managine your crypto assets has never been easier. Get quick and
            hassle-free access to your digital currency portfolio today.
          </h3>
          <Link to={`/signup`}>
            <button className="btn-signup">Sign up</button>
          </Link>
          <div className="img"></div>
        </section>

        <section className="bitcoin-rate">
          <h3>current Bitcoin Rate: {`${rate}`}</h3>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.userModule.loggedInUser,
});

export const Home = connect(mapStateToProps)(_Home);
