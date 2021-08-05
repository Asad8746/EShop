import { Header } from "./Components";
import { ProductDetail, HomePage, CartPage } from "./Pages";
// import HomePage from "./Pages/HomePage";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import domains from "./domains";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path={domains.home} component={HomePage} exact />
          <Route path={domains.productDetail} component={ProductDetail} exact />
          <Route path={domains.cart} component={CartPage} exact />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
