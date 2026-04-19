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
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
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