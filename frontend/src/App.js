import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { checkToken } from "./actions";
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
} from "./Pages";
import { FullPageLoader, Header } from "./Components";
import domains from "./domains";
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
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path={domains.home} component={HomePage} exact />
          <Route path={domains.productDetail} component={ProductDetail} exact />
          <Route path={domains.cart} component={CartPage} exact />
          {user.isAuth && (
            <>
              <Route path={domains.shipping} component={ShippingAdress} exact />
              <Route path={domains.payment} component={PaymentMethod} exact />
              <Route
                path={domains.confirmOrder}
                component={ConfirmOrder}
                exact
              />
              <Route path={domains.order} component={OrderPage} exact />
              <Route path={domains.orders} component={OrdersPage} exact />
            </>
          )}

          {!user.isAuth && (
            <Route path={domains.auth} component={AuthPage} exact />
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
