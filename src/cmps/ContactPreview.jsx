import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function ContactPreview({ contact, onRemoveContact }) {
  const contactStyle = {
    backgroundImage: `url(https://robohash.org/${contact._id})`,
  };

  return (
    <article className="contact-preview">
      <Link className="info" to={`/contact/${contact._id}`}>
        <div className="passport" style={contactStyle}></div>
        <h2 className="contact-name">{contact.name}</h2>
        <h4 className="contact-email">Email: {contact.email}</h4>
        <h4 className="contact-phone">Phone: {contact.phone}</h4>
      </Link>
      <Link className="edit" to={`/contact/edit/${contact._id}`}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </Link>
      <button
        className="btn-remove"
        onClick={(ev) => onRemoveContact(ev, contact._id)}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </article>
  );
}
