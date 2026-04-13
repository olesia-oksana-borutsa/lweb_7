import './InventoryDetails.css';

const InventoryDetails = ({ item }) => {
  if (!item) return <p className="empty-details">Інформація відсутня... </p>;

  return (
    <div className="details-wrapper">
      <h2 className="details-title">{item.name}</h2>
      
      {item.photo_url && (
        <img 
          src={`http://localhost:3000${item.photo_url}`} 
          alt={item.name} 
          className="details-image"
        />
      )}
      
      <div className="details-info-box">
        <h4>Опис чашки</h4>
        <p className="details-description">{item.description}</p>
      </div>
    </div>
  );
};

export default InventoryDetails;