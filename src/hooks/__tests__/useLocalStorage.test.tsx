import useLocalStorage from "../useLocalStorage";
import { renderHook, act } from "@testing-library/react-hooks";

describe("useLocalStorage", () => {
  it("returns the initialState", () => {
    const initialState = "value";
    const { result } = renderHook(() =>
      useLocalStorage("mystorage", initialState)
    );
    expect(result.current.storedValue).toEqual(initialState);
  });

  it("removes value from localstorage", () => {
    const key = "mystorage";
    const initialState = "value";

    const { result } = renderHook(() => useLocalStorage(key, initialState));

    act(() => {
      result.current.removeValue();
    });

    expect(localStorage.getItem(key)).toEqual(null);
  });

  it("returns a setValue function that can reset local storage", () => {
    const key = "mystorage";
    const initialState = "value";

    const { result } = renderHook(() => useLocalStorage(key, initialState));
    const newValue = "new value";

    act(() => {
      result.current.setValue(newValue);
    });

    expect(result.current.storedValue).toEqual(newValue);
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(newValue));
  });
});
