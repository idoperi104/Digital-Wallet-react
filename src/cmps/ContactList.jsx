import { ContactPreview } from "./ContactPreview.jsx";

export function ContactList({ contacts, onRemoveContact }) {
    return (
        <section className="contact-list">
            {contacts.map(contact =>
                <ContactPreview key={contact._id} contact={contact} onRemoveContact={onRemoveContact} />
            )}
        </section>
    )
}