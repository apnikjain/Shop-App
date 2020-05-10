import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
import {ADD_ORDERS} from '../actions/orders';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid]
      const crntQuantity = selectedCartItem.quantity
      let updateCartItem
      if(crntQuantity>1){
        updateCartItem = new CartItem(
          selectedCartItem.quantity-1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum-selectedCartItem.productPrice
          )
        return{
          ...state,
          items:{...state.items,[action.pid]:updateCartItem},
          totalAmount:state.totalAmount-selectedCartItem.productPrice
        }

      }
      else{
        updatedCartItem = {...state.items}
        delete updatedCartItem[action.pid]
        return{
          ...state,
          items:updatedCartItem,
          totalAmount:state.totalAmount-selectedCartItem.productPrice
        }      }

    case ADD_ORDERS:
    	return initialState
  }

  return state;
};
