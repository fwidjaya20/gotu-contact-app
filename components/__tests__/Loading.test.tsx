import { render, screen } from "@testing-library/react-native";
import Loading from "../Loading";

describe("<Loading />", () => {
  test("Loading renders correctly", () => {
    render(<Loading />);

    const el = screen.getByTestId(/activity-indicator/);

    expect(el).not.toBeNull();
  });
});
