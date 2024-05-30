interface TagProps {
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <span className="tag">{children}</span>
  );
};

export default Tag;