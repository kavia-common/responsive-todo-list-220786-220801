import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Retro Todo header", () => {
  render(<App />);
  expect(screen.getByText(/retro todo/i)).toBeInTheDocument();
});
