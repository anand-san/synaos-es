import React from "react"
import ErrorAlert from "../ErrorAlert.component";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("ErrorAlert", () => {
  it("When component is rendered, Check if error message is displayed", async () => {
    render(<ErrorAlert />);
    await waitFor(() => screen.getByText("Oops! Something went wrong"));
  });

  it("Expect user to redirect to saved users on saved users button click", () => {
    let { getByText } = render(<ErrorAlert />);
    fireEvent.click(getByText("Saved Users"));
    expect(mockHistoryPush).toBeCalledWith("/savedusers");
  });

  it("Expect user to redirect to random users on random users button click", () => {
    let { getByText } = render(<ErrorAlert />);
    fireEvent.click(getByText("Random Users"));
    expect(mockHistoryPush).toBeCalledWith("/randomuser");
  });
});
