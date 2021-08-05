import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, ProductCard, FullPageLoader } from "../../Components";
import { getProducts } from "../../actions";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <Container>
      <main>
        <h1>Lastest Products</h1>

        {loading ? (
          <FullPageLoader />
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item._id}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </Container>
  );
};
