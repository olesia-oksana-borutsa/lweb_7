import './InventoryQuickView.css';

const InventoryQuickView = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="quickview-body">
          <div className="quickview-image-box">
            <img 
              src={`http://localhost:3000${item.photo_url}`} 
              alt={item.name} 
            />
          </div>
          
          <div className="quickview-info-box">
            <h2 className="qv-title">{item.name}</h2>
            <div className="qv-line"></div>
            <p className="qv-description">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryQuickView;