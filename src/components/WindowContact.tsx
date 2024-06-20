import { useState } from "react";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Message de ${name}`;
    const body = `Nom de l'expéditeur: ${name}\nEmail de contact: ${email}\n\nMessage:\n${message}`;
    const mailto = `mailto:wbrp51@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailto, "_blank");
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="sender-info">
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Votre nom..."
            autoComplete="name"
          />

          <label htmlFor="email"></label>
          <input
            type="email"
            placeholder="Votre email..."
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          placeholder="Votre message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          autoComplete="off"
        />

        <button type="submit">Envoyer</button>
      </form>{" "}
      <span className="contact-call-to-action">
        Laissez-moi un message ✍️ <br /> je vous répondrai dans les plus brefs
        délais
      </span>
    </>
  );
};

export default ContactForm;
