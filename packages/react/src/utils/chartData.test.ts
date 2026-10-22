import { describe, expect, it } from "vitest";
import { filterFiniteValues } from "./chartData";

describe("filterFiniteValues", () => {
  it("removes NaN and Infinity while preserving zero and negative values", () => {
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: NaN },
      { name: "C", value: 0 },
      { name: "D", value: -25 },
      { name: "E", value: Infinity },
      { name: "F", value: -Infinity },
    ];

    expect(filterFiniteValues(data)).toEqual([
      { name: "A", value: 10 },
      { name: "C", value: 0 },
      { name: "D", value: -25 },
    ]);
  });

  it("returns an empty array when all values are invalid", () => {
    expect(filterFiniteValues([{ value: NaN }, { value: Infinity }])).toEqual([]);
  });

  it("does not mutate the original array", () => {
    const data = [{ value: 1 }, { value: NaN }];
    filterFiniteValues(data);
    expect(data).toHaveLength(2);
  });
});