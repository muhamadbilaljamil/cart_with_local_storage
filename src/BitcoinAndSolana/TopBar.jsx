import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "./Loading";

import { useLocalStorage } from "./useLocalStorage";
import { localCart, deleteProduct } from "../redux/actions/Cart";
import { useLocation, Link } from "react-router-dom";

import { Box, Typography } from "@material-ui/core";
import cart_icon from "./images/cart_icon.svg";
import down_arrow from "./images/arrow-down.svg";
import delete_icon from "./images/delete.svg";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  topBarContainer: {
    padding: "10px",
    background: "#ffffff",
    minHeight: "48px",
    display: "flex",
    // border: '1px solid #000',
  },

  leftSide: {
    flex: "2",
  },

  rightSide: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: "1",
    // border: '1px solid #000',
    padding: "0 10px",
  },

  menuButtons: {
    color: "#cccccc",
    minWidth: "196px",
    display: "flex",
    justifyContent: "space-between",
  },

  btn: {
    cursor: "pointer",
  },

  cartContainer: {
    position: "relative",

    "& .checkoutContainer": {
      zIndex: 2,
      visibility: "hidden",
      minWidth: "260px",
      padding: "12px",
      borderRadius: "2px",
      right: "0px",
      position: "absolute",
      border: "1px solid #dedede",
      background: "#FFFFFF",
      opacity: "0",
      transition: "all 0.8s",
    },

    "&:hover .checkoutContainer": {
      visibility: "visible",
      opacity: "1",
    },
  },

  notificationIcon: {
    cursor: "pointer",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #FFFFFF",
    color: "#FFFFFF",
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    top: "-5px",
    right: "-8px",
    background: "red",
  },

  cartIcon: {
    width: "40px",
    cursor: "pointer",
  },

  checkoutContainer: {},

  checkoutItems: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottom: "1px solid #d9d9d9",
  },

  header: {
    display: "flex",
    width: "98%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemTitle: {
    fontSize: "18px",
    fontWeight: "900",
  },

  deleteIcon: {
    cursor: "pointer",
    padding: "6px 4px",
    background: "#fcfafa",
    borderRadius: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.5s",
    "&:hover": {
      transform: "scale(1.1)",
      background: "#f4f4f4",
    },
    "& .icon": {
      width: "25px",
    },
  },

  body: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconContainer: {
    borderRadius: "3px",
    padding: "5px 5px 0 5px",
    border: "1px solid #d9d9d9",
    height: "max-content",
  },

  coinIcon: {
    width: "60px",
  },

  checkoutContent: {
    marginLeft: "15px",
  },

  row: {
    padding: "4px",
    borderBottom: "1px solid #d9d9d9",
    display: "flex",
    // justifyContent: 'space-between',
    alignItems: "center",

    "&:last-child": {
      borderBottom: "none",
    },
  },

  title: {
    minWidth: "80px",
    fontSize: "12px",
    fontWeight: "500",
  },

  amount: {
    marginLeft: "10px",
    fontSize: "12px",
  },

  downArrowIcon: {
    marginLeft: "10px",
    width: "15px",
  },

  checkoutBtn: {
    cursor: "pointer",
    background: "#d9d9d9",
    color: "#FFFFFF",
    fontSize: "12px",
    marginTop: "10px",
    padding: "6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const TopBar = () => {
  const { cart } = useSelector((state) => state);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const [getCart, setCart] = useLocalStorage("cart");
  const dispatch = useDispatch();
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      let localCartItems = getCart();
      if (localCartItems.length > 0) {
        dispatch(localCart(localCartItems));
      }
    } else {
      setCart(cart);
    }
  }, [cart, getCart, setCart, dispatch]);

  const handleCheckout = () => {
    setCheckout(true);
    const cartdata = cart?.map((item) => {
      return { title: item.title, price: item.price, quantity: item.quantity };
    });
    const base_url = "http://localhost:4242";
    axios
      .post(`${base_url}/create-checkout-session`, {
        cartItems: cartdata,
        userId: "user_1248",
      })
      .then((response) => {
        console.log("Front side: ", response);
        if (response.data.url) {
          setCheckout(false);
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  const classes = useStyles();
  return (
    <>
      {checkout && <Loading />}
      <Box className={classes.topBarContainer}>
        <Box className={classes.leftSide}></Box>
        <Box className={classes.rightSide}>
          <Box className={classes.menuButtons}>
            <Typography className={classes.btn}>Contact us</Typography>
            <Typography className={classes.btn}>Sign in</Typography>
          </Box>
          <Box className={classes.cartContainer}>
            <Box className={classes.notificationIcon}>{cart?.length}</Box>
            <img className={classes.cartIcon} src={cart_icon} alt="cart icon" />
            <Box className="checkoutContainer">
              {cart?.length === 0 ? (
                <Box className="empty_cart">
                  <Typography>Cart is Empty</Typography>
                </Box>
              ) : (
                cart?.map((item, index) => {
                  return (
                    <Box className={classes.checkoutItems} key={index}>
                      <Box className={classes.header}>
                        <Typography className={classes.itemTitle}>
                          {item.title}
                        </Typography>
                        {id ? (
                          ""
                        ) : (
                          <Box
                            className={classes.deleteIcon}
                            onClick={() =>
                              dispatch(deleteProduct({ indx: index }))
                            }
                          >
                            <img
                              className="icon"
                              src={delete_icon}
                              alt="delete icon"
                            />
                          </Box>
                        )}
                      </Box>
                      <Box className={classes.body}>
                        <Box className={classes.iconContainer}>
                          <img
                            className={classes.coinIcon}
                            src={item.main_icon}
                            alt="bitcoin logo"
                          />
                        </Box>
                        <Box className={classes.checkoutContent}>
                          <Box className={classes.row}>
                            <Typography className={classes.title}>
                              Quantity:{" "}
                            </Typography>
                            <Typography className={classes.amount}>
                              {item.quantity}
                            </Typography>
                          </Box>
                          <Box className={classes.row}>
                            <Typography className={classes.title}>
                              Price:{" "}
                            </Typography>
                            <Typography className={classes.amount}>
                              ${item.price}
                            </Typography>
                          </Box>

                          <Box className={classes.row}>
                            <Typography className={classes.title}>
                              View Bag{" "}
                            </Typography>
                            <img
                              className={classes.downArrowIcon}
                              src={down_arrow}
                              alt="down arrow"
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              )}

              {cart?.length === 0 ? (
                ""
              ) : (
                <>
                  <Link to={"/dashboard/checkout"}>
                    <Box className={classes.checkoutBtn}>Checkout</Box>
                  </Link>
                  <Box>
                    <Box
                      className={classes.checkoutBtn}
                      onClick={() => handleCheckout()}
                    >
                      Continue to payment
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
