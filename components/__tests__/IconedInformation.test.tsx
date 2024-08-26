import { render, screen } from "@testing-library/react-native";
import { IconedInformation } from "../IconedInformation";
import { Text } from "react-native";

describe("<IconedInformation />", () => {
  test("Information renders correctly", () => {
    render(
      <IconedInformation
        icon={<Text>I'm Icon</Text>}
        title="Title"
        value="Value"
      />
    );

    const elIcon = screen.getByText(/I'm Icon/);
    const elTitle = screen.getByText(/Title/);
    const elValue = screen.getByText(/Value/);

    expect(elIcon).toBeTruthy();
    expect(elTitle).toBeTruthy();
    expect(elValue).toBeTruthy();
  });
});
