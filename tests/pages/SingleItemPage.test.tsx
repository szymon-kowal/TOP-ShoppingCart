/* eslint-disable @typescript-eslint/no-explicit-any */

import SingleItemPage from "../../src/assets/pages/SingleItemPage.tsx";
import useMyContext from "../../src/assets/components/funcUseMyContext.tsx";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { mockData } from "../mockData.ts";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

vi.mock("../../src/assets/components/funcUseMyContext", () => ({
  default: vi.fn(() => ({
    fetchedData: mockData,
    handleSetCartData: vi.fn(),
  })),
}));

describe("<SingleItemPage />", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Resets mocks before each test
  });

  test("it displays correct data[0] on page", () => {
    const mockId: number = 1;
    (useParams as any).mockReturnValue({ item: mockId.toString() });

    (useMyContext as any).mockReturnValue({
      fetchedData: mockData,
      handleSetCartData: vi.fn(),
    });

    render(<SingleItemPage />);

    expect(screen.getByText(mockData[0].description)).toBeInTheDocument();
  });
  test("it displays correct data[1] on page", () => {
    const mockId: number = 2;
    (useParams as any).mockReturnValue({ item: mockId.toString() });

    (useMyContext as any).mockReturnValue({
      fetchedData: mockData,
      handleSetCartData: vi.fn(),
    });

    render(<SingleItemPage />);

    expect(screen.getByText(mockData[1].description)).toBeInTheDocument();
  });

  test("correctly increments state", async () => {
    render(<SingleItemPage />);

    const incrementBtn = screen.getByRole("button", { name: "+" });

    await userEvent.click(incrementBtn);

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(2);
  });

  test("correctly decrements state", async () => {
    render(<SingleItemPage />);

    const decrementBtn = screen.getByRole("button", { name: "-" });

    await userEvent.click(decrementBtn);

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(0);

    await userEvent.click(decrementBtn);

    expect(input).toHaveValue(0);
  });

  test("user can input value to input field", async () => {
    render(<SingleItemPage />);

    const input = screen.getByRole("spinbutton");

    expect(input).toHaveValue(1);

    await userEvent.clear(input);
    await userEvent.type(input, "3");

    expect(input).toHaveValue(3);
  });
});

// case 2
