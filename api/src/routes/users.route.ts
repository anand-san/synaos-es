import { Router } from "express"
import * as usersController from "../controller/users.controller"

export const userRouter = Router()

userRouter.get("/getUsers", usersController.getUsers)
userRouter.post("/createUser", usersController.createUser)
userRouter.post("/updateUser", usersController.updateUser)
userRouter.post("/deleteUser", usersController.deleteUser)