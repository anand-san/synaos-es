import React from "react"
import { getRandomUser } from "../../api/request-layer"
const HomeBehaviour = () => {
    const [userDetails, setUserDetails] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isError, setIsError] = React.useState(false)
    React.useEffect(() => {
        getRandomUser().then(response => {
            setUserDetails(response.data.results)
        }).catch(setIsError).finally(() => {
            setIsLoading(false)
        })
    }, [])

    return { userDetails, isLoading, isError }
}

export { HomeBehaviour }