import React, { useState, useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  addToCart,
  addProductFeatures,
} from "redux/actions/Cart";
import { useLocation, Link, useHistory } from "react-router-dom";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bitcoin_icon from "./images/bitcoin-logo.svg";
import solana_icon from "./images/solana-logo.svg";
import plus from "./images/plus-q.svg";
import greenIcon from "./images/green_icon.svg";
import minus from "./images/minus1.svg";
import down_arrow from "./images/arrow-down.svg";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "85%",
    margin: "90px auto 0",
    padding: "12px",
    // border: '1px solid #dadada',

    "& .left-side": {
      display: "flex",
      flexDirection: "column",
      rowGap: "20px",
      alignItems: "center",

      "& .iconContainer": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "3px",
        width: "300px",
        height: "190px",
        border: "1px solid #dadada",
        "& .icon": {
          width: "120px",
        },
      },

      "& .title": {
        fontSize: "34px",
      },

      "& .quantity-row": {
        display: "flex",
        alignItems: "center",
        columnGap: "20px",
        // marginTop: '20px',

        "& .label": {
          fontSize: "12px",
        },

        "& .button-input": {
          display: "flex",
          alignItems: "center",
          border: "0.1px solid #9b9595",
          borderRadius: "2px",
          overflow: "hidden",

          "& .minus-btn": {
            cursor: "pointer",
            border: "none",
            width: "35px",
            height: "30px",

            "& .minus-icon": {
              width: "20px",
            },
          },

          "& .quantity-input": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            border: "none",
            outline: "none",
            width: "45px",
            height: "30px",

            "&::-webkit-inner-spin-button": {
              appearance: "none",
              margin: 0,
            },
          },

          "& .plus-btn": {
            cursor: "pointer",
            border: "none",
            width: "35px",
            height: "30px",

            "& .plus-icon": {
              width: "20px",
            },
          },
        },
      },

      "& .row": {
        padding: "4px",
        display: "flex",
        alignItems: "center",

        "& .title": {
          minWidth: "80px",
          fontSize: "12px ",
          fontWeight: "400",
        },

        "& .downArrowIcon": {
          marginLeft: "10px",
          width: "12px",
        },
      },
    },

    "& .right-side": {
      // borderLeft: '1px solid #dadada',
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      rowGap: "20px",

      "& .title": {
        fontSize: "24px",
        color: "#9b9595",
      },

      "& .product-detail": {
        // border: '1px solid #dadada',
        borderRadius: "3px",
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",

        "& .item": {
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          minHeight: "60px",
          maxWidth: "100%",
          minWidth: "350px",
          border: "1px solid #c8c8c8",
          borderRadius: "3px",

          "& .checkbox": {
            width: "25px",
            height: "25px",
            border: "1px solid #c8c8c8",
            marginRight: "10px",
          },
        },
      },
    },
    "& .btn-container": {
      textAlign: "right",
      "& .add-to-cart-btn": {
        margin: "0 auto",
        cursor: "pointer",
        fontSize: "18px",
        minHeight: "60px",
        maxWidth: "95%",
        minWidth: "370px",
        borderRadius: "3px",
        background: "transparent",
        border: "1px solid #c8c8c8",
        color: "#c8c8c8",
        transition: "all 0.9s",
        // fontWeight: '700',

        "&:hover": {
          background: "#c8c8c8",
          color: "#FFFFFF",
        },
      },
    },

    "& .main-title": {
      color: "#c8c8c8",
      width: "100%",
      textAlign: "center",
      marginBottom: "20px",
    },

    "& .main-cards-container": {
      display: "flex",
      justifyContent: "center",

      "& .cardItem": {
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

        "& .contentContainer": {
          minHeight: "260px",
          borderRadius: "4px",
          border: "1px solid #b7b3b3",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",

          "& .title": {},

          "& .mainIcon": {
            width: "100px",
          },

          "& .subIconContainer": {
            width: "25px",
            height: "25px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#cccccc",

            "& .subIcon": {
              width: "15px",
            },
          },
        },

        "& .cartButtonContainer": {
          cursor: "pointer",
          marginTop: "8px",
          borderRadius: "4px",
          background: "#FFFFFF",
          border: "1px solid #b7b3b3",
          transition: "all 0.5s",
          "&:hover": {
            background: "#9b9595",
          },

          "& .cartButton": {
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
        },
      },
    },
  },
}));

const cardList = [
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

const AddFeatures = () => {
  const { cart } = useSelector(({ cart }) => cart);
  const [itemsString, setItemString] = useState("");
  const dispatch = useDispatch();
  const [packages, setPackages] = useState([]);
  const classes = useStyles();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  console.log("Add Item : ", cart);

  const handlePackages = (item) => {
    console.log("Package Item", item);
    dispatch(addProductFeatures(item));
  };

  useEffect(() => {
    if (cart[id]["features"]) setPackages(cart[id]["features"]);

    let string = "";
    cart.map((item) => (string += `+${item.id}+`));
    setItemString(string);
  }, [cart]);
  // console.log("Packages: ", packages === {});

  return (
    <>
      <NotificationContainer />
      <TopBar />
      <Grid className={classes.mainContainer} container spacing={4}>
        <Grid item xs={12} sm={4} md={3}>
          <Box className="left-side">
            <Box className="iconContainer">
              <img
                className="icon"
                src={cart && cart[id]["main_icon"]}
                alt="main icon"
              />
            </Box>
            <Typography className="title">
              {cart && cart[id]["title"]}
            </Typography>
            <Box className="quantity-row">
              <Typography className="label">Quantity</Typography>
              <Box className="button-input">
                <button
                  className="minus-btn"
                  disabled={cart && cart[id]["quantity"] <= 1 ? true : false}
                  onClick={() =>
                    dispatch(updateQuantity({ index: id, operation: "minus" }))
                  }
                >
                  <img className="minus-icon" src={minus} alt="minus icon" />
                </button>
                <input
                  type="number"
                  min={1}
                  // defaultValue={item.quantity}
                  value={cart && cart[id]["quantity"]}
                  name="quantity"
                  className="quantity-input"
                />
                <button
                  className="plus-btn"
                  onClick={() =>
                    dispatch(updateQuantity({ index: id, operation: "add" }))
                  }
                >
                  <img className="plus-icon" src={plus} alt="plus icon" />
                </button>
              </Box>
            </Box>
            <Box className="row">
              <Typography className="title">View Bag </Typography>
              <img
                className="downArrowIcon"
                src={down_arrow}
                alt="down arrow"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          {cart &&
            [...Array(cart[id]["quantity"]).keys()].map((item, index) => {
              return (
                <Box className="right-side">
                  <Typography className="title">
                    Add Features For Item {index + 1}
                  </Typography>
                  <Box className="product-detail">
                    <Box className="item">
                      <input
                        className="checkbox"
                        type="checkbox"
                        name="detail1"
                        checked={
                          { ...packages[index] }?.hasOwnProperty("p1")
                            ? true
                            : false
                        }
                        onChange={() =>
                          handlePackages({ key: "p1", index, id: parseInt(id) })
                        }
                      />{" "}
                      <Typography>Package 1</Typography>
                    </Box>
                    <Box className="item">
                      <input
                        className="checkbox"
                        type="checkbox"
                        name="detail2"
                        checked={
                          { ...packages[index] }?.hasOwnProperty("p2")
                            ? true
                            : false
                        }
                        onChange={() =>
                          handlePackages({ key: "p2", index, id: parseInt(id) })
                        }
                      />{" "}
                      <Typography>Package 2</Typography>
                    </Box>
                    <Box className="item">
                      <input
                        className="checkbox"
                        type="checkbox"
                        name="detail3"
                        checked={
                          { ...packages[index] }?.hasOwnProperty("p3")
                            ? true
                            : false
                        }
                        onChange={() =>
                          handlePackages({ key: "p3", index, id: parseInt(id) })
                        }
                      />{" "}
                      <Typography>Package 3</Typography>
                    </Box>
                    <Box className="item">
                      <input
                        className="checkbox"
                        type="checkbox"
                        name="detail4"
                        checked={
                          { ...packages[index] }?.hasOwnProperty("p4")
                            ? true
                            : false
                        }
                        onChange={() =>
                          handlePackages({ key: "p4", index, id: parseInt(id) })
                        }
                      />{" "}
                      <Typography>Package 4</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          <Box className="btn-container">
            <Link to={`/dashboard/checkout`}>
              <button className="add-to-cart-btn">CheckOut</button>
            </Link>
          </Box>
        </Grid>
        <Typography className="main-title" item xs={12}>
          Do you also want to consider these options?
        </Typography>
        <Grid className="main-cards-container" container spacing={4}>
          {cardList.map((item, index) => {
            return (
              <Grid className="cardItem" item xs={12} sm={6} md={3} key={index}>
                <Box className="contentContainer">
                  <Typography className="title">{item.title}</Typography>
                  <img
                    className="mainIcon"
                    src={item.main_icon}
                    alt="main icon"
                  />
                  <Box className="subIconContainer">
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
                <Box className="cartButtonContainer">
                  <Box
                    className="cartButton"
                    onClick={() =>
                      dispatch(addToCart({ ...item, quantity: 1 }))
                    }
                  >
                    Add to cart
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default AddFeatures;

// const handlePackages = ({ key, index }) => {
//     console.log(index, key);
//     if (!{ ...packages[index] }.hasOwnProperty(key)) {
//         let pack = { ...packages[index], [key]: `package ${key}` };
//         let datapack = packages;
//         datapack[index] = pack;
//         console.log("Add Package F :", datapack)
//         setPackages(datapack);
//         dispatch(addProductFeatures(datapack))
//     }
//     // // setPackages([ { [key]: `package ${key}`, ...packages }])
//     // else {
//     //     let [...rest] = packages;
//     //     delete rest[key];
//     //     console.log("rest: ", rest)

//     //     setPackages(rest);
//     // }
//     console.log('Packages : ', packages);
// }

// // console.log('Packages : ', packages);
// // console.log('cart : ', cart);

// useEffect(() => {
//     if (cart[id]['features'])
//         setPackages(cart[id]['features']);
// }, [cart])
// // console.log("Packages: ", packages === {});

// const handleAddFeatures = (item) => {
//     dispatch(addToCart(item));
// }
