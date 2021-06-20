import {UserModel, IUserModel} from "../models/users.model"

export const getUsers = async () => {
    try{
        return await UserModel.find()
    }catch(e){
        throw e
    }
}

export const createUser = async (user:IUserModel) => {
    try{
        return await UserModel.create(user)
    }catch(e){
        throw e
    }
}

export const updateUser = async (user:IUserModel) => {
    try{
        return await UserModel.updateOne(user)
    }catch(e){
        throw e
    }
}

export const deleteUser = async (userUUID: string) => {
    try{
        return await UserModel.deleteOne({uuid: userUUID})
    }catch(e){
        throw e
    }
}