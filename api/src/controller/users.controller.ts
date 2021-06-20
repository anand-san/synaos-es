import * as userService from "../service/users.service"
import { Request, Response } from "express"

export const getUsers = async (req: Request, res: Response) => {
    let response = {
        status: "Success",
        message: ""
    }
    try {
        let users = await userService.getUsers()
        res.send(users)
    } catch (e) {
        response.status = "Error",
            response.message = e.message || e
    } finally {
        res.send(response)
    }

}