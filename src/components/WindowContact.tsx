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
          {/* Champ de saisie pour le Nom avec les attributs id et name */}
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

          {/* Label pour le champ Email */}
          <label htmlFor="email"></label>
          {/* Champ de saisie pour l'Email avec les attributs id et name */}
          <input
            type="email"
            placeholder="Votre Email..."
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        {/* Label pour le champ Message */}
        <label htmlFor="message">Message:</label>
        {/* Champ de saisie pour le Message avec les attributs id et name */}
        <textarea
          id="message"
          name="message"
          placeholder="Votre message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          autoComplete="off"
        />

        {/* Bouton de soumission du formulaire */}
        <button type="submit">Envoyer</button>
      </form>{" "}
      <span className="contact-call-to-action">
        Laissez-moi un message ✍️ et je vous répondrai dans les plus brefs
        délais !
      </span>
    </>
  );
};

export default ContactForm;
