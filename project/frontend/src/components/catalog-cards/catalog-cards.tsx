import { Product } from '../../types/product';
import ProductCard from '../product-card/product-card';

type CatalogCardsProps = {
 cards: Product[];
}

function CatalogCards({cards}: CatalogCardsProps): JSX.Element {
  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {cards.map((card: Product) => (
          <ProductCard
            key={card.id}
            card={card}
          />)
        )}
      </ul>
    </div>
  );
}

export default CatalogCards;
