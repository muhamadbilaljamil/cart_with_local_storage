import { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import solana_icon from "./images/solana-logo.svg";
import plus from "./images/plus_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/Cart";

const bitcoin_icon = solana_icon;
const greenIcon = solana_icon;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
  },

  gridContainer: {
    flex: "1",
    margin: "40px auto 0",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "14px",
  },

  cardItem: {
    // border: '1px solid #000',
    padding: "15px !important",
    minWidth: "220px",
    maxWidth: "260px",
    borderRadius: "4px",
    transition: "all 0.5s",
    "&:hover": {
      background: "#f7f7f7",
      boxShadow: "1px 1px 6px rgba(0 , 0 , 0 , 0.1)",
    },
  },

  contentContainer: {
    minHeight: "260px",
    borderRadius: "4px",
    border: "1px solid #b7b3b3",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {},

  mainIcon: {
    width: "100px",
  },

  subIconContainer: {
    width: "25px",
    height: "25px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#cccccc",
  },

  subIcon: { width: "15px" },

  cartButtonContainer: {
    cursor: "pointer",
    marginTop: "8px",
    borderRadius: "4px",
    background: "#FFFFFF",
    border: "1px solid #b7b3b3",
    transition: "all 0.5s",
    "&:hover": {
      background: "#9b9595",
    },
  },

  cartButton: {
    width: "100%",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: "#b7b3b3",
    transition: "all 0.5s",

    "&:hover": {
      color: "#FFFFFF",
    },
  },
}));

const cardList = [
  {
    id: "p1",
    title: "Bitcoin",
    main_icon: bitcoin_icon,
    sub_icon: plus,
    price: 1233,
  },
  {
    id: "p2",
    title: "Solana",
    main_icon: solana_icon,
    sub_icon: plus,
    price: 855,
  },
  {
    id: "p3",
    title: "Bitcoin",
    main_icon: bitcoin_icon,
    sub_icon: plus,
    price: 1233,
  },
  {
    id: "p4",
    title: "Solana",
    main_icon: solana_icon,
    sub_icon: plus,
    price: 855,
  },
  {
    id: "p5",
    title: "Bitcoin",
    main_icon: bitcoin_icon,
    sub_icon: plus,
    price: 1233,
  },
  {
    id: "p6",
    title: "Solana",
    main_icon: solana_icon,
    sub_icon: plus,
    price: 855,
  },
  {
    id: "p7",
    title: "Bitcoin",
    main_icon: bitcoin_icon,
    sub_icon: plus,
    price: 1233,
  },
  {
    id: "p8",
    title: "Solana",
    main_icon: solana_icon,
    sub_icon: plus,
    price: 855,
  },
  {
    id: "p9",
    title: "Bitcoin",
    main_icon: bitcoin_icon,
    sub_icon: plus,
    price: 1233,
  },
  {
    id: "p10",
    title: "Solana",
    main_icon: solana_icon,
    sub_icon: plus,
    price: 855,
  },
  {
    id: "p11",
    title: "Bitcoin",
    main_icon: bitcoin_icon,
    sub_icon: plus,
    price: 1233,
  },
  {
    id: "p12",
    title: "Solana",
    main_icon: solana_icon,
    sub_icon: plus,
    price: 855,
  },
  {
    id: "p13",
    title: "Bitcoin",
    main_icon: bitcoin_icon,
    sub_icon: plus,
    price: 1233,
  },
  {
    id: "p14",
    title: "Solana",
    main_icon: solana_icon,
    sub_icon: plus,
    price: 855,
  },
  {
    id: "p15",
    title: "Bitcoin",
    main_icon: bitcoin_icon,
    sub_icon: plus,
    price: 1233,
  },
  {
    id: "p16",
    title: "Solana",
    main_icon: solana_icon,
    sub_icon: plus,
    price: 855,
  },
];

const ItemsGrid = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(({ cart }) => cart);
  const [itemsString, setItemString] = useState("");

  useEffect(() => {
    let string = "";
    cart?.map((item) => (string += `+${item.id}+`));
    setItemString(string);
  }, [cart]);

  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      {/* <Box className={classes.leftSide}>

            </Box> */}

      <Grid className={classes.gridContainer} container spacing={4}>
        {cardList?.map((item, index) => {
          // console.log(itemsString.includes(item.id));
          return (
            <Grid
              className={classes.cardItem}
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
            >
              <Box className={classes.contentContainer}>
                <Typography className={classes.title}>{item.title}</Typography>
                <img
                  className={classes.mainIcon}
                  src={item.main_icon}
                  alt="main icon"
                />
                <Box className={classes.subIconContainer}>
                  {itemsString.includes(`+${item.id}+`) ? (
                    <img
                      className={classes.subIcon}
                      src={greenIcon}
                      alt="green tick icon"
                    />
                  ) : (
                    <img
                      className={classes.subIcon}
                      src={item.sub_icon}
                      alt="sub icon"
                    />
                  )}
                </Box>
              </Box>
              <Box className={classes.cartButtonContainer}>
                <Box
                  className={classes.cartButton}
                  onClick={() => {
                    dispatch(addToCart({ ...item, quantity: 1 }));
                  }}
                >
                  Add to cart
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ItemsGrid;
