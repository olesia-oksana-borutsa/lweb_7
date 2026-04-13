import { Link } from 'react-router-dom';
import './InventoryTable.css';

const InventoryTable = ({ items, onDelete }) => {
  return (
    <table className="inventory-table">
      <thead>
        <tr>
          <th>Фото</th>
          <th>Назва чашки</th>
          <th>Опис</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>
              <img 
                src={`http://localhost:3000${item.photo_url}`} 
                alt={item.name} 
                className="cup-thumbnail"
              />
            </td>
            <td className="cup-name">{item.name}</td>
            <td className="cup-description">{item.description}</td>
            <td>
              <div className="actions-cell">
                
                <Link 
                  to={`/admin/details/${item.id}`} 
                  className="btn-action btn-details"
                >
                  Деталі
                </Link>

                <Link 
                  to={`/admin/edit/${item.id}`} 
                  className="btn-action btn-edit"
                >
                  Редагувати
                </Link>
                
                <button 
                  onClick={() => onDelete(item.id)} 
                  className="btn-action btn-delete"
                >
                  Видалити
                </button>

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;