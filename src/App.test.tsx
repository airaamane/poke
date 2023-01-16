import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders pokemon header", () => {
  render(<App />);
  const linkElement = screen.getByText(/pokemon/i);
  expect(linkElement).toBeInTheDocument();
});
