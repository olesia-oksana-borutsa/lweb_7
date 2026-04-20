import './InventoryCard.css';

const InventoryCard = ({ item, isFav, onToggleFav, onOpenDetails }) => {
  return (
    <div className="cup-card-v2">
      <div className="card-image-container" onClick={() => onOpenDetails(item)}>
        <img 
          src={`http://localhost:3000${item.photo_url}`} 
          alt={item.name} 
          className="card-img" 
        />
       <button 
  className="heart-button-svg"
  onClick={(e) => {
    e.stopPropagation();
    onToggleFav(item.id);
  }}
>
  <svg 
    width="28" 
    height="28" 
    viewBox="0 0 24 24" 
    fill={isFav ? "#f06292" : "rgba(255, 255, 255, 0.3)"} 
    stroke={isFav ? "#f06292" : "white"} 
    strokeWidth="2"
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="heart-svg"
  >
    
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
</button>
      </div>
      <div className="card-body">
        <h3 className="card-name">{item.name}</h3>
      </div>
    </div>
  );
};

export default InventoryCard;