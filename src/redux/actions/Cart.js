import {
  ADD_TO_CART,
  ADD_PRODUCT_FEATURES,
  LOCAL_CART,
  UPDATE_CART,
  UPDATE_QUANTITY,
  DELETE_FROM_CART,
} from "../constants";

export const addToCart = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
  };
};

export const updateQuantity = (item) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: item,
    });
  };
};

export const addProductFeatures = (item) => {
  console.log("Action in action: ", item);
  return (dispatch) => {
    dispatch({
      type: ADD_PRODUCT_FEATURES,
      payload: item,
    });
  };
};

export const deleteProduct = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_FROM_CART,
      payload: item,
    });
  };
};

export const localCart = (items) => {
  return (dispatch) => {
    dispatch({
      type: LOCAL_CART,
      payload: items,
    });
  };
};
