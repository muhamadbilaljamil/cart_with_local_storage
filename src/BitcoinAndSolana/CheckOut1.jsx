import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, deleteProduct, addToCart, addProductFeatures } from 'redux/actions/Cart';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import bitcoin_icon from './images/bitcoin-logo.svg';
import solana_icon from './images/solana-logo.svg';
import plus from './images/plus-q.svg';
import minus from './images/minus1.svg';
import TopBar from './TopBar';
import delete_icon from './images/delete.svg';
import { update } from 'lodash';
import Checkout2 from './CheckOut2';
import AddFeatures from './AddFeatures';
import down_arrow from './images/arrow-down.svg';
import Loading from './Loading';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  mainCheckoutWrapper: {
    background: '#FFFFFF',
    // border: '1px solid #dadada',
    marginTop: '20px',
    maxWidth: '1150px',
    width: '100%',
    margin: '0 auto',
    '& .main_title': {
      borderBottom: '1px solid #dadada',
      padding: '12px 20px',
      background: "#FFFFFF",
      width: '100%',
      '& .text': {
        fontSize: '25px',
        fontWeight: '700',
        textAlign: 'center',
      }
    },


    '& .main_container': {
      maxWidth: '95%',
      borderBottom: '1px solid #dadada',
      margin: '25px',
      padding: '20px',

      '& .left-side': {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        alignItems: 'center',

        '& .iconContainer': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '3px',
          maxWidth: '220px',
          width: '100%',
          height: '160px',
          border: '1px solid #dadada',
          '& .icon': {
            width: '120px',
          },
        },

        '& .title': {
          fontSize: '26px',
        },
      },

      '& .right-side': {
        minHeight: '210px',
        // borderLeft: '1px solid #dadada',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        rowGap: '20px',

        '& .title': {
          fontSize: '24px',
          color: '#9b9595',
        },

        '& .quantity-row': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          columnGap: '20px',
          // marginTop: '20px',
          '& .quantity_block': {
            display: 'flex',
            alignItems: 'center',
            columnGap: '20px',
            '& .label': {
              fontSize: '12px',
            },

            '& .button-input': {
              display: 'flex',
              alignItems: 'center',
              border: '0.1px solid #9b9595',
              borderRadius: '2px',
              overflow: 'hidden',

              '& .minus-btn': {
                cursor: 'pointer',
                border: 'none',
                width: '35px',
                height: '30px',

                '& .minus-icon': {
                  width: '20px',
                },
              },

              '& .quantity-input': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                border: 'none',
                outline: 'none',
                width: '45px',
                height: '30px',

                '&::-webkit-inner-spin-button': {
                  appearance: 'none',
                  margin: 0,
                },
              },

              '& .plus-btn': {
                cursor: 'pointer',
                border: 'none',
                width: '35px',
                height: '30px',

                '& .plus-icon': {
                  width: '20px',
                },
              },
            },
          },
          '& .delete_icon': {
            cursor: 'pointer',
            background: "#fcfafa",
            padding: '8px',
            borderRadius: '3px',
            transition: 'all 0.5s',
            '&:hover': {
              transform: 'scale(1.1)',
              background: '#f4f4f4',
            },
            '& .icon': {
              width: '30px',
            }
          },


        },

        '& .product-detail': {
          border: '1px solid #dadada',
          padding: '20px',
          borderRadius: '3px',
          display: 'flex',
          flexDirection: 'column',
          // rowGap: '20px',

          '& .product-feature': {
            overflow: 'hidden',
            position: 'relative',

            '& .item.detail': {
              position: 'relative',
              zIndex: 1,
              padding: '10px 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '100%',
              border: 'none',
              minHeight: '70px',
              borderRadius: '6px',
              background: '#ededed',
              boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.3)',

              '& .tags-container': {
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                // maxWidth: '500px',
                width: '100%',

                '& .packages-tag': {
                  padding: '6px 21px 9px',
                  background: '#d9d9d9',
                  borderRadius: '25px',
                }
              },

              '& .down-arrow-icon': {
                width: '20px',
              }
            },

            '& .item.detail.title': {
              alignItems: 'start',
              justifyContent: 'start',
              fontSize: '14px',
              color: '#000',
            },

            '& .packages-check-list': {
              position: 'relative',
              zIndex: 0,
              height: '0',
              transform: 'translateY(-100%)',
              transition: 'all 0.5s',

              '&.active': {
                height: 'max-content',
                transform: 'translateY(0)',
              },

              '& .item': {
                marginTop: '12px',
                display: 'flex',
                margin: '0 auto',
                width: '100%',
                alignItems: 'center',
                padding: '12px 20px',
                minHeight: '60px',
                maxWidth: '95%',
                minWidth: '350px',
                border: '1px solid #c8c8c8',
                borderRadius: '3px',

                '& .checkbox': {
                  marginRight: '12px',
                  width: '25px',
                  height: '25px',
                  border: '1px solid #c8c8c8',
                }
              },

            },

          },

        },

        '& .btns-container': {

          display: 'flex',
          justifyContent: 'end',
          columnGap: '22px',

          '& .btn-container': {
            textAlign: 'right',

            '& .add-feature-btn': {
              cursor: 'pointer',
              margin: '0 auto',
              minHeight: '50px',
              minWidth: '270px',
              background: '#d9d9d9',
              border: 'none',
              color: '#FFFFFF',
              fontWeight: '700',
            },
          },
        },
      },
    },
  }

}));


const Checkout1 = () => {
  const { cart } = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();
  const [checkout, setCheckout] = useState(false);

  const handlePackages = (item) => {
    // console.log('Package Item', item);
    dispatch(addProductFeatures(item))
  }


  // useEffect(() => {

  // }, [cart])

  const handleCheckout = () => {
    setCheckout(true)
    const cartdata = cart.map((item) => { return { title: item.title, price: item.price, quantity: item.quantity } })
    const base_url = 'http://localhost:4242'
    axios
      .post(`${base_url}/create-checkout-session`, {
        cartItems: cartdata,
        userId: "user_1248",
      })
      .then((response) => {
        setCheckout(false);
        console.log("Front side: ", response);
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => {
        console.log(err.message);
        setCheckout(false);
      });
  };

  const classes = useStyles();
  return (
    <>
      {checkout && <Loading />}
      <NotificationContainer />
      <TopBar />
      <Box className={classes.mainCheckoutWrapper}>
        <Box className='main_title'>
          <Typography className="text">Checkout</Typography>
        </Box>


        {
          (cart.length == 0) ? <Box className="empty_cart">
            <Typography>Cart is Empty</Typography>
          </Box>
            : cart.map((item, index) => {
              return <Grid className="main_container" container spacing={4}>
                <Grid item xs={12} sm={4} md={3}>
                  <Box className="left-side">
                    <Box className="iconContainer">
                      <img className="icon" src={item.main_icon} alt="main icon" />
                    </Box>
                    <Typography className="title">{item.title}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box className="right-side">
                    <Box className="quantity-row">
                      <Box className='quantity_block'>

                        <Typography className="label">Quantity</Typography>
                        <Box className="button-input">
                          <button
                            className="minus-btn"
                            disabled={item.quantity <= 1 ? true : false}
                            onClick={() => dispatch(updateQuantity({ index, operation: "minus" }))}>
                            <img className="minus-icon" src={minus} alt="minus icon" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            // defaultValue={item.quantity}
                            value={item.quantity}
                            name="quantity"
                            className="quantity-input"
                          />
                          <button className="plus-btn" onClick={() => dispatch(updateQuantity({ index, operation: "add" }))}>
                            <img className="plus-icon" src={plus} alt="plus icon" />
                          </button>
                        </Box>
                      </Box>

                      <Box className='delete_icon' onClick={() => dispatch(deleteProduct({ indx: index }))}><img className="icon" src={delete_icon} alt='delete icon' /></Box>
                    </Box>
                    <Box className='product-detail'>
                      {
                        [...Array(cart[index]['quantity']).keys()].map((it, indx) => {
                          let packdata = [];
                          const packs = item['features'] && item['features'][indx]
                          if (packs)
                            packdata = Object.values(packs);
                          // console.log("Item: ", item, indx, index)
                          return item['features'] &&
                            <Box className='product-feature'>
                              <Box className='item detail'>
                                <Box className='tags-container'>
                                  {
                                    packdata.map((item, index) => {
                                      return <Box className='packages-tag'>
                                        <Typography className='text'>{item}</Typography>
                                      </Box>
                                    })
                                  }
                                </Box>
                                <img className='down-arrow-icon' src={down_arrow} alt="down arrow icon" onClick={() => {
                                  const addToggle = document.getElementById(`package${index}${indx}`);
                                  addToggle.classList.toggle('active');
                                  console.log("Toggle Button", addToggle);
                                }} />
                              </Box>
                              <Box className='packages-check-list' id={`package${index}${indx}`}>
                                <Box className='item'>
                                  <input className='checkbox' type="checkbox" name="detail1" checked={{ ...item['features'][indx] }?.hasOwnProperty('p1') ? true : false} onChange={() => handlePackages({ key: 'p1', index: indx, id: index })} /> <Typography>Package 1</Typography>
                                </Box>
                                <Box className='item'>
                                  <input className='checkbox' type="checkbox" name="detail2" checked={{ ...item['features'][indx] }?.hasOwnProperty('p2') ? true : false} onChange={() => handlePackages({ key: 'p2', index: indx, id: index })} /> <Typography>Package 2</Typography>
                                </Box>
                                <Box className='item'>
                                  <input className='checkbox' type="checkbox" name="detail3" checked={{ ...item['features'][indx] }?.hasOwnProperty('p3') ? true : false} onChange={() => handlePackages({ key: 'p3', index: indx, id: index })} /> <Typography>Package 3</Typography>
                                </Box>
                                <Box className='item'>
                                  <input className='checkbox' type="checkbox" name="detail4" checked={{ ...item['features'][indx] }?.hasOwnProperty('p4') ? true : false} onChange={() => handlePackages({ key: 'p4', index: indx, id: index })} /> <Typography>Package 4</Typography>
                                </Box>
                              </Box>
                            </Box>
                        })
                      }
                    </Box>
                    <Box className='btns-container'>
                      <Link to={`/dashboard/add_product_features?id=${index}`} className="btn-container" >
                        <button className="add-feature-btn">Add Features</button>
                      </Link>
                      <Box className="btn-container" >
                        <button onClick={() => handleCheckout()} className="add-feature-btn">Payment</button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            })
        }
      </Box>
    </>
  );
};

export default Checkout1;
