import { Pagination } from "../Pagination";

describe("Pagination", () => {
  const obj: Pagination = {
    limit: 10,
    pages: 1,
  };

  it("The toJson function should return a correct records", () => {
    expect(Pagination.toJson(obj)).toStrictEqual({
      limit: 10,
      offset: 0,
    });
  });

  it("The getOffset function should return a correct offsets", () => {
    expect(
      Pagination.getOffset({
        limit: 10,
        pages: 4,
      })
    ).toEqual(30);
  });
});
