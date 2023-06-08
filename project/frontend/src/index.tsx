import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { products } from './mocks/products';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

/*const Setting = {
  PlacesCount: 150,
} as const;
*/

root.render(
  <React.StrictMode>
    <App
      products = {products}
    />
  </React.StrictMode>,
);
