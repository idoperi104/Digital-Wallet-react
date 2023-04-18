import { Component } from "react";
import { contactService } from "../services/contact.service";
import TransferFund from "../cmps/TransferFund";
import MovesList from "../cmps/MovesList";
import { connect } from "react-redux";
import { transferCoins } from "../store/actions/user.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

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
    const { contact } = this.state;
    const { loggedInUser } = this.props;
    return loggedInUser.moves.filter((move) => move.toId === contact._id);
  }

  render() {
    const { contact } = this.state;
    const { loggedInUser } = this.props;
    if (!contact) return <div>Loading...</div>;
    // if (!loggedInUser) return <div>Please Log in...</div>;
    return (
      <section className="contact-details flex">
        <button className="btn-back" onClick={this.onBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <section className="details-info">
          <h2>{contact.name}</h2>
          <h3>Email: {contact.email}</h3>
          <h3>Phone number: {contact.phone}</h3>
          <img src={`https://robohash.org/${contact._id}`} />
        </section>

        {loggedInUser && (
          <section className="transfer-info">
            <h2>Make a Transfer</h2>
            <TransferFund
              contact={contact}
              maxCoins={loggedInUser.coins}
              onTransferCoins={this.onTransferCoins}
            />
            <MovesList title={"Your Moves:"} moves={this.filterMoves} />
          </section>
        )}
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
