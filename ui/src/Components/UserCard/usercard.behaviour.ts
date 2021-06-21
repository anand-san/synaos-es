import React from "react"
import { createUser } from "../../api/request-layer"
import { ICardProps } from "./usercard.component"
import { useStyles } from "./usercard.styles"

export const UserCardBehaviour = (props: ICardProps) => {
    const classes = useStyles()

    const [backendApiStatus, setBackendApiStatus] = React.useState<{inProgress: boolean, error: boolean}>({
        inProgress: true,
        error: false
    })
    
    React.useEffect(() => {
        let currentApiStatus = {
            inProgress: false,
            error: false
        }
        createUser(props.data).then(resposne => {
            if(resposne.data.status === "Error")
                currentApiStatus.error= true
        }).catch(e => {
            currentApiStatus.error= true
        }).finally(() => {
            setBackendApiStatus(currentApiStatus)
        })
    },[props.data])

    return {classes, backendApiStatus}
}