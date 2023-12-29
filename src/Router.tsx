import { createBrowserRouter } from "react-router-dom";
import { Root } from "./assets/pages/Root";
import DisplayItems from "./assets/pages/SortedItemsPage";
import DisplaySingleItem from "./assets/pages/SingleItemPage";
import ErrorPage from "./assets/components/displayError";
import HomePage from "./assets/pages/HomePage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      { index: true, element: <HomePage /> },
      { path: "/:category", element: <DisplayItems /> },
      { path: "/:category/:item", element: <DisplaySingleItem /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default Router;
