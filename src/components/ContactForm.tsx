import React, { useState } from 'react';
import Mailto from './Mailto';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="name">Nom:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Mailto email="votre@adresse.com" subject={`Message de ${name}`} body={`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`}>
        <button type="submit">Envoyer</button>
      </Mailto>
    </form>
  );
};

export default ContactForm;
