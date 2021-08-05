import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Rating, FullPageLoader, QtyInput } from "../../Components";
import { getProduct, addItem } from "../../actions";
import "./index.style.scss";
export const ProductDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  const {
    data,
    loading,
    error: reducerError,
  } = useSelector((store) => store.product);
  const { loading: cartLoading } = useSelector((store) => store.cart);
  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [dispatch, params.id]);
  useEffect(() => {
    if (String(qty).match(/\D/g)) {
      setError("Please Enter Numeric Value");
    } else if (qty <= 0) {
      setError(`Please Enter Qty between 1 and ${data.stockCount}`);
    } else {
      setError("");
    }
  }, [qty, setError, data.stockCount]);
  const onQtyChange = (e) => {
    const { value } = e.target;
    if (value <= data.stockCount) {
      setQty(value);
    }
  };
  const onDecClick = () => {
    setQty((prev) => {
      const updatedPrev = Number(prev);
      if (updatedPrev - 1 > 0) {
        return updatedPrev - 1;
      } else {
        return prev;
      }
    });
  };
  const onIncClick = () => {
    setQty((prev) => {
      const updatedPrev = Number(prev);
      if (updatedPrev + 1 <= data.stockCount) {
        return updatedPrev + 1;
      } else {
        return prev;
      }
    });
  };
  const onSubmit = () => {
    if (data.stockCount > 0) {
      console.log("Qty", qty);
      dispatch(addItem(data._id, qty));
    }
  };
  const disabled = data.stockCount === 0 && error;
  return (
    <Container>
      <section className="detail__container">
        {loading ? (
          <FullPageLoader height={45} width={45} />
        ) : reducerError ? (
          <p>{reducerError}</p>
        ) : (
          <>
            <div className="detail__img-container">
              <Link to="/" className="detail__back-link">
                <i
                  className="fas fa-long-arrow-alt-left"
                  style={{ color: "var(--primary-color)" }}
                ></i>
              </Link>
              <img
                src={data.image}
                className="detail__img"
                alt={`${data.name} product`}
              />
            </div>
            <div className="detail__info-container">
              <h2 className="detail__product-name">{data.name}</h2>
              <Rating
                rating={data.rating}
                showTotalReview
                totalReviews={data.numReviews}
              />
              <p className="detail__product-price">Price ${data.price}</p>
              <p className="detail__product-description">{data.description}</p>
              <div className="detail__add-to-cart-container">
                <div className="detail__cart-info">
                  <span>price: </span>
                  <span>{data.price}</span>
                </div>
                <div className="detail__cart-info">
                  <span>status:</span>

                  <span>
                    {data.stockCount > 0 ? "in Stock" : "out of stock"}
                  </span>
                </div>
                <div className="detail__cart-info">
                  <QtyInput
                    qty={qty}
                    stockCount={data.stockCount}
                    onDecClick={onDecClick}
                    onIncClick={onIncClick}
                    onQtyChange={onQtyChange}
                  />
                </div>
                {error && (
                  <div className="detail__cart-info detail__error-container">
                    <p className="detail__error">{error}</p>
                  </div>
                )}
                <div className="detail__cart-info">
                  <button
                    className="detail__cart-btn"
                    disabled={disabled}
                    onClick={onSubmit}
                  >
                    {cartLoading ? (
                      <div>
                        <FullPageLoader height={18} width={18} color="#fff" />
                      </div>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </Container>
  );
};
