import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import dayjs from 'dayjs';

type CardProps = {
  card: Product;
}

function ProductCard({card}: CardProps): JSX.Element {

  const {id, title, postDate, guitar, price, image} = card;

  return (
    <li className="catalog-item">
      <div className="catalog-item__data"><img src={image} srcSet={`${image}@2x.png 2x`} width="36" height="93" alt="Картинка гитары" />
        <div className="catalog-item__data-wrapper">
          <a className="link" href="./product.html"><p className="catalog-item__data-title">{guitar} {title}</p></a>
          <br/>
          <p className="catalog-item__data-date">Дата добавления {dayjs(postDate).format('DD.MM.YYYY')}</p>
          <p className="catalog-item__data-price">{price}</p>
        </div>
      </div>
      <div className="catalog-item__buttons"><Link className="button button--small button--black-border" to={`/edit/${id}`} aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
      </div>
    </li>
  );
}

export default ProductCard;
