import React from "react"
import RandomUser from "./Pages/RandomUser"
import SavedUsers from "./Pages/SavedUsers"
import { ErrorAlert } from "./Components/FullPageAlerts";

export type RouteProps = {
    component: React.ComponentType<any>,
    path: string,
    name: string
}

export const routes: RouteProps[] = [
    {
        component: RandomUser,
        path: "/randomuser",
        name: "Random Users"
    },{
        component: SavedUsers,
        path: "/savedusers",
        name: "Saved Users"
    },{
        component: ErrorAlert,
        path: "/error",
        name: "Error"
    }
]