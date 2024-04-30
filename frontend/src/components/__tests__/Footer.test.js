import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../Footer";

describe("Footer", () => {
  // Realistic usage case
  test("renders footer with copyright information", () => {
    render(<Footer />);
    const footerElement = screen.getByText(
      /© \d{4} Boardable\. All rights reserved\./i
    );
    expect(footerElement).toBeInTheDocument();
  });

  test("renders correct text in the Footer", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(
      `© ${currentYear} Boardable. All rights reserved.`
    );
    expect(footerText).toBeInTheDocument();
  });
  test("footer has the correct class", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toHaveClass("footer");
  });

  test("footer contains a paragraph element", () => {
    render(<Footer />);
    const paragraphElement = screen.getByText(
      /© \d{4} Boardable\. All rights reserved\./i
    );
    expect(paragraphElement.tagName).toBe("P");
  })
});
