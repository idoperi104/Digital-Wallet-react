import React, { useEffect, useState } from "react";

export function ContactFilter(props) {
  const [filterBy, setFilterBy] = useState({ ...props.filterBy });

  useEffect(() => {
    props.onChangeFilter(filterBy);
  }, [filterBy]);

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
      default:
        break;
    }
    setFilterBy({ ...filterBy, [field]: value });
  }

  if (!filterBy) return <div>Loading...</div>;
  const { name, phone } = filterBy;
  return (
    <form className="contact-filter flex align-center">
      <section className="flex align-center">
        <label htmlFor="name">Name:</label>
        <input
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          id="name"
        />
      </section>
      <section className="flex align-center">
        <label htmlFor="phone">Phone:</label>
        <input
          onChange={handleChange}
          value={phone}
          type="text"
          name="phone"
          id="phone"
        />
      </section>
    </form>
  );
}
