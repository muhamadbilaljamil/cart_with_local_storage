import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import google_icon from './images/google-icon.svg';

import card1 from './images/Major-Cards1.png';
import card2 from './images/Major-Cards2.png';
import card3 from './images/Major-Cards3.png';
import TopBar from './TopBar';



const useStyles = makeStyles((theme) => ({

    mainContainerWrapper: {
        maxWidth: '1020px',
        margin: ' 100px auto 0',

        '& .title': {
            fontSize: '35px',
            textAlign: 'center'
        },
    },

    mainContainer: {
        marginTop: '30px',

        '& .left-side': {
            marginTop: '80px',
            paddingRight: '12px',
            '& .row': {
                display: 'flex',
                gap: '10px',
            },

            '& .row1': {
                '& .text1': {
                    fontSize: '16px',
                    fontWeight: '800',
                },
                '& .text2': {
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '5px',
                    color: 'red',
                    background: 'orange',
                    borderRadius: '6px',
                }
            },


            '& .row2': {
                marginTop: '80px',
                '& .main-title': {
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#a09f9f',
                },
            },


            '& .row3': {
                '& .total-amount': {
                    fontSize: '40px',
                    fontWeight: '900',
                },
            },

            '& .invoice-container': {
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                minWidth: '350px',
                maxWidth: '400px',
                marginTop: '50px',
                marginLeft: '30px',

                '& .row4': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    '& .label': {
                        fontSize: '18px',
                        fontWeight: '700',
                    },
                    '& .amount': {
                        fontSize: '18px',
                        fontWeight: '700',

                    }
                },

                '& .row5': {
                    marginTop: '-35px',
                    '& .text1': {
                        fontSize: '14px',
                        color: '#a09f9f',
                    }

                },

            }

        },

        '& .right-side': {
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            maxWidth: '450px',
            margin: '0 auto',
            paddingLeft: '12px',

            '& .google-pay': {
                cursor: 'pointer',
                display: 'flex',
                padding: '12px 0',
                background: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '12px',
                borderRadius: '6px',

                '& .google-icon': {
                    width: '20px',
                },

                '& .google-pay-text': {
                    color: '#FFF',
                }
            },

            '& .divider': {
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& .text': {
                    position: 'relative',
                    zIndex: '1',
                    background: '#f4f4f7',
                    fontSize: '16px',
                    color: '#a09f9f',
                    padding: '2px 4px',
                    borderRadius: '3px',
                },
                '& .line': {
                    zIndex: '0',
                    position: 'absolute',
                    width: '100%',
                    height: '1.5px',
                    background: '#e2e2e2',

                }
            },

            '& .email': {
                display: 'flex',
                gap: '10px',
                background: '#e8e8e8',
                minHeight: '50px',
                borderRadius: '8px',
                border: '1px solid #d1d1d1',
                alignItems: 'center',
                padding: '0 20px',
                '& .google-pay-text': {
                    color: '#00000091',
                },
                '& .email-input': {
                    width: '100%',
                    padding: '4px',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    color: '#00000091',
                }
            },

            '& .card-info-block': {
                '& .label': {},
                '& .card-info': {
                    border: '1px solid #d1d1d1',
                    borderRadius: '6px',
                    '& .row1': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: '40px',
                        borderBottom: '1px solid #d1d1d1',
                        // background: '#e8e8e8',

                        '& .card-input': {
                            fontSize: '14px',
                            color: '#00000091',
                            width: '100%',
                            padding: '2px 10px',
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                        },
                        '& .card-images': {
                            minWidth: '120px',
                            display: 'flex',
                            marginRight: '6px',
                            gap: '6px',

                            '& .image1': {
                                width: '35px',
                                borderRadius: '4px',
                            },
                            '& .image2': {
                                width: '35px',
                                borderRadius: '4px',

                            },
                            '& .image3': {
                                width: '35px',
                                borderRadius: '4px',
                            },
                        },
                    },
                    '& .row2': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: '40px',
                        // background: '#e8e8e8',

                        '& .date': {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            minWidth: '50%',
                            minHeight: '40px',
                            '& .input': {
                                fontSize: '14px',
                                color: '#00000091',
                                minWidth: '100%',
                                padding: '2px 10px',
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                            },
                        },

                        '& .card-code': {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderLeft: '1px solid #d1d1d1',
                            minWidth: '50%',
                            minHeight: '40px',
                            '& .input': {
                                fontSize: '14px',
                                color: '#00000091',
                                minWidth: '100%',
                                padding: '2px 10px',
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',

                            },
                        },
                    },

                }
            },

            '& .card-holder': {
                '& .label': {},
                '& .card-holder-input': {
                    minHeight: '45px',
                    width: '100%',
                    padding: '10px',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    color: '#00000091',
                    border: '1px solid #d1d1d1',
                    borderRadius: '6px',
                },

            },


            '& .country': {
                '& .label': {},
                '& .country-list': {
                    minHeight: '45px',
                    width: '100%',
                    padding: '10px',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    color: '#00000091',
                    border: '1px solid #d1d1d1',
                    borderRadius: '6px',
                },
            },

            '& .pay-button': {
                cursor: 'pointer',
                marginTop: '30px',
                display: 'flex',
                padding: '12px 0',
                background: '#d9d9d9',
                color: '#FFF',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '12px',
                borderRadius: '6px',
            }

        }
    },

}));



const Payment = () => {
    const { cart } = useSelector(({ cart }) => cart);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let subtotal = 0
        cart.map((item, index) => {
            subtotal += (item['quantity'] * item['price'])

        })
        setTotal(subtotal)
    }, []);

    const classes = useStyles();
    return (
        <>
            <NotificationContainer />
            <TopBar />
            <Box className={classes.mainContainerWrapper}>
                <Box item xs={12} sm={6}  >
                    <Typography className='title'>Checkout</Typography>
                </Box>

                <Grid className={classes.mainContainer} container spacing={4} >
                    <Grid item xs={12} sm={6}  >
                        <Box className='left-side'>
                            <Box className='row row1'>
                                <Box className='icon1'>Icon1</Box>
                                <Box className='icon2'>Icon2</Box>
                                <Typography className='text1'>Veter.dev.alt.team</Typography>
                                <Typography className='text2'>TEST MODE</Typography>
                            </Box>
                            <Box className='row row2'>
                                <Typography className='main-title'>Pay veter.dev.alt.team</Typography>
                            </Box>
                            <Box className='row row3'>
                                <Typography className='total-amount'>${total}</Typography>
                            </Box>
                            <Box className='invoice-container'>
                                {
                                    cart.map((item, index) => {
                                        return <Box className='row row4'>
                                            <Typography className='label'>{item.title} x {item.quantity}</Typography>
                                            <Typography className='amount'>${item.quantity * item.price}</Typography>
                                        </Box>
                                    })

                                }


                                {/* <Box className='row row4'>
                                    <Typography className='label'>T-shirt, Color: Blue(Medium)</Typography>
                                    <Typography className='amount'>$21.87</Typography>
                                </Box>
                                <Box className='row row4'>
                                    <Typography className='label'>PAYMENT SURCHARGE</Typography>
                                    <Typography className='amount'>$2.50</Typography>
                                </Box> */}
                                <Box className='row row5'>
                                    <Typography className='text1'>Payment surcharge</Typography>
                                </Box>

                            </Box>

                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Box className='right-side'>
                            <Box className='google-pay'>
                                <img className='google-icon' src={google_icon} alt="Google icon" />
                                <Typography className='google-pay-text'>Pay</Typography>
                            </Box>

                            <Box className='divider'>
                                <Typography className='text'>Or pay with card</Typography>
                                <Box className='line'></Box>
                            </Box>

                            <Box className='email'>
                                <Typography className='google-pay-text'>Email</Typography>
                                <input className='email-input' type='email' name='email' placeholder='veteraltteam@gmail.com' disabled />
                            </Box>

                            <Box className='card-info-block'>
                                <Typography className='label'> Card information</Typography>
                                <Box className='card-info'>
                                    <Box className='row1'>
                                        <input className='card-input' type='text' name='number' placeholder='1234 1234 1234 1234' />
                                        <Box className='card-images'>
                                            <img className='image1' src={card1} alt='card1 logo' />
                                            <img className='image2' src={card2} alt='card2 logo' />
                                            <img className='image3' src={card3} alt='card3 logo' />
                                        </Box>
                                    </Box>
                                    <Box className='row2'>
                                        <Box className='date'>
                                            <input className='input' type='text' name='date' placeholder='MM / YY' />
                                        </Box>
                                        <Box className='card-code'>
                                            <input className='input' type='text' name='date' placeholder='CVC' />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>



                            <Box className='card-holder'>
                                <Typography className='label'>Name on Card</Typography>
                                <input className='card-holder-input' type='text' name='card_name' placeholder='Enter card holder name' />
                            </Box>

                            <Box className='country'>
                                <Typography className='label'>Country or region</Typography>
                                <select className='country-list'>
                                    <option value="">Select your country</option>
                                    <option value="usa">USA</option>
                                    <option value="russia">Russia</option>
                                    <option value="canada">Canada</option>
                                </select>
                            </Box>

                            <Box className='pay-button'> <Typography className='button-text'>Pay ${total}</Typography></Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>




    );
}

export default Payment;