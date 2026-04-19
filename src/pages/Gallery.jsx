import { useEffect } from 'react';
import { useInventory } from '../store/InventoryContext';
import { useFavorites } from '../hooks/useFavorites';
import { inventoryApi } from '../services/inventoryApi';
import InventoryCard from '../components/gallery/InventoryCard';
import './Gallery.css';

const Gallery = () => {
  const { items, setItems, loading, setLoading } = useInventory();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await inventoryApi.getAll();
        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setItems, setLoading]);

  return (
    <div className="gallery-page">
      <div className="gallery-intro">
        <h1>Колекція кераміки</h1>
      </div>

      {loading ? (
        <div className="loader">Завантаження...</div>
      ) : (
        <div className="inventory-flex">
          {items.map(item => (
            <InventoryCard 
              key={item.id}
              item={item}
              isFav={isFavorite(item.id)}
              onToggleFav={toggleFavorite}
              onOpenDetails={(cup) => console.log(cup)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;