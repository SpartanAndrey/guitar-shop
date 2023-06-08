import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type AdminRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function AdminRoute(props: AdminRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Admin ? children : <Navigate to={AppRoute.Main} />
  );
}

export default AdminRoute;
