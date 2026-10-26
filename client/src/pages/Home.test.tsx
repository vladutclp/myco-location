import { screen } from "@testing-library/react";
import Home from "./Home";
import { customRender as render } from "../test/utils";

describe("Test for test setup check", () => {
  it("renders Home page", () => {
    render(<Home />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});
