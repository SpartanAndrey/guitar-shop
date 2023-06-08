import {Route, BrowserRouter, Routes} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import AddProductPage from '../../pages/add-product-page/add-product-page';
import EditProductPage from '../../pages/edit-product-page/edit-product-page';
import ProductListPage from '../../pages/product-list-page/product-list-page';
import ProductPage from '../../pages/product-page/product-page';
import RegistrationPage from '../../pages/registration-page/registration-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import AdminRoute from '../admin-route/admin-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Product } from '../../types/product';

type AppProps = {
  products: Product[];
}

function App({products}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Register}
          element={<RegistrationPage />}
        />
        <Route
          path={AppRoute.Add}
          element={
            <AdminRoute authorizationStatus={AuthorizationStatus.Admin}>
              <AddProductPage />
            </AdminRoute>
          }
        />
        <Route
          path={AppRoute.Catalog}
          element={
            <AdminRoute authorizationStatus={AuthorizationStatus.Admin}>
              <ProductListPage
                products = {products}
              />
            </AdminRoute>
          }
        />
        <Route
          path={AppRoute.Edit}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <EditProductPage
                products = {products}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Product}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <ProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
