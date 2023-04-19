import { useEffect } from "react";
import { ContactList } from "../cmps/ContactList";
import { ContactFilter } from "../cmps/ContactFilter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadContacts,
  removeContact,
  setFilterBy,
} from "../store/actions/contact.actions";

export function ContactIndex(props) {
  const contacts = useSelector(
    (storeState) => storeState.contactModule.contacts
  );
  const filterBy = useSelector(
    (storeState) => storeState.contactModule.filterBy
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadContacts());
  }, []);

  async function onRemoveContact(ev, contactId) {
    ev.stopPropagation();
    try {
      dispatch(removeContact(contactId));
    } catch (error) {
      console.log("error:", error);
    }
  }

  function onChangeFilter(filterBy) {
    dispatch(setFilterBy(filterBy));
    dispatch(loadContacts());
  }

  if (!contacts) return <div>Loading...</div>;

  return (
    <section className="contact-index">
      <Link to="/contact/edit">
        <button className="btn-add">Add Contact</button>
      </Link>
      <ContactFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />
      <ContactList contacts={contacts} onRemoveContact={onRemoveContact} />
    </section>
  );
}
