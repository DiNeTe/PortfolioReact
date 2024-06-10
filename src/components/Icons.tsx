import useTouchableClick from '../hooks/useTouchableClick';

type IconProps = {
  dataTitle: string;
  imgSrc: string;
  alt: string;
  id: string;
  onClick: (id: string) => void;
};

const Icon: React.FC<IconProps> = ({ dataTitle, imgSrc, alt, id, onClick }) => {
  const { handleClick, handleTouchStart, cancelTouch } = useTouchableClick(() => onClick(id));

  return (
    <li>
      <a
        href="#"
        id={id}
        data-title={dataTitle}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={cancelTouch}
        className="icon-link"
      >
        <img src={imgSrc} alt={alt} />
      </a>
    </li>
  );
};

export default Icon;