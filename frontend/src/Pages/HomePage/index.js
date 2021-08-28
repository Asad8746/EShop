import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, ProductCard, FullPageLoader } from "../../Components";
import { getProducts } from "../../actions";
import "./index.style.scss";
export const HomePage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <Container>
      <>
        <h1 className="home__title">Lastest Products</h1>
        <div className="products-container">
          {loading ? (
            <FullPageLoader />
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            data.map((item) => <ProductCard key={item._id} product={item} />)
          )}
        </div>
      </>
    </Container>
  );
};
