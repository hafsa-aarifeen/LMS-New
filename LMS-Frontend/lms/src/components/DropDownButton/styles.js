import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  button: {
    minWidth: "166px",
  },
  endIcon: (props) => ({
    marginLeft: props.buttonText ? "33px" : "120px",
  }),
  paperRoot: (props) => ({
    width: props.width ? props.width : "275px",
  }),
}));

export default useStyles;
