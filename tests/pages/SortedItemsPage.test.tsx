/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { mockData } from "../mockData";
import { vi } from "vitest";
import { render } from "@testing-library/react";
import DisplayItems from "../../src/assets/pages/SortedItemsPage";
import React from "react";
import { screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { useParams } from "react-router-dom";
// import useMyContext from "../components/funcUseMyContext";

vi.mock("../../src/assets/components/funcUseMyContext", () => ({
  default: () => ({
    fetchedData: mockData, // Ensure this is your mock data
    handleSetCartData: vi.fn(),
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe("<SortedItemPages />", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Resets mocks before each test
  });

  test("Returns correct component if there is no category in data", () => {
    (useParams as any).mockReturnValue({ category: "test-wrong" });

    render(<DisplayItems />);

    const regex = /There is no category like test-wrong/i;
    expect(screen.getByText(regex)).toBeInTheDocument();
  });

  test("Returns correct data if category is correct", () => {
    (useParams as any).mockReturnValue({ category: mockData[0].category });

    render(
      <MemoryRouter>
        <DisplayItems />
      </MemoryRouter>
    );

    expect(screen.getByText(mockData[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockData[1].title)).toBeInTheDocument();
    expect(screen.queryByText(mockData[2].title)).not.toBeInTheDocument();
  });

  test("Navigates to the correct URL for each item", () => {
    render(
      <MemoryRouter>
        <DisplayItems />
      </MemoryRouter>
    );

    mockData
      .filter((item) => item.category === mockData[0].category)
      .forEach((item) => {
        const nameAcc = `${item.title} ${item.title} ${item.price} $`;
        const link = screen.getByRole("link", { name: nameAcc });
        expect(link.getAttribute("href")).toBe(`/${item.category}/${item.id}`);
      });
  });

  test("It displays the details of each component correctyl", () => {
    (useParams as any).mockReturnValue({ category: mockData[0].category });

    render(
      <MemoryRouter>
        <DisplayItems />
      </MemoryRouter>
    );

    mockData
      .filter((item) => item.category === mockData[0].category)
      .forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();

        expect(screen.getByText(`${item.price} $`)).toBeInTheDocument();

        const imgObj = screen.getByRole("img", { name: item.title });
        expect(imgObj).toHaveAttribute("src", item.image);
        expect(imgObj).toHaveAttribute("alt", item.title);
      });
  });
});
