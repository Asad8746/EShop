import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import domains from "./domains";
import { checkToken } from "./actions";
import { PrivateRoute, FullPageLoader, Header } from "./Components";
import {
  ProductDetail,
  HomePage,
  CartPage,
  AuthPage,
  ShippingAdress,
  PaymentMethod,
  ConfirmOrder,
  OrderPage,
  OrdersPage,
  AdminPage,
  EditProductPage,
  UserDeleteConfirmation,
  CreateProductPage,
  DeleteProductConfirmation,
  SearchPage,
  EditProfilePage,
  NotFound,
  AdminOrderPage,
} from "./Pages";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch(checkToken());
  }, []);
  if (user.loading) {
    return <FullPageLoader />;
  }
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path={domains.home} component={HomePage} exact />
        <Route path={domains.searchPage} component={SearchPage} />
        <Route path={domains.productDetail} component={ProductDetail} exact />
        <Route path={domains.cart} component={CartPage} exact />
        <PrivateRoute path={domains.shipping} exact>
          <ShippingAdress />
        </PrivateRoute>
        <PrivateRoute path={domains.confirmOrder} exact>
          <ConfirmOrder />
        </PrivateRoute>
        <PrivateRoute path={domains.payment} exact>
          <PaymentMethod />
        </PrivateRoute>
        <PrivateRoute path={domains.order} exact>
          <OrderPage />
        </PrivateRoute>
        <PrivateRoute path={domains.orders} exact>
          <OrdersPage />
        </PrivateRoute>
        <PrivateRoute
          path={`${domains.deleteUser}/:id`}
          exact
          privateAdminRoute
        >
          <UserDeleteConfirmation />
        </PrivateRoute>
        <PrivateRoute
          path={`${domains.deleteProduct}/:id`}
          exact
          privateAdminRoute
        >
          <DeleteProductConfirmation />
        </PrivateRoute>
        <PrivateRoute path={domains.createProduct} exact privateAdminRoute>
          <CreateProductPage />
        </PrivateRoute>
        <PrivateRoute path={domains.admin} exact privateAdminRoute>
          <AdminPage />
        </PrivateRoute>
        <PrivateRoute
          path={`${domains.productEdit}/:id`}
          exact
          privateAdminRoute
        >
          <EditProductPage />
        </PrivateRoute>
        <PrivateRoute path={domains.editProfile} exact>
          <EditProfilePage />
        </PrivateRoute>
        <PrivateRoute path={domains.adminOrder} exact>
          <AdminOrderPage />
        </PrivateRoute>
        {!user.isAuth && (
          <Route path={domains.auth} component={AuthPage} exact />
        )}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
