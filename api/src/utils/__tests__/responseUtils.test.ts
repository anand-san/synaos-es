import { responseMessage } from "../responseUtils"

describe("responseMessage", () => {
    describe("When no params are passed", () => {
        it("returns the default response", () => {
            const DEFAULT_RESPONSE = {
                statusCode: 200, status: "Success", message: ""
            }
            expect(responseMessage.message()).toEqual(DEFAULT_RESPONSE)
        })
    })

    describe("When status code is passed", () => {
        it("returns a correct statusCode", () => {
            expect(responseMessage.message(500)).toEqual({
                statusCode: 500, status: "Error", message: ""
            })
        })

        it("returns success when status code 200 is passed", () => {
            expect(responseMessage.message(200)).toEqual({
                statusCode: 200, status: "Success", message: ""
            })
        })

        it("returns error when status code other than 200 is passed", () => {
            expect(responseMessage.message(201)).toEqual({
                statusCode: 201, status: "Error", message: ""
            })
        })
    })

    describe("When passed a statuscode and message", () => {
        it("returns a correct message string", () => {
            expect(responseMessage.message(500, "Internal Server Error")).toEqual({
                statusCode: 500, status: "Error", message: "Internal Server Error"
            })
        })
        it("returns a correct message object", () => {
            expect(responseMessage.message(500, { Error: "Internal Server Error" })).toEqual({
                statusCode: 500, status: "Error", message: { Error: "Internal Server Error" }
            })
        })
    })


})