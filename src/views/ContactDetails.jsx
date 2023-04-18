import { Component } from "react";
import { contactService } from "../services/contact.service";
import TransferFund from "../cmps/TransferFund";
import MovesList from "../cmps/MovesList";
import { connect } from "react-redux";
import { transferCoins } from "../store/actions/user.actions";

export class _ContactDetails extends Component {
  state = {
    contact: null,
  };

  componentDidMount() {
    this.loadContact();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact();
    }
  }

  loadContact = async () => {
    try {
      const contact = await contactService.getContactById(
        this.props.match.params.id
      );
      this.setState({ contact });
    } catch (error) {
      console.log("error:", error);
    }
  };

  onBack = () => {
    this.props.history.push("/contact");
  };

  onTransferCoins = (contact, amount) => {
    this.props.transferCoins(contact, amount);
  };

  get filterMoves() {
    const { contact } = this.state
    const { loggedInUser } = this.props
    return loggedInUser.moves.filter((move) => move.toId === contact._id)
  }

  render() {
    const { contact } = this.state;
    const { loggedInUser } = this.props;
    if (!contact) return <div>Loading...</div>;
    // if (!loggedInUser) return <div>Please Log in...</div>;
    return (
      <section className="contact-details">
        <section>
          <h3>name: {contact.name}</h3>
        </section>
        <section>
          <h3>email: {contact.email}</h3>
        </section>
        <section>
          <h3>phone: {contact.phone}</h3>
        </section>
        <img src={`https://robohash.org/${contact._id}`} />

        {loggedInUser && (
          <>
            <TransferFund
              contact={contact}
              maxCoins={loggedInUser.coins}
              onTransferCoins={this.onTransferCoins}
            />
            <MovesList title={'Your Moves:'} moves={this.filterMoves} />
          </>
        )}
        {!loggedInUser && <div>loading...</div>}
        <button onClick={this.onBack}>Back</button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contactModule.contacts,
  loggedInUser: state.userModule.loggedInUser,
});

const mapDispatchToProps = {
  transferCoins,
};

export const ContactDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactDetails);
