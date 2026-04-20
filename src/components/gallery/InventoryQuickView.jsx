import './InventoryQuickView.css';

const InventoryQuickView = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="quickview-overlay">
      <div className="quickview-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="quickview-body">
          <h2>{item.name}</h2>
          <p>Завантаження деталей...</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryQuickView;