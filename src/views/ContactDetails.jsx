import { useEffect, useState } from "react";
import { contactService } from "../services/contact.service";
import {TransferFund} from "../cmps/TransferFund";
import {MovesList} from "../cmps/MovesList";
import { useDispatch, useSelector } from "react-redux";
import { transferCoins } from "../store/actions/user.actions";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export function ContactDetails(props) {
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser)
  const dispatch = useDispatch()

  const [contact, setContact] = useState(null);
  const params = useParams();
  // const navigate = useNavigate()

  

  useEffect(() => {
    loadContact();
  }, [params.id]);

  async function loadContact() {
    try {
      const contact = await contactService.getContactById(params.id);
      setContact(contact);
    } catch (error) {
      console.log("error:", error);
    }
  }

  function onBack() {
    props.history.push("/contact");
  }

  function onTransferCoins(contact, amount) {
    dispatch(transferCoins(contact, amount));
  }

  function filterMoves() {
    return loggedInUser.moves.filter((move) => move.toId === contact._id);
  }

  if (!contact) return <div>Loading...</div>;
  return (
    <section className="contact-details flex">
      <button className="btn-back" onClick={onBack}>
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
            onTransferCoins={onTransferCoins}
          />
          <MovesList title={"Your Moves:"} moves={filterMoves()} />
        </section>
      )}
    </section>
  );
}