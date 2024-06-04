import { useDraggable } from '@dnd-kit/core';

const PdfLink = () => {
  const { draggableProps } = useDraggable;

  return (
    <a href="/cv.pdf" target="_blank" className="pdf-link" {...draggableProps}>
      <img src="./icons/pdf.png" id="pdf-ico" alt="icone .pdf" />
      <span className="pdf-text">Mon cv</span>
    </a>
  );
};

export default PdfLink;