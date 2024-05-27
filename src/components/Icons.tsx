type IconProps = {
    dataTitle: string;
    imgSrc: string;
    alt: string;
    id: string;
    onClick: (id: string) => void;
  };
  
  const Icon: React.FC<IconProps> = ({ dataTitle, imgSrc, alt, id, onClick }) => {
    return (
      <li>
        <a href="#" id={id} data-title={dataTitle} onClick={() => onClick(id)}>
          <img src={imgSrc} alt={alt} />
        </a>
      </li>
    );
  };
  
  export default Icon;
  