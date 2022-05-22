import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QtyInput } from "../QtyInput";
describe("QtyInput", () => {
  const onIncPress = jest.fn();
  const onDecPress = jest.fn();
  let qty;
  let stockCount;
  beforeEach(() => {
    qty = 1;
    stockCount = 5;
  });
  const renderQtyInput = () => {
    render(
      <QtyInput
        onDecClick={onDecPress}
        onIncClick={onIncPress}
        qty={qty}
        stockCount={stockCount}
      />
    );
  };
  it("must call increment Function when increment button is pressed", async () => {
    renderQtyInput();
    const incButton = screen.getByTestId("qty__inc-button");
    await userEvent.click(incButton);
    expect(onIncPress).toHaveBeenCalledTimes(1);
  });
  it("must call increment Function when increment button is pressed", async () => {
    renderQtyInput();
    const decButton = screen.getByTestId("qty__dec-button");
    await userEvent.click(decButton);
    expect(onDecPress).toHaveBeenCalledTimes(1);
  });
  it("must disable both increment and decrement buttons if stockCount is zero", async () => {
    stockCount = 0;
    renderQtyInput();
    const incButton = screen.getByTestId("qty__inc-button");
    const decButton = screen.getByTestId("qty__dec-button");
    expect(decButton).toBeDisabled();
    expect(incButton).toBeDisabled();
  });
});
