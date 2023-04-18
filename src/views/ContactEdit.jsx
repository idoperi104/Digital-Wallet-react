import { Component } from "react";
import { contactService } from "../services/contact.service";

export class ContactEdit extends Component {
  state = {
    contact: contactService.getEmptyContact(),
  };

  async componentDidMount() {
    const contactId = this.props.match.params.id;
    if (contactId) {
      try {
        const contact = await contactService.getContactById(contactId);
        this.setState({ contact });
      } catch (error) {
        console.log("error:", error);
      }
    }
  }

  onSaveContact = async (ev) => {
    ev.preventDefault();
    try {
      await contactService.saveContact({ ...this.state.contact });
      this.props.history.push("/contact");
    } catch (error) {
      console.log("error:", error);
    }
  };

  handleChange = ({ target }) => {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }
    this.setState(({ contact }) => ({
      contact: { ...contact, [field]: value },
    }));
  };

  render() {
    const { contact } = this.state;
    const { name, email, phone } = contact;
    return (
      <section className="contact-edit">
        <h1>{contact._id ? "Edit" : "Add"} Contact</h1>
        <form onSubmit={this.onSaveContact}>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={this.handleChange}
            type="text"
            name="name"
            id="name"
          />

          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={this.handleChange}
            type="text"
            name="email"
            id="email"
          />

          <label htmlFor="phone">Phone</label>
          <input
            value={phone}
            onChange={this.handleChange}
            type="text"
            name="phone"
            id="phone"
          />

          
          <button>Save</button>
        </form>
      </section>
    );
  }
}
