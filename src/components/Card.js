const Card = ({ image, title, category }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <span>{title}</span>
      <p>{category}</p>
    </div>
  );
};

export default Card;
