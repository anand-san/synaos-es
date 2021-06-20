import {Router} from "express"
import * as usersController from "../controller/users.controller"

export const userRouter = (app: Router) => {
    app.get("/getUsers", usersController.getUsers)
    app.post("/createUser", usersController.createUser)
    app.post("/updateUser", usersController.updateUser)
}
