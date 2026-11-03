import { describe, expect, it } from "vitest";
import { filterScatterData } from "./scatterData";

describe("filterScatterData", () => {
  it("preserves valid coordinates, including zero and negatives", () => {
    const data = [
      { x: 0, y: 0 },
      { x: -10, y: 20 },
      { x: 15, y: -5 },
    ];

    expect(filterScatterData(data)).toEqual(data);
  });

  it("removes non-finite coordinates", () => {
    const data = [
      { x: 1, y: 2 },
      { x: Number.NaN, y: 3 },
      { x: 4, y: Number.POSITIVE_INFINITY },
      { x: Number.NEGATIVE_INFINITY, y: 5 },
      { x: 6, y: 7 },
    ];

    expect(filterScatterData(data)).toEqual([
      { x: 1, y: 2 },
      { x: 6, y: 7 },
    ]);
  });

  it("returns an empty array when no points are valid", () => {
    expect(
      filterScatterData([
        { x: Number.NaN, y: 1 },
        { x: 2, y: Number.POSITIVE_INFINITY },
      ])
    ).toEqual([]);
  });

  it("preserves point order and optional names", () => {
    const data = [
      { x: 3, y: 9, name: "Third" },
      { x: Number.NaN, y: 0, name: "Invalid" },
      { x: 1, y: 4, name: "First" },
    ];

    expect(filterScatterData(data)).toEqual([
      { x: 3, y: 9, name: "Third" },
      { x: 1, y: 4, name: "First" },
    ]);
  });

  it("does not mutate the original array", () => {
    const data = Object.freeze([
      Object.freeze({ x: 1, y: 2 }),
      Object.freeze({ x: Number.NaN, y: 3 }),
    ]);

    const result = filterScatterData(data);

    expect(data).toHaveLength(2);
    expect(result).toEqual([{ x: 1, y: 2 }]);
    expect(result).not.toBe(data);
  });
});