import "@testing-library/jest-dom";
import mockCartData from "../mockCartData";
import { vi } from "vitest";
import { render } from "@testing-library/react";
import DisplayCart from "../../src/assets/components/displayCart";
import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockHandleDisplayCart = vi.fn();
const mockRemoveCartItem = vi.fn();

describe("DisplayCart", () => {
  it("renders when isCartDisplayed is true", () => {
    render(
      <DisplayCart
        data={mockCartData}
        handleDisplayCart={mockHandleDisplayCart}
        isCartDisplayed={true}
        removeCartItem={mockRemoveCartItem}
      />
    );

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  it("does not render when isCartDisplayed is false", () => {
    render(
      <DisplayCart
        data={mockCartData}
        handleDisplayCart={mockHandleDisplayCart}
        isCartDisplayed={false}
        removeCartItem={mockRemoveCartItem}
      />
    );

    expect(screen.queryByText("Your Cart")).toBeNull();
  });

  it("displays correct number of cart items", () => {
    const { container } = render(
      <DisplayCart
        data={mockCartData}
        handleDisplayCart={mockHandleDisplayCart}
        isCartDisplayed={true}
        removeCartItem={mockRemoveCartItem}
      />
    );
    expect(container.getElementsByClassName("cart-item").length).toBe(
      mockCartData.length
    );
  });

  it("calls removeCartItem on remove button click", async () => {
    render(
      <DisplayCart
        data={mockCartData}
        isCartDisplayed={true}
        handleDisplayCart={mockHandleDisplayCart}
        removeCartItem={mockRemoveCartItem}
      />
    );
    const firstRemoveButton = screen.getAllByText("remove")[0];
    await userEvent.click(firstRemoveButton);
    expect(mockRemoveCartItem).toHaveBeenCalledWith(mockCartData[0].item.id);
  });

  it("calculates total price correctly", () => {
    render(
      <DisplayCart
        data={mockCartData}
        isCartDisplayed={true}
        handleDisplayCart={mockHandleDisplayCart}
        removeCartItem={mockRemoveCartItem}
      />
    );
    const totalPrice = mockCartData.reduce(
      (sum, item) => sum + parseFloat(item.item.price) * item.count,
      0
    );
    expect(
      screen.getByText(`Total price is : ${totalPrice} $`)
    ).toBeInTheDocument();
  });
});
