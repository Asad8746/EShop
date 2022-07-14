import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrder, resetOrderAction } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { OrderDetail } from "../../Components";
import "./index.style.scss";
export const OrderPage = () => {
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((store) => store.order);
  useEffect(() => {
    dispatch(getOrder(id));
    return () => {
      dispatch(resetOrderAction());
    };
  }, [id, dispatch]);
  return <OrderDetail order={data} error={error} loading={loading} />;
};
