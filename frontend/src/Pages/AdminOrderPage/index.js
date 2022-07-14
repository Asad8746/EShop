import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { OrderDetail } from "../../Components";
import { getAdminOrderDetail } from "../../actions";
import "./index.style.scss";

export function AdminOrderPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;
  useEffect(() => {
    dispatch(getAdminOrderDetail(id));
  }, [id, dispatch]);
  const { data, loading, error } = useSelector((store) => store.adminOrder);
  return <OrderDetail isAdmin order={data} error={error} loading={loading} />;
}
