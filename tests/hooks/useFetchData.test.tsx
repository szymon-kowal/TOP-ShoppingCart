import { renderHook, waitFor } from "@testing-library/react";
import useFetchData from "../../src/assets/hooks/useFetchData";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import { mockData } from "../mockData";
import { vi } from "vitest";

describe("useFetchData", () => {
  const mock = new AxiosMockAdapter(axios);
  const testUrl = "test-url";
  console.log = vi.fn();

  afterEach(() => {
    mock.reset();
  });

  it("fetches and sets data on successful API call", async () => {
    mock.onGet(testUrl).reply(200, mockData);

    const { result } = renderHook(() => useFetchData(testUrl));

    await waitFor(() => {
      expect(result.current.pageState).toBe("done");
    });

    expect(result.current.data).toEqual(mockData);
  });

  it("sets page state to error on API call failure", async () => {
    mock.onGet(testUrl).reply(500);

    const { result } = renderHook(() => useFetchData(testUrl));

    await waitFor(() => {
      expect(result.current.pageState).toBe("error");
    });

    expect(result.current.data).toEqual([]);
  });
});
