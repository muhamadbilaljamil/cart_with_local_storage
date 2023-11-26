import { useEffect } from "react";
import { NotificationContainer } from "react-notifications";
import TopBar from "./TopBar";
import ItemsGrid from "./ItemsGrid";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "20px",
  },
}));

function Products() {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <Box className={classes.mainContainer}>
      <NotificationContainer />
      <TopBar />
      <ItemsGrid />
    </Box>
  );
}

export default Products;
