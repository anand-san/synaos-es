import { HomeBehaviour } from './home.behaviour'
import UserCard from '../../Components/UserCard'
import { UserPropTypes } from './home.types'
export default function HomeView() {
    const {userDetails, isError, isLoading, classes} = HomeBehaviour()

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
