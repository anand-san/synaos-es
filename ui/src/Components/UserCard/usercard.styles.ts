import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    paper: {
        padding: 10,
        margin: 10,
        minWidth: "50vw",
        minHeight: "40vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
    },image: {
        width: "auto",
        borderRadius: "100%"
    },userDetails: {
        display: "flex",
        justifyContent: "space-around"
    }, dbStatus: {
        fontWeight: "lighter",
        fontSize: "13px"
    }
});