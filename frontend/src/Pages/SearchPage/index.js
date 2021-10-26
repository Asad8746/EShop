import React, { useEffect, useReducer, useRef } from "react";
import { useParams, useLocation, Redirect } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Container, ProductList, Pagination } from "../../Components";
import domains from "../../domains";
import { getSearchProducts } from "../../actions";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const search = new URLSearchParams(useLocation()?.search);
  const keyword = search.get("q");
  const { loading, data, error } = useSelector((store) => store.search);
  const pagination = useSelector((store) => store.pagination);
  useEffect(() => {
    if (keyword || pagination.currentPage) {
      dispatch(getSearchProducts(keyword, pagination.currentPage));
    }
  }, [keyword, pagination.currentPage]);
  if (!keyword) return <Redirect to={domains.home} />;

  return (
    <Container>
      <>
        <h1 className="home__title">Searched Products</h1>

        <ProductList data={data} loading={loading} error={error} />
        <Pagination />
      </>
    </Container>
  );
};
