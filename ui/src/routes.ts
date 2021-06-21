import React from "react"
import RandomUser from "./Pages/RandomUser"
import SavedUsers from "./Pages/SavedUsers"

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
    }
]