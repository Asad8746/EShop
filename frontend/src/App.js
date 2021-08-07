import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { checkToken } from "./actions";
import { ProductDetail, HomePage, CartPage, AuthPage } from "./Pages";
import { FullPageLoader, Header } from "./Components";
import domains from "./domains";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch(checkToken());
  }, []);
  if (user.loading) {
    return (
      <div className="initial__loader-container">
        <FullPageLoader height={70} width={70} />
      </div>
    );
  }
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path={domains.home} component={HomePage} exact />
          <Route path={domains.productDetail} component={ProductDetail} exact />
          <Route path={domains.cart} component={CartPage} exact />
          {!user.isAuth && (
            <Route path={domains.auth} component={AuthPage} exact />
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
