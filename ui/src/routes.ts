import React from "react"
import HomePage from "./Pages/Home"

export type RouteProps = {
    component: React.ComponentType<any>,
    path: string,
    name: string
}

export const routes: RouteProps[] = [
    {
        component: HomePage,
        path: "/",
        name: "Capture Snapshot"
    }
]