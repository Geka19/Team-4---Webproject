import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import NewsComponent from "../NewsComponent";
import "@testing-library/jest-dom/extend-expect";

describe("Button in NewsComponent", () => {
  afterEach(() => {
    cleanup(); // Clean up after each test
  });

  it("should render the button", () => {
    render(<NewsComponent />);
    const buttonElement = screen.getByText("Learn More");
    expect(buttonElement).toBeInTheDocument();
  });
});

describe("NewsComponent", () => {
  afterEach(() => {
    cleanup(); // Clean up after each test
  });

  it("renders the header correctly", () => {
    render(<NewsComponent />);
    const headerElement = screen.getByText("Latest News about sustainability");
    expect(headerElement).toBeInTheDocument();
  });
});

describe("Div for NewsComponent", () => {
  afterEach(() => {
    cleanup(); // Clean up after each test
  });

  it("renders the NewsComponent div correctly", () => {
    render(<NewsComponent />);
    const divElement = screen.getByTestId("news-component");
    expect(divElement).toBeInTheDocument();
  });
});
