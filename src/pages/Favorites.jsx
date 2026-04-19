import { useInventory } from '../store/InventoryContext';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import './Gallery.css'; // Використовуємо ті ж стилі грід-сітки

const Favorites = () => {
  const { items } = useInventory();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Фільтруємо список: залишаємо тільки ті чашки, чий ID є в списку улюблених
  const favoriteItems = items.filter(item => isFavorite(item.id));

  return (
    <div className="gallery-page">
      <div className="gallery-intro">
        <h1>Ваші улюблені чашки ❤️</h1>
        <p>Тут зібрані всі моделі, які припали вам до душі</p>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="empty-state">
          <p>Ви ще не додали жодної чашки до улюблених.</p>
          <p style={{fontSize: '3rem'}}>☕</p>
        </div>
      ) : (
        <div className="inventory-grid">
          {favoriteItems.map(item => (
            <InventoryCard 
              key={item.id}
              item={item}
              isFav={true} // Тут вони всі точно улюблені
              onToggleFav={toggleFavorite}
              onOpenDetails={(cup) => alert(`Деталі для ${cup.name}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};


export default Favorites;