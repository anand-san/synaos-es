import { UserPropTypes } from "../../Pages/RandomUser/randomuser.types";
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
            src={user.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScdGAFZS8P9rXmHkXMDp_vgYHzKMsrO5xSww&usqp=CAU"}
            alt={`image_${user.phone}`}
          />
          <h2 data-testid="user_name">{user.name || "NA"}</h2>
        </div>
        <div className={classes.userDetails}>
          <p data-testid="user_gender">Gender: {user.gender || "NA"}</p>
          <p data-testid="user_phone">Phone: {user.phone}</p>
          <p data-testid="user_born">Born: {user.dob ? new Date(user.dob as string).toDateString() : "NA"}</p>
        </div>
        <div className={classes.dbStatus} style={{color: backendApiStatus.error ? "red" : "green"}}>
            {backendApiStatus.error ? "Failed to save" : backendApiStatus.inProgress ? "Saving" : "Saved"}
        </div>
      </Paper>
    </div>
  );
}
