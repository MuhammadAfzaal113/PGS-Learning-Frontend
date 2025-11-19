const Avatar = ({ src, name }) => {
  const fallback =
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ddd&color=555&size=128`;

  return (
    <img
      src={src || fallback}
      alt={name}
      className="w-8 h-8 rounded-full object-cover"
    />
  );
};

export default Avatar;
