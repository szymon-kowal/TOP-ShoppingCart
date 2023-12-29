import { describe, expect } from "vitest";
import { render } from "@testing-library/react";
import ErrorPage from "../../src/assets/components/displayError";
import React from "react";

describe("displayError", () => {
  it("renders without crashing", () => {
    render(<ErrorPage />);

    const errorElement = document.querySelector('[data-testid="error"]');

    expect(errorElement).not.toBeNull();
    expect(errorElement!.textContent).toBe("Error");
  });
});
