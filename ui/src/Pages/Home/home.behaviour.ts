import React from "react"
import { getRandomUser } from "../../api/request-layer"
import { useStyles } from "./home.styles"
import { UserPropTypes } from "./home.types"

export const HomeBehaviour = () => {
    const classes = useStyles()
    const [userDetails, setUserDetails] = React.useState<UserPropTypes | unknown>(null)
    const [isLoading, setIsLoading] = React.useState<Boolean>(true)
    const [isError, setIsError] = React.useState<Boolean>(false)

    React.useEffect(() => {
        getRandomUser().then(response => {
            let result = response.data.results[0]
            console.log(result)
            let user:UserPropTypes = {
                name: result.name.first,
                uuid: result.login.uuid,
                gender: result.gender,
                dob: result.dob.date,
                phone: result.cell && result.cell.replace(/-|\(|\)|" "/g, ""),
                picture: result.picture.large
            }
            setUserDetails(user)
        }).catch(e => {
            setIsError(e.message || e)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    return { userDetails, isLoading, isError, classes }
}