import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, ProductList, Pagination } from "../../Components";
import { getProducts } from "../../actions";
import "./index.style.scss";
export const HomePage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products);
  const pagination = useSelector((store) => store.pagination);
  useEffect(() => {
    dispatch(getProducts(pagination.currentPage));
  }, [pagination.currentPage]);
  return (
    <Container>
      <>
        <h1 className="home__title">Lastest Products</h1>
        <ProductList data={data} error={error} loading={loading} />
        <Pagination />
      </>
    </Container>
  );
};
