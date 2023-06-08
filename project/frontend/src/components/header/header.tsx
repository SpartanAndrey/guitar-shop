import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper"><Link className="header__logo logo" to={AppRoute.Main}><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/></Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><a className="link main-nav__link" href="#todo">Каталог</a>
              </li>
              <li className="main-nav__item"><a className="link main-nav__link" href="#todo">Где купить?</a>
              </li>
              <li className="main-nav__item"><a className="link main-nav__link" href="#todo">О компании</a>
              </li>
            </ul>
          </nav>
          <div className="header__container"><span className="header__user-name">Имя</span>
            <Link className="header__link" to={AppRoute.Main} aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg><span className="header__link-text">Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
