import { makeStyles } from "@mui/styles";
import img from "../../pictures/homebg4.jpg";

export const useStyles = makeStyles((theme) => ({
  homePage: {
    overflow: "hidden",
    paddingTop: "10px",
    paddingRight: "10px",
  },
  templateContainer: {},
  card: {
    width: 300,
    marginRight: 20,
  },
  cardImage: {
    width: "50%",
    height: "auto",
  },
  cardContent: {
    // padding: theme.spacing(2),
    backgroundColor: "#f2f2f2",
  },
  cardSection: {
    paddingLeft: "10px",
  },
  detailsSection: {
    paddingBottom: "150px",
  },
  body: {
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    display: "grid",
    height: "100vh",
    // backgroundImage: `url(${img})`,
    paddingLeft: "20px",
  },
}));
