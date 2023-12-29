import LoadingPage from "../../src/assets/pages/LoadingPage";
import { render } from "@testing-library/react";
import React from "react";

describe("LoadingPage test", () => {
  test("it renders loading circle", () => {
    render(<LoadingPage />);
    const spinner = document.querySelector(".loading-spinner");

    expect(spinner).not.toBeNull();
  });
});
