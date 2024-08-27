import { render, screen } from "@testing-library/react-native";
import Error from "../Error";
import React from "react";

describe("<Error />", () => {
  test("Error renders correctly", () => {
    render(<Error title="Internal Server Error" />);

    const el = screen.getByText(/Internal Server Error/);

    expect(el).not.toBeNull();
  });
});
