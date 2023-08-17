import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("renders headline", () => {
    render(<App />);
    const headline = screen.getByText("Welcome To Space");

    expect(headline).toBeInTheDocument();
  });
});
