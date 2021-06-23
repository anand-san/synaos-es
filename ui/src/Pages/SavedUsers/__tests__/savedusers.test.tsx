import axios from "axios";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SavedUsers from "../index";

jest.mock("axios");

jest.mock("../../../Components/FullPageAlerts/ErrorAlert.component", () => () => (
  <div data-testid="mocked_error_alert"></div>
));
jest.mock("material-table", () => () => (
  <div data-testid="mocked_materialtable"></div>
));

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("SavedUserComponent", () => {
  it("Checks if Material Table is loaded if Api succeeds", async () => {
    axios.mockImplementation(() =>
      Promise.resolve({
        data: {
          message: [
            {
              _id: "60d096061933972617882e17",
              name: "Benjamin",
              uuid: "21c210de-57b4-465b-ad7e-488896108a2c",
              gender: "male",
              dob: "1974-09-16T23:58:42.893Z",
              phone: 85186201,
              picture: "https://randomuser.me/api/portraits/men/50.jpg",
              createdAt: "2021-06-21T13:37:10.049Z",
              updatedAt: "2021-06-21T13:37:10.049Z",
              __v: 0,
            },
          ],
        },
      })
    );

    act(() => {
      render(<SavedUsers />);
    });
    await act(() => sleep(100));
    const userCard = screen.getByTestId("mocked_materialtable");
    expect(userCard).toBeInTheDocument();
  });

  it("Checks if correct Error Component is displayed when api fails", async () => {
    axios.mockImplementation(() => Promise.reject("Error"));

    act(() => {
      render(<SavedUsers />);
    });
    await act(() => sleep(100));
    const userCard = screen.getByTestId("mocked_error_alert");
    expect(userCard).toBeInTheDocument();
  });
});
