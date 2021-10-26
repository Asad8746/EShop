import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { Container } from "../Container";
import { Input } from "../Input";
import { Message } from "../Message";

import useFormValidation from "../../hooks/useFormValidation";
import { emptyValidator, numberValidator } from "../../validation";
import "./index.style.scss";
export const ProductForm = ({
  title,
  initialValues,
  imageRequired,
  error,
  onSubmit,
  onMount,
}) => {
  const history = useHistory();
  const productName = useFormValidation(
    initialValues.productName,
    emptyValidator,
    "Product name is required"
  );
  const [image, setImage] = useState(null);
  const description = useFormValidation(
    initialValues.description,
    emptyValidator,
    "description is required"
  );
  const brand = useFormValidation(
    initialValues.brand,
    emptyValidator,
    "brand is required"
  );
  const category = useFormValidation(
    initialValues.category,
    emptyValidator,
    "category is required"
  );
  const price = useFormValidation(
    initialValues.price,
    numberValidator,
    "price is required"
  );
  const stockCount = useFormValidation(
    initialValues.stockCount,
    numberValidator,
    "Stock Count is required "
  );
  const btnDisabled =
    (imageRequired && !image) ||
    !productName.isValid ||
    !description.isValid ||
    !brand.isValid ||
    !category.isValid ||
    !price.isValid ||
    !stockCount.isValid ||
    productName.error ||
    description.error ||
    brand.error ||
    category.error ||
    price.error ||
    stockCount.error;
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      productName: productName.value,
      image,
      description: description.value,
      brand: brand.value,
      category: category.value,
      price: price.value,
      stockCount: stockCount.value,
    });
  };
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    onMount();
  }, []);
  return (
    <Container>
      <>
        <div className="product-form__header">
          <i
            className="fas fa-long-arrow-alt-left"
            onClick={() => {
              history.goBack();
            }}
          ></i>
          <h2 className="product-form__title">{title}</h2>
        </div>
        <div className="product-form__container">
          <form onSubmit={onFormSubmit}>
            <Input
              fieldName="productName"
              label="Product Name"
              placeholder="Product Name"
              required
              value={productName.value}
              onChange={productName.setValue}
              onBlur={productName.setBlur}
              error={productName.error}
              blur={productName.blur}
              id="product_name"
            />
            <Input
              fieldName="description"
              label="Description"
              placeholder="Description"
              value={description.value}
              onChange={description.setValue}
              onBlur={description.setBlur}
              error={description.error}
              blur={description.blur}
              id="product_description"
              type="textarea"
            />
            <div className="input">
              <input
                type="file"
                name="image"
                onChange={onImageChange}
                accept="image/*"
              />
            </div>
            <Input
              fieldName="brand"
              label="Brand"
              placeholder="Brand"
              value={brand.value}
              onChange={brand.setValue}
              onBlur={brand.setBlur}
              error={brand.error}
              blur={brand.blur}
              id="brand"
            />
            <Input
              fieldName="cateogry"
              label="Category"
              placeholder="Category"
              value={category.value}
              onChange={category.setValue}
              onBlur={category.setBlur}
              error={category.error}
              blur={category.blur}
              id="category"
            />
            <Input
              fieldName="price"
              label="price"
              placeholder="Price"
              value={price.value}
              onChange={price.setValue}
              onBlur={price.setBlur}
              error={price.error}
              blur={price.blur}
              id="price"
            />
            <Input
              fieldName="stockCount"
              label="Stock Count"
              placeholder="Stock Count"
              value={stockCount.value}
              onChange={stockCount.setValue}
              onBlur={stockCount.setBlur}
              error={stockCount.error}
              blur={stockCount.blur}
              id="stock_count"
            />
            {error && (
              <div className="error-container">
                <Message message={error} variant="error" />
              </div>
            )}
            <div className="product-form__actions">
              <button className="btn--primary" disabled={btnDisabled && false}>
                Save
              </button>
            </div>
          </form>
        </div>
      </>
    </Container>
  );
};

ProductForm.defaultProps = {
  onMount: () => {},
  onSubmit: () => {},
  error: "",
  imageRequired: true,
  initialValues: {
    productName: "",
    description: "",
    brand: "",
    category: "",
    price: 1,
    stockCount: 1,
  },
};

ProductForm.propTypes = {
  error: PropTypes.string.isRequired,
  imageRequired: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stockCount: PropTypes.number.isRequired,
  }),
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
};
