import axios from "axios";
import { UserPropTypes } from "../Pages/RandomUser/randomuser.types";

export const getRandomUser = async () => {
    try {
        return await axios({
            baseURL: "https://randomuser.me",
            method: "GET",
            url: "api",
        })
    } catch (e) {
        throw e
    }
}

export const getUsers = async () => {
    try {
        return await axios({
            baseURL: process.env.REACT_APP_API_BASE,
            method: "GET",
            url: "getUsers",
        })
    } catch (e) {
        throw e
    }
}

export const createUser = async (payload: UserPropTypes) => {
    try {
        return await axios({
            baseURL: process.env.REACT_APP_API_BASE,
            method: "post",
            url: "createUser",
            data: payload
        })
    } catch (e) {
        throw e
    }
}

export const updateUser = async (payload: UserPropTypes) => {
    try {
        return await axios({
            baseURL: process.env.REACT_APP_API_BASE,
            method: "post",
            url: "updateUser",
            data: payload
        })
    } catch (e) {
        throw e
    }
}

export const deleteUser = async (uuid: string) => {
    try {
        return await axios({
            baseURL: process.env.REACT_APP_API_BASE,
            method: "post",
            url: "deleteUser",
            data: { uuid }
        })
    } catch (e) {
        throw e
    }
}

