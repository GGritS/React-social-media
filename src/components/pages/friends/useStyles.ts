import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
  loading?: boolean;
};

export const useStyles = makeStyles<Theme, Props>((theme) => ({
  wrapper: {
    margin: 2,
    paddingX: "30px",
    backgroundColor: "#F1F7FA",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: (props) => (props.loading ? "red" : "green"),
  },
}));
