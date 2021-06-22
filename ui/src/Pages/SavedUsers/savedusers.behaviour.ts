import React from "react"
import { getUsers } from "../../api/request-layer"
import { UserPropTypes } from "../../Pages/RandomUser/randomuser.types";
export default function SavedUsersBehaviour() {

    const [tableData, setTableData] = React.useState<UserPropTypes[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [isError, setIsError] = React.useState<boolean>(false)

    React.useEffect(() => {
        getUsers().then(response => {
            let result = response.data.message
            setTableData(result.reduce((a: UserPropTypes[],c: UserPropTypes) => {
                a.push({
                    name: c.name,
                    gender: c.gender,
                    dob: new Date(c.dob as string).toDateString(),
                    phone: c.phone,
                    picture: c.picture,
                    uuid: c.uuid,
                  })
                return a
            }, []))
        }).catch(e => {
            setIsError(true)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    return {tableData, isLoading, isError, setTableData}
}
