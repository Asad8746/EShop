import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Rating } from "../Rating";
import { url } from "../../Api";
import "./index.style.scss";

export const ProductCard = ({ product }) => {
  const history = useHistory();
  const onProductClick = () => {
    history.push(`/product/${product._id}`);
  };
  return (
    <div className="product-card" onClick={onProductClick}>
      <img
        src={`${url}/image/${product.image}`}
        className="product-card__image"
        alt={`${product.name} product`}
      />
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">${product.price}</p>
      <Rating rating={product.rating} />
    </div>
  );
};

ProductCard.defaultProps = {
  product: {},
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
  }),
};
