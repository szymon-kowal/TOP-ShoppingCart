import React, { useEffect, useState } from "react";
import useFetchCategories from "../hooks/useFetchCategories";
import useFetchData from "../hooks/useFetchData";
import { Link, Outlet } from "react-router-dom";
import type { Item } from "../components/interfaces";
import LoadingPage from "./LoadingPage";
import DisplayCart from "../components/displayCart";
import ButtonCart from "../components/buttonCart";

export interface ContextType {
  fetchedData: Item[];
  handleSetCartData: (newData: Item, amount: number) => void;
}

export interface CartDataProps {
  item: Item;
  count: number;
}

// TODO - SetCartData needs to be displayed with amount;

export const Root: React.FC = () => {
  const { data: categories } = useFetchCategories(
    "https://fakestoreapi.com/products/categories"
  );

  const { data: fetchedData, pageState } = useFetchData(
    "https://fakestoreapi.com/products"
  );

  const isLoading = pageState === "loading";

  const [showLoading, setShowLoading] = useState(isLoading); // - page loading

  const [cartData, setCartData] = useState<CartDataProps[]>([]);

  const [isCartDisplayed, setIsCartDisplayed] = useState<boolean>(true); // - modal

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
      return;
    } else {
      const timeoutId = setTimeout(() => {
        setShowLoading(false);
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isLoading]);

  // Handle set data

  function handleSetCartData(newData: Item, amount: number): void {
    if (amount <= 0) return;

    setCartData((oldData) => {
      const indexItem = oldData.findIndex(
        (dbItem) => dbItem.item.id === newData.id
      );

      let updatedData: CartDataProps[];

      if (indexItem !== -1) {
        updatedData = [...oldData];
        updatedData[indexItem].count = amount;
      } else {
        const newEntry: CartDataProps = { item: newData, count: amount };
        updatedData = [...oldData, newEntry];
      }
      return updatedData;
    });
  }

  // Displaying visibility of cart

  function handleDisplayCart(): void {
    setIsCartDisplayed((oldState) => !oldState);
  }

  function removeCartItem(itemID: string): void {
    setCartData((oldState) =>
      oldState.filter((item) => item.item.id !== itemID)
    );
  }

  return (
    <div className="App">
      <div className="header">
        <>
          <Link to={"/"}>
            <div className="Anything">ANYTHING</div>
          </Link>
        </>

        <div className="categories">
          {categories.map((cat) => (
            <Link to={cat} key={cat} className="category">
              {cat}
            </Link>
          ))}
        </div>
        <ButtonCart setIsCartDisplayed={setIsCartDisplayed} />
      </div>

      <div className="main">
        {showLoading ? (
          <LoadingPage />
        ) : (
          <Outlet
            context={
              {
                fetchedData,
                handleSetCartData,
              } satisfies ContextType
            }
          ></Outlet>
        )}
      </div>
      <DisplayCart
        data={cartData}
        handleDisplayCart={handleDisplayCart}
        isCartDisplayed={isCartDisplayed}
        removeCartItem={removeCartItem}
      />
      <div className="footer">footer</div>
    </div>
  );
};
