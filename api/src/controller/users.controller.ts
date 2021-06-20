import * as userService from "../service/users.service"
import { Request, Response } from "express"
import {responseMessage} from "../utils/responseUtils"

export const getUsers = async (req: Request, res: Response) => {
    try {
        let users = await userService.getUsers()
        res.send(responseMessage.message(200, users))
    } catch (e) {
        res.send(responseMessage.message(500, e.message || e))
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        let users = await userService.createUser(req.body)
        res.send(responseMessage.message(200, users))
    } catch (e) {
        res.send(responseMessage.message(500, e.message || e))
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        let users = await userService.updateUser(req.body.uuid as string, req.body)
        res.send(responseMessage.message(200, users))
    } catch (e) {
        res.send(responseMessage.message(500, e.message || e))
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        let users = await userService.deleteUser(req.body.uuid as string)
        res.send(responseMessage.message(200, users))
    } catch (e) {
        res.send(responseMessage.message(500, e.message || e))
    }
}