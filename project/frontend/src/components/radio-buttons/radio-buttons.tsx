import { GUITAR_TYPES, Cord } from '../../const';
import { useState } from 'react';

function RadioButtons(): JSX.Element {

  const [guitarState, setGuitarState] = useState(GUITAR_TYPES[0].value);

  const [cordState, setCordState] = useState(Cord.Four);

  return (
    <>
      <div className="input-radio edit-item__form-radio"><span>Тип товара</span>
        {GUITAR_TYPES.map((type) => (
          <>
            <input type="radio" id={type.value} name="item-type" value={type.value} onClick={() => setGuitarState(type.value)} checked={guitarState === type.value}/>
            <label htmlFor={type.value}>{type.title}</label>
          </>
        )
        )}
      </div>
      <div className="input-radio edit-item__form-radio"><span>Количество струн</span>
        {Object.values(Cord).map((cord) => (
          <>
            <input type="radio" id={`string-qty-${cord}`} name="string-qty" value={cord} onClick={() => setCordState(cord)} checked={cordState === cord} />
            <label htmlFor={`string-qty-${cord}`}>{cord}</label>
          </>
        )
        )}
      </div>
    </>
  );
}

export default RadioButtons;
