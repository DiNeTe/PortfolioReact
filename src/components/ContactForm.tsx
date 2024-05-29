// src/components/ContactForm.tsx
import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <form className="contact-form">
      <label htmlFor="name">Nom:</label>
      <input type="text" id="name" name="name" required />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" required />
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default ContactForm;
