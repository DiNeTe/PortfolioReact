const PdfLink = () => {
  return (
    <a href="/cv.pdf" target="_blank" className="pdf-link">
      <img src="./icons/pdf.png" id="pdf-ico" alt="icone .pdf" />
      <span className="pdf-text">Mon cv</span>
    </a>
  );
};

export default PdfLink;