import { useEffect, useState } from "react";
import { contactService } from "../services/contact.service";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export function ContactEdit(props) {
  const [contact, setContact] = useState(contactService.getEmptyContact());

  const params = useParams();

  useEffect(() => {
    loadContact();
  }, []);

  async function loadContact() {
    const contactId = params.id;
    if (contactId) {
      try {
        const contact = await contactService.getContactById(contactId);
        setContact(contact);
      } catch (error) {
        console.log("error:", error);
      }
    }
  }

  async function onSaveContact(ev) {
    ev.preventDefault();
    try {
      await contactService.saveContact({ ...contact });
      props.history.push("/contact");
    } catch (error) {
      console.log("error:", error);
    }
  }

  function handleChange({ target }) {
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
    setContact({ ...contact, [field]: value });
  }

  const { name, email, phone } = contact;
  return (
    <section className="contact-edit">
      <h2>{contact._id ? "Edit" : "Add"} Contact</h2>
      <form className="form-edit" onSubmit={onSaveContact}>
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          id="name"
        />

        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
        />

        <label htmlFor="phone">Phone:</label>
        <input
          value={phone}
          onChange={handleChange}
          type="text"
          name="phone"
          id="phone"
        />

        <button>Save</button>
      </form>
    </section>
  );
}
