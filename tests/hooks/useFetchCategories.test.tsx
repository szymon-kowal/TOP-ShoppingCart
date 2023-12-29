/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { mockData } from "../mockData";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { vi } from "vitest";
import useFetchCategories from "../../src/assets/hooks/useFetchCategories";
import { waitFor, renderHook } from "@testing-library/react";

describe("useFetchCategories hook", () => {
  const mockAx = new MockAdapter(axios);
  const testUrl: string = "test-url";

  afterEach(() => {
    mockAx.reset();
  });

  test("it fetches and sets data on succesfull api call", async () => {
    mockAx.onGet(testUrl).reply(200, mockData);

    const { result } = renderHook(() => useFetchCategories(testUrl));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });
  });

  test("handles errors from the API call", async () => {
    mockAx.onGet(testUrl).reply(500);

    console.log = vi.fn();

    const { result } = renderHook(() => useFetchCategories(testUrl));

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });
});
