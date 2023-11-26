import React, { useState } from 'react';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import bitcoin_icon from './images/bitcoin-logo.svg';
import solana_icon from './images/solana-logo.svg';
import plus from './images/plus-q.svg';
import minus from './images/minus1.svg';
import down_arrow from './images/arrow-down.svg';


const useStyles = makeStyles((theme) => ({

    mainContainer: {
        // border: '1px solid #dadada',
        maxWidth: '90%',
        margin: ' 100px auto 0',

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
                width: '300px',
                height: '190px',
                border: '1px solid #dadada',
                '& .icon': {
                    width: '120px',
                }
            },

            '& .title': {
                fontSize: '34px',

            }

        },

        '& .right-side': {
            // borderLeft: '1px solid #dadada',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',

            '& .title': {
                fontSize: '24px',
                color: '#9b9595',
            },

            '& .quantity-row': {
                display: 'flex',
                alignItems: 'center',
                columnGap: '20px',
                // marginTop: '20px',

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
                        }
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


                }
            },

            '& .product-detail': {
                border: '1px solid #dadada',
                padding: '60px',
                borderRadius: '3px',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '20px',

                '& .item': {
                    display: 'flex',
                    margin: '0 auto',
                    width: '100%',
                    alignItems: 'center',
                    padding: '12px 20px',
                    minHeight: '60px',
                    maxWidth: '90%',
                    minWidth: '350px',
                    border: '1px solid #c8c8c8',
                    borderRadius: '3px',

                    '& .checkbox': {
                        width: '25px',
                        height: '25px',
                        border: '1px solid #c8c8c8',
                    }
                },

                '& .item.detail': {
                    alignItems: 'start',
                    justifyContent: 'end',
                    maxWidth: '100%',
                    border: 'none',
                    minHeight: '95px',
                    background: '#ededed',
                    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.3)',

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
            },

            '& .confirm-section-btn': {
                cursor: 'pointer',
                margin: '0 auto',
                minHeight: '50px',
                minWidth: '370px',
                background: '#d9d9d9',
                border: 'none',
                color: '#000',
                fontWeight: '400',
            }
        }

    },

}));


const cardList = [
    {
        title: 'Bitcoin',
        main_icon: bitcoin_icon,
        sub_icon: plus
    },
    {
        title: 'Solana',
        main_icon: solana_icon,
        sub_icon: plus
    },
    {
        title: 'Bitcoin',
        main_icon: bitcoin_icon,
        sub_icon: plus
    },
    {
        title: 'Solana',
        main_icon: solana_icon,
        sub_icon: plus
    },
]


const Checkout2 = () => {


    const [quantity, setQuantity] = useState(1)

    const classes = useStyles();
    return (


        <Grid className={classes.mainContainer} container spacing={4} >

            <Grid item xs={12} sm={4} md={3} >
                <Box className='left-side'>
                    <Box className='iconContainer'>
                        <img className="icon" src={bitcoin_icon} alt="main icon" />
                    </Box>
                    <Typography className='title'>Bitcoin</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9} >
                <Box className='right-side'>
                    <Typography className='title'>Checkout</Typography>
                    <Box className='quantity-row'>
                        <Typography className='label'>Quantity</Typography>
                        <Box className='button-input'>
                            <button className='minus-btn' disabled={quantity <= 1 ? true : false} onClick={() => setQuantity(quantity - 1)}> <img className='minus-icon' src={minus} alt="minus icon" /> </button>
                            <input type='number' min={1} defaultValue={quantity} value={quantity} name='quantity' className='quantity-input' />
                            <button className='plus-btn' onClick={() => setQuantity(quantity + 1)} > <img className='plus-icon' src={plus} alt="plus icon" /> </button>
                        </Box>
                    </Box>
                    <Box className='product-detail'>
                        <Box className='item detail title'>
                            Product
                        </Box>
                        <Box className='item detail'>
                            Edit
                        </Box>
                        <Box className='item detail'>
                            <img className='down-arrow-icon' src={down_arrow} alt="down arrow icon" />
                        </Box>



                        <Box className='item'>
                            <input className='checkbox' type="checkbox" />
                        </Box>
                        <Box className='item'>
                            <input className='checkbox' type="checkbox" />
                        </Box>
                        <Box className='item'>
                            <input className='checkbox' type="checkbox" />
                        </Box>
                        <Box className='item'>
                            <input className='checkbox' type="checkbox" />
                        </Box>




                        <Box className='item detail'>
                            Edit
                        </Box>
                        <Box className='item detail'>
                            Edit
                        </Box>


                    </Box>
                    <button className='confirm-section-btn'>Confirm Selection</button>
                </Box>
            </Grid>
        </Grid>


    );
}

export default Checkout2;