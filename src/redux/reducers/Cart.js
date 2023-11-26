import _ from "lodash";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { NotificationManager } from "react-notifications";

import {
  ADD_TO_CART,
  UPDATE_QUANTITY,
  LOCAL_CART,
  ADD_PRODUCT_FEATURES,
  DELETE_FROM_CART,
} from "../constants/";

const INIT_STATE = {
  cart: [],
};

export default (state = INIT_STATE, action) => {
  // console.log("Local storage: ", state);
  const [_, setCart] = useLocalStorage("cart");
  switch (action.type) {
    case ADD_TO_CART: {
      const new_item = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === new_item.id
      );

      if (existingItemIndex !== -1) {
        // If item already exists, update quantity
        const updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        NotificationManager.success("Product is added to cart");
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If item doesn't exist, add it to the cart
        NotificationManager.success("Product is added to cart");
        return {
          ...state,
          cart: [...state.cart, { ...new_item, quantity: 1 }],
        };
      }
    }

    // case ADD_TO_CART: {
    //   const new_item = action.payload;
    //   let newdata = state.cart;

    //   const isIncluded = newdata?.filter((item, index) =>
    //     item.id == new_item.id ? newdata[index]["quantity"]++ : ""
    //   );
    //   if (isIncluded.length == 0) newdata = newdata.push(new_item);
    //   NotificationManager.success("Product is added to cart");
    //   return {
    //     ...state,
    //     cart: [...newdata],
    //   };
    // }

    case LOCAL_CART: {
      return {
        ...state,
        cart: [...action.payload, ...state.cart],
      };
    }

    case UPDATE_QUANTITY: {
      const { index, operation } = action.payload;
      if (operation === "add") {
        state.cart[index]["quantity"] += 1;
        NotificationManager.success("One item increased", "", 2000);
        // if(state.cart[index]['features']){
        //   state.cart[index]['features'].push({p1: 'package p1'});
        // }else
        // state.cart[index]['features'] = {p1: 'package p1'};
      } else {
        state.cart[index]["quantity"] -= 1;
        if (state.cart[index]["features"]) state.cart[index]["features"].pop();
        NotificationManager.error("One item  removed", "", 2000);
      }

      return {
        ...state,
        cart: [...state.cart],
      };
    }

    case ADD_PRODUCT_FEATURES: {
      const { key, index, id } = action.payload;
      const item = state.cart[id];
      let new_data = [...state.cart];
      // console.log();
      // console.log('Item in cart: ', new_data);
      if (!item.hasOwnProperty("features")) {
        // console.log('if is running', action.payload);
        item["features"] = [{ [key]: `package ${key}` }];
        new_data[id] = item;
        NotificationManager.success("Features Added", "", 2000);
      } else if (item["features"].length > index) {
        let feature = item["features"][index];
        if (!feature.hasOwnProperty(key)) {
          item["features"][index] = { ...feature, [key]: `package ${key}` };
          new_data[id] = item;
          NotificationManager.success("One feature increased", "", 2000);
        } else {
          delete feature[key];
          item["features"][index] = feature;
          NotificationManager.error("One Feature removed", "", 2000);
          if (
            _.isEmpty(item["features"][index]) &&
            item["features"].length === 1
          ) {
            delete item["features"];
            NotificationManager.error("Features removed", "", 2000);
          }
          new_data[id] = item;
        }
      } else if (item["features"].length === index) {
        // console.log('This part is working lengtt == index');
        item["features"].push({ [key]: `package ${key}` });
        new_data[id] = item;
        NotificationManager.success("Features Added", "", 2000);
      }

      return {
        ...state,
        cart: [...new_data],
      };
    }

    case DELETE_FROM_CART: {
      const { indx } = action.payload;
      let newItems = state["cart"].filter((item, index) => index !== indx);
      NotificationManager.error("Product  removed", "", 2000);
      if (newItems.length === 0) {
        setCart(newItems);
        console.log("new Items: ", newItems);
      }
      return {
        ...state,
        cart: [...newItems],
      };
    }

    default:
      return state;
  }
};
