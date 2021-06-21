import { RandomUserBehaviour } from './randomuser.behaviour'
import UserCard from '../../Components/UserCard'
import { UserPropTypes } from './randomuser.types'
export default function RandomUserView() {
    const {userDetails, isError, isLoading, classes} = RandomUserBehaviour()

    if(isError)
        return <div>{isError}</div>
    return (
        <div className={classes.root}>
            <div className={classes.main}>
            {isLoading ? "Loading" : <UserCard data={userDetails as UserPropTypes}/>}
            </div>
        </div>
    )
}
