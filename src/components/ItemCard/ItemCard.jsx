import "./ItemCard.css"; // import the ItemCard component styles

// ItemCard component
function ItemCard({ item, onCardClick }) {
  console.log(item);
  const handleCardClick = () => {
    onCardClick(item);
  };
  // Return the JSX code for the ItemCard component
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || ""}
        alt={item.name}
      />
    </li>
  );
}
// Export the ItemCard component
export default ItemCard;
