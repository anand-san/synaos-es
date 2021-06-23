import axios from "axios";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RandomUser from "../index";

jest.mock("axios");

jest.mock("../../../Components/UserCard", () => () => <div data-testid="mocked_usercard"></div>);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("RandomUserComponent", () => {
    it("Checks if Loading text is displayed when data is loading", async () => {
        axios.mockImplementation(() =>
        Promise.resolve({
            data: API_DATA,
          })
      );
    
        act(() => {
          render(<RandomUser />);
        });
        const phone = screen.getByTestId("random_user");
        expect(phone.textContent).toEqual(`Loading`);
        await act(() => sleep(100));
        const userCard = screen.getByTestId("mocked_usercard")
        expect(userCard).toBeInTheDocument();
      });

      it("Checks if UserData component is loaded if api returns success", async () => {
        axios.mockImplementation(() =>
        Promise.resolve({
            data: API_DATA,
          })
      );
    
        act(() => {
          render(<RandomUser />);
        });
        await act(() => sleep(100));
        const userCard = screen.getByTestId("mocked_usercard")
        expect(userCard).toBeInTheDocument();
      });

      it("Checks if correct error is displayed if api fails", async () => {
        axios.mockImplementation(() =>
        Promise.reject("Error")
      );
    
        act(() => {
          render(<RandomUser />);
        });
        await act(() => sleep(100));
        const error = screen.getByTestId("random_user_error")
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent("Error");
      });
});

const API_DATA = {"results":[{"gender":"female","name":{"title":"Mrs","first":"Ilona","last":"Hartig"},"location":{"street":{"number":9879,"name":"Ringstraße"},"city":"Meßkirch","state":"Rheinland-Pfalz","country":"Germany","postcode":33107,"coordinates":{"latitude":"-42.9746","longitude":"126.8447"},"timezone":{"offset":"+11:00","description":"Magadan, Solomon Islands, New Caledonia"}},"email":"ilona.hartig@example.com","login":{"uuid":"74affc8a-4dae-45d8-8f6c-4b2ecd2dd414","username":"smallfish768","password":"gordo","salt":"YP4w2GG0","md5":"19b2bef4c18a31bb9c06a698a6bd6ed5","sha1":"fa1e6b10c8af8e5b5c8c756038a9a801a8acc397","sha256":"0e06b549169d718971cef5ad757a897f4ce5793d37fb70199cf74e86e8306047"},"dob":{"date":"1951-10-26T15:54:48.817Z","age":70},"registered":{"date":"2018-07-22T04:38:23.188Z","age":3},"phone":"0818-8202143","cell":"0174-3415610","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/75.jpg","medium":"https://randomuser.me/api/portraits/med/women/75.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/75.jpg"},"nat":"DE"}],"info":{"seed":"d9783551ba12e116","results":1,"page":1,"version":"1.3"}}