import {Router} from "express"
import * as usersController from "../controller/users.controller"

export const userRouter = (app: Router) => {
    app.get("/getUsers", usersController.getUsers)
}
