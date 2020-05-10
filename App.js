import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Reduxthunk from 'redux-thunk'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ordersReducer from './store/reducers/orders';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ShopNavigator from './navigation/ShopNavigator';
import AuthReducer from './store/reducers/Auth'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders:ordersReducer,
  auth:AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(Reduxthunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
