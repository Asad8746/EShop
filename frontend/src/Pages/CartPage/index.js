import { useHistory } from "react-router-dom";
import { Container, CartItem } from "../../Components";
import { useSelector } from "react-redux";
import "./index.style.scss";
import domains from "../../domains";
export const CartPage = () => {
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  return (
    <Container>
      <div className="cart">
        <div className="cart__items">
          {cart.items.length === 0 ? (
            <p className="cart__empty-message">Cart is Empty</p>
          ) : (
            <>
              <h3 className="cart__items-header">Product</h3>
              <h3 className="cart__items-header">Price</h3>
              <h3 className="cart__items-header">Qty</h3>
              <h3 className="cart__items-header">Total</h3>
              {cart.items.map((item, idx) => (
                <CartItem product={item} key={item.id} index={idx} />
              ))}
            </>
          )}
        </div>
        <div className="cart__checkout-container">
          <div className="cart__total-info">
            <span className="cart__total-info-heading">
              <p className="cart__total-info-heading--primary">Cart Total</p>
              <p className="cart__total-info-heading--secondary">
                $
                {cart.items
                  .reduce((acc, item) => {
                    return acc + item.price * item.qty;
                  }, 0)
                  .toFixed(2)}
              </p>
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                padding: "1rem",
              }}
            >
              <button
                className="btn--primary"
                onClick={() => {
                  if (user.isAuth) {
                    if (cart.items.length !== 0) {
                      history.push(domains.shipping);
                    }
                    return;
                  }
                  history.push(`${domains.auth}?redirect=cart`);
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
