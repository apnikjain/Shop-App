import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCT } from '../actions/products';
import Product from '../../models/product'

const initialState = {
    availableProducts: [],
    userProducts: []
};

export default (state = initialState, action) => {
   switch (action.type) {
    case SET_PRODUCT:
      return {
        availableProducts:action.products,
        userProducts:action.userProducts
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
            product => product.id !== action.pid
          ),
      };
    case CREATE_PRODUCT:
      const newProduct = new  Product(action.id,action.userId,action.productData.title,action.productData.imageUrl,action.productData.description,action.productData.price)
      return{
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      }
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(x => x.id === action.pid)
      const updatedProduct = new Product(action.pid,state.userProducts[productIndex].ownerId,action.productData.title,action.productData.imageUrl,action.productData.description,state.userProducts[productIndex].price)
      const updatedUserProduct = [...state.userProducts]
      updatedUserProduct[productIndex] = updatedProduct
      const productIndexx = state.availableProducts.findIndex(x => x.id === action.pid)
      const updatedAvailableProduct = [...state.availableProducts]
      updatedAvailableProduct[productIndexx] = updatedProduct
      return{
        ...state,
        userProducts:updatedUserProduct,
        availableProducts:updatedAvailableProduct
      }
  }
   return state;
};