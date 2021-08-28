import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkEmpty } from "../../utils";
import { saveAddressAction } from "../../actions";
import { Container, Steps, Input } from "../../Components";
import { useFormValidation } from "../../hooks/useFormValidation";
import { emptyValidator } from "../../validation";
import domains from "../../domains";
import "./index.style.scss";
export const ShippingAdress = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const addressState = useSelector((store) => store.cart.address);
  const address = useFormValidation(
    checkEmpty(addressState, "address", ""),
    emptyValidator,
    "Address is required"
  );
  const city = useFormValidation(
    checkEmpty(addressState, "city", ""),
    emptyValidator,
    "City is required"
  );
  const postalCode = useFormValidation(
    checkEmpty(addressState, "postalCode", ""),
    emptyValidator,
    "Postal Code  is required"
  );
  const country = useFormValidation(
    checkEmpty(addressState, "country", ""),
    emptyValidator,
    "Postal Code  is required"
  );
  const isValid =
    address.isValid || city.isValid || postalCode.isValid || country.isValid;
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      dispatch(
        saveAddressAction({
          address: address.value,
          city: city.value,
          postalCode: postalCode.value,
          country: country.value,
        })
      );
      history.push(domains.payment);
    }
  };
  return (
    <Container>
      <>
        <Steps activeStep={1} />
        <div className="checkout__container">
          <h1 className="checkout__title">Shipping Information</h1>
          <form onSubmit={onFormSubmit}>
            <Input
              label="Address"
              value={address.value}
              blur={address.blur}
              error={address.error}
              fieldName="address"
              required
              onBlur={() => address.setBlur(true)}
              onChange={(e) => address.setValue(e.target.value)}
              type="text"
              placeholder="Address"
            />
            <Input
              label="City"
              value={city.value}
              blur={city.blur}
              error={city.error}
              fieldName="city"
              required
              onBlur={() => city.setBlur(true)}
              onChange={(e) => city.setValue(e.target.value)}
              type="text"
              placeholder="City"
            />
            <Input
              label="Postal Code"
              value={postalCode.value}
              blur={postalCode.blur}
              error={postalCode.error}
              fieldName="postalCode"
              required
              onBlur={() => postalCode.setBlur(true)}
              onChange={(e) => postalCode.setValue(e.target.value)}
              type="text"
              placeholder="postal Code"
            />
            <Input
              label="Country"
              value={country.value}
              blur={country.blur}
              error={country.error}
              fieldName="country"
              required
              onBlur={() => country.setBlur(true)}
              onChange={(e) => country.setValue(e.target.value)}
              type="text"
              placeholder="Country"
            />
            <div className="btn__center-container">
              <button
                className="btn--primary shipping__btn"
                disabled={!isValid}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </>
    </Container>
  );
};
