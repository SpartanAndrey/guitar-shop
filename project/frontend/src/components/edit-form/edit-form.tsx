import { Product } from '../../types/product';
import { useState, ChangeEvent, FormEvent } from 'react';
import RadioButtons from '../radio-buttons/radio-buttons';
import dayjs from 'dayjs';

type EditFormProps = {
    product: Product;
}


function EditForm({product}: EditFormProps): JSX.Element {


  const [formData, setFormData] = useState({
    titleField: product.title,
    dateField: dayjs(product.postDate).format('DD.MM.YYYY'),
    descriptionField: product.description,
    skuField: product.sku,
    priceField: product.price,
  });

  const fieldChangeHandle = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const submitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // тут будет диспатч
  };

  return (
    <form className="edit-item__form" action="#" method="get" onSubmit={submitHandle}>
      <div className="edit-item__form-left">
        <div className="edit-item-image edit-item__form-image">
          <div className="edit-item-image__image-wrap"><img className="edit-item-image__image" src={`img/content/add-item-${product.id}.png`} srcSet={`img/content/add-item-${product.id}@2x.png 2x`} width="133" height="332" alt="СURT Z30 Plus" />
          </div>
          <div className="edit-item-image__btn-wrap">
            <button className="button button--small button--black-border edit-item-image__btn">Заменить
            </button>
            <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
          </div>
        </div>
        <RadioButtons />
      </div>
      <div className="edit-item__form-right">
        <div className="custom-input edit-item__form-input">
          <label><span>Дата добавления товара</span>
            <input onChange={fieldChangeHandle} type="text" name="date" value={formData.dateField} placeholder="Дата в формате 00.00.0000" readOnly />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input edit-item__form-input">
          <label><span>Наименование товара</span>
            <input onChange={fieldChangeHandle} type="text" name="title" value={formData.titleField} placeholder="Наименование" />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input edit-item__form-input edit-item__form-input--price">
          <label><span>Цена товара</span>
            <input onChange={fieldChangeHandle} type="text" name="price" value={formData.priceField} placeholder="Цена в формате 00 000" />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input edit-item__form-input">
          <label><span>Артикул товара</span>
            <input onChange={fieldChangeHandle} type="text" name="sku" value={formData.skuField} placeholder="Артикул товара" />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-textarea edit-item__form-textarea">
          <label><span>Описание товара</span>
            <textarea onChange={fieldChangeHandle} name="description" value={formData.descriptionField} placeholder="">
            </textarea>
          </label>
          <p>Заполните поле</p>
        </div>
      </div>
      <div className="edit-item__form-buttons-wrap">
        <button className="button button--small edit-item__form-button" type="submit">Сохранить изменения</button>
        <button className="button button--small edit-item__form-button" type="button">Вернуться к списку товаров</button>
      </div>
    </form>
  );
}

export default EditForm;
