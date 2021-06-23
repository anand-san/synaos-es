import { RandomUserBehaviour } from './randomuser.behaviour'
import UserCard from '../../Components/UserCard'
import { UserPropTypes } from './randomuser.types'
export default function RandomUser() {
    const {userDetails, isError, isLoading, classes} = RandomUserBehaviour()

    if(isError)
        return <div data-testid="random_user_error">{isError}</div>
    return (
        <div className={classes.root}>
            <div className={classes.main} data-testid="random_user">
            {isLoading ? "Loading" : <UserCard data={userDetails as UserPropTypes}/>}
            </div>
        </div>
    )
}
