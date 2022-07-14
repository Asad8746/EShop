import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Rating } from "../Rating";
import domains from "../../domains";
import "./index.style.scss";

export const ProductCard = ({ product, showActions, moveForward }) => {
  const history = useHistory();
  const customClass = moveForward ? "link" : "";
  const onProductClick = () => {
    if (moveForward) {
      history.push(`/product/${product._id}`);
      return;
    }
  };
  const onDeleteClick = () => {
    history.push(`${domains.deleteProduct}/${product._id}`);
  };
  const onEditClick = () => {
    history.push(`${domains.productEdit}/${product._id}`);
  };
  return (
    <div
      className={`product-card product-card--${customClass}`}
      onClick={onProductClick}
    >
      <img
        src={`/api/image/${product.image}`}
        className="product-card__image"
        alt={`${product.name} product`}
      />
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">${product.price}</p>
      <Rating rating={product.rating} />
      {showActions && (
        <div className="product-card__actions">
          <button className="ui large red button" onClick={onDeleteClick}>
            Delete
          </button>
          <button className="ui large blue button" onClick={onEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

ProductCard.defaultProps = {
  product: {},
  showActions: false,
  moveForward: true,
};

ProductCard.propTypes = {
  showActions: PropTypes.bool.isRequired,
  moveForward: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }),
};
