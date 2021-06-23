import React from "react";
import { render, screen } from "@testing-library/react";
import UserCard from "../index";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("axios");

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("UserCardComponent", () => {
  describe("Check data", () => {
    axios.mockImplementation(() =>
      Promise.resolve({
        data: {
          status: "Success",
        },
      })
    );

    const data = {
      uuid: "UniqueId",
      phone: 1234567890,
    };
    it("checks if required data is displayed", async () => {
      act(() => {
        render(<UserCard data={data} />);
      });
      await act(() => sleep(100));
      const phone = screen.getByTestId("user_phone");
      expect(phone.textContent).toEqual(`Phone: ${data.phone}`);
    });

    it("checks if NA is displayed when the data is not passed", async () => {
      act(() => {
        render(<UserCard data={data} />);
      });
      await act(() => sleep(100));
      const name = screen.getByTestId("user_name");
      const born = screen.getByTestId("user_born");
      const gender = screen.getByTestId("user_gender");
      expect(name.textContent).toEqual(`NA`);
      expect(born.textContent).toEqual(`Born: NA`);
      expect(gender.textContent).toEqual(`Gender: NA`);
    });

    it("checks if default image is displayed if image prop is not passed", async () => {
      act(() => {
        render(<UserCard data={data} />);
      });
      await act(() => sleep(100));
      const image = screen.getByAltText(`image_${data.phone}`);
      expect(image).toHaveAttribute(
        "src",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScdGAFZS8P9rXmHkXMDp_vgYHzKMsrO5xSww&usqp=CAU"
      );
    });
  });

  describe("storeUserIntoBackend", () => {
    const data = {
      uuid: "UniqueId",
      phone: 1234567890,
    };
    it("checks status message on successful api call", async () => {
      axios.mockImplementation(() =>
        Promise.resolve({
          data: {
            status: "Success",
          },
        })
      );

      act(() => {
        render(<UserCard data={data} />);
      });
      const apiStatus = screen.getByTestId("backend_status");
      expect(apiStatus.textContent).toEqual("Saving");
      await act(() => sleep(100));
      expect(apiStatus.textContent).toEqual("Saved");
    });

    it("checks status message on failed api call", async () => {
      axios.mockImplementation(() => Promise.reject());

      act(() => {
        render(<UserCard data={data} />);
      });
      const apiStatus = screen.getByTestId("backend_status");
      expect(apiStatus.textContent).toEqual("Saving");
      await act(() => sleep(100));
      expect(apiStatus.textContent).toEqual("Failed to save");
    });

    it("checks status message on successful api call but Error response", async () => {
      axios.mockImplementation(() =>
        Promise.resolve({
          data: {
            status: "Error",
          },
        })
      );

      act(() => {
        render(<UserCard data={data} />);
      });
      const apiStatus = screen.getByTestId("backend_status");
      expect(apiStatus.textContent).toEqual("Saving");
      await act(() => sleep(100));
      expect(apiStatus.textContent).toEqual("Failed to save");
    });
  });
});
