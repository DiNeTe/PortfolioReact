interface TagProps {
  children: React.ReactNode;
  className?: string; // Prop optionnelle pour className
}

const Tag: React.FC<TagProps> = ({ children, className }) => {
  return (
    <span className={`tag ${className || ''}`.trim()}>{children}</span>
  );
};

export default Tag;