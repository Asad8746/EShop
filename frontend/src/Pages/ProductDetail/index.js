import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Rating,
  FullPageLoader,
  CustomLoader,
  QtyInput,
  ReviewList,
  FullPageError,
} from "../../Components";
import { ReactComponent } from "../../images/404.svg";
import { getProduct, addItem, resetProductAction } from "../../actions";
import { url } from "../../Api";
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
    return () => {
      dispatch(resetProductAction());
    };
  }, [dispatch, params.id]);
  useEffect(() => {
    if (String(qty).match(/\D/g)) {
      setError("Please Enter Numeric Value");
    } else if (qty <= 0 || qty > data.stockCount) {
      setError(`Please Enter Qty between 1 and ${data.stockCount}`);
    } else {
      setError("");
    }
  }, [qty, setError, data.stockCount]);
  const onQtyChange = (e) => {
    const { value } = e.target;
    setQty(value);
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
      dispatch(addItem(data._id, qty));
    }
  };
  const renderNotFoundSvg = (className) => {
    return <ReactComponent className={className} />;
  };
  const disabled = data.stockCount === 0 || error;
  if (loading) {
    return <FullPageLoader />;
  }
  return (
    <Container>
      <section className="detail__container">
        {reducerError ? (
          <FullPageError error={reducerError} render={renderNotFoundSvg} />
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
                data-testid="product-img"
                src={`${url}/image/${data.image}`}
                className="detail__img"
                alt={`${data.name} product`}
              />
            </div>
            <div className="detail__info-container">
              <h2 className="detail__product-name" data-testid="product-title">
                {data.name}
              </h2>
              <Rating
                rating={data.rating}
                showTotalReview
                totalReviews={data.numReviews}
              />
              <p className="detail__product-price" data-testid="product-price">
                Price ${data.price}
              </p>
              <p
                className="detail__product-description"
                data-testid="product-description"
              >
                {data.description}
              </p>
              <div className="detail__add-to-cart-container">
                <div className="detail__cart-info">
                  <span>status:</span>
                  <span data-testid="product-status">
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
                    <p className="detail__error" data-testid="detail-error">
                      {error}
                    </p>
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
                        <CustomLoader height={18} width={18} color="#fff" />
                      </div>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
            <ReviewList />
          </>
        )}
      </section>
    </Container>
  );
};
