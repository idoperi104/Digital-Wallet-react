import React from "react";
import { Link } from "react-router-dom";

export function ContactPreview({
  contact,
  onRemoveContact,
}) {
  const contactStyle = {
    backgroundImage: `url(https://robohash.org/${contact._id})`,
  };

  return (
    <article style={contactStyle} className="contact-preview">
      <Link to={`/contact/${contact._id}`}>
        <h2>{contact.name}</h2>
        <h4>{contact.email}</h4>
        <h4>{contact.phone}</h4>
      </Link>
      <button onClick={() => onRemoveContact(contact._id)}>X</button>
      <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
    </article>
  );
}
