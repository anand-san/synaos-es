import React from "react"
import { getUsers } from "../../api/request-layer"

export default function SavedUsersBehaviour() {

    const [tableData, setTableData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [isError, setIsError] = React.useState<boolean>(false)

    React.useEffect(() => {
        getUsers().then(response => {
            let result = response.data.message
            setTableData(result.reduce((a: Array<any>,c: any) => {
                a.push({
                    name: c.name,
                    gender: c.gender,
                    dob: new Date(c.dob).toDateString(),
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

    return {tableData, isLoading, isError}
}
