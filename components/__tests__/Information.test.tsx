import { render, screen } from "@testing-library/react-native";
import { Information } from "../Information";

describe("<Information />", () => {
  test("Information renders correctly", () => {
    render(<Information title="Title" value="Value" />);

    const elTitle = screen.getByText(/Title/);
    const elValue = screen.getByText(/Value/);

    expect(elTitle).toBeTruthy();
    expect(elValue).toBeTruthy();
  });
});
