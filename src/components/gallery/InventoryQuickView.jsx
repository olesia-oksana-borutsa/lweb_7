import './InventoryQuickView.css';

const InventoryQuickView = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="quickview-body">
          <div className="quickview-image">
            <img 
              src={`http://localhost:3000${item.photo_url}`} 
              alt={item.name} 
            />
          </div>
          
          <div className="quickview-info">
            <h2>{item.name}</h2>
            <div className="quickview-divider"></div>
            <p className="quickview-description">{item.description}</p>
            
            <div className="quickview-footer">
              <span className="quickview-tag">Ручна робота</span>
              <span className="quickview-tag">Кераміка</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryQuickView;