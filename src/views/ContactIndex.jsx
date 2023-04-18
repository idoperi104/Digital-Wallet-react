import { Component } from "react";
import { contactService } from "../services/contact.service";
import { ContactList } from "../cmps/ContactList";
import { ContactFilter } from "../cmps/ContactFilter";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadContacts,
  removeContact,
  setFilterBy,
} from "../store/actions/contact.actions";

class _ContactIndex extends Component {
  componentDidMount() {
    this.props.loadContacts();
  }

  onRemoveContact = async (ev, contactId) => {
    console.log("ev: ", ev);
    ev.stopPropagation()
    try {
      const res = await this.props.removeContact(contactId);
    } catch (error) {
      console.log("error:", error);
    }
  };

  onChangeFilter = (filterBy) => {
    this.props.setFilterBy(filterBy);
    this.props.loadContacts();
  };

  render() {
    const { contacts, filterBy } = this.props;
    if (!contacts) return <div>Loading...</div>;

    return (
      <section className="contact-index">
        
        <Link to="/contact/edit"><button className="btn-add">Add Contact</button></Link>
        <ContactFilter
          filterBy={filterBy}
          onChangeFilter={this.onChangeFilter}
        />
        <ContactList
          contacts={contacts}
          onRemoveContact={this.onRemoveContact}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contactModule.contacts,
  filterBy: state.contactModule.filterBy,
});

const mapDispatchToProps = {
  loadContacts,
  removeContact,
  setFilterBy,
};

export const ContactIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactIndex);
