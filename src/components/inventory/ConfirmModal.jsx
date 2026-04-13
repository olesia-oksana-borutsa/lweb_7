import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
        
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>Цю дію не можна буде скасувати</p>
        
        <div className="modal-actions">
          <button className="btn-modal btn-confirm" onClick={onConfirm}>
            Так, видалити
          </button>
          <button className="btn-modal btn-cancel" onClick={onClose}>
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;