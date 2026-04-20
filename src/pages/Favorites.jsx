import { useInventory } from '../store/InventoryContext';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import './Gallery.css'; 

const Favorites = () => {
  const { items } = useInventory();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const favoriteItems = items.filter(item => favorites.includes(item.id));

  return (
    <div className="gallery-page">
      <header className="gallery-intro">
        <h1>Ваші улюблені чашки </h1>
        <p>Тут зібрані всі моделі, які припали вам до душі</p>
      </header>

      {favoriteItems.length === 0 ? (
        <p className="empty-msg">Ви ще нічого не додали до обраного.</p>
      ) : (
        <div className="inventory-flex">
          {favoriteItems.map(item => (
            <InventoryCard 
              key={item.id}
              item={item}
              isFav={true}
              onToggleFav={toggleFavorite}
              onOpenDetails={() => {}} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;