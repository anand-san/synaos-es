import { UserPropTypes } from "../../Pages/Home/home.types";
import Paper from "@material-ui/core/Paper";
import { UserCardBehaviour } from "./usercard.behaviour";
export interface ICardProps {
  data: UserPropTypes;
}

export default function UserCard(props: ICardProps) {
  const { classes, backendApiStatus } = UserCardBehaviour(props);
  const { data: user } = props;
  return (
    <div>
      <Paper className={classes.paper} elevation={5}>
        <div>
          <img
            className={classes.image}
            src={user.picture}
            alt={`image_${user.name}`}
          />
          <h2>{user.name}</h2>
        </div>
        <div className={classes.userDetails}>
          <p>Gender: {user.gender}</p>
          <p>Phone: {user.phone}</p>
          <p>Born: {new Date(user.dob as string).toDateString()}</p>
        </div>
        <div className={classes.dbStatus} style={{color: backendApiStatus.error ? "red" : "green"}}>
            {backendApiStatus.error ? "Failed to save" : backendApiStatus.inProgress ? "Saving" : "Saved"}
        </div>
      </Paper>
    </div>
  );
}
