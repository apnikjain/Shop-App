import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import {View, Platform, SafeAreaView, Button } from 'react-native';
import OrdersScreen from '../screens/shop/OrdersScreen'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer'
import {Ionicons} from "@expo/vector-icons"
import React from 'react'
import UserProducts from '../screens/user/UserProductsScreen'
import EditScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartScreen from '../screens/user/StartupScreen'
import * as authActions from '../store/actions/Auth'
import {useDispatch} from 'react-redux'


const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
  navigationOptions:{
    drawerIcon: drawerConfig => <Ionicons name = {Platform.OS === 'android'?'md-list':'ios-list'} size = {23} color = {drawerConfig.tintColor}/>
  }
},
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold'
      },
      headerBackTitleStyle: {
        fontFamily: 'open-sans'
      }
      
    }
  }
);

const OrderNavigator = createStackNavigator({
  orders : OrdersScreen
},
{
  navigationOptions:{
    drawerIcon: drawerConfig => <Ionicons name = {Platform.OS === 'android'?'md-cart':'ios-cart'} size = {23} color = {drawerConfig.tintColor}/>
  }
},
{
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold'
      },
      headerBackTitleStyle: {
        fontFamily: 'open-sans'
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  },
)



const productsNavigator = createStackNavigator({
  userPorducts : UserProducts,
  editScreen: EditScreen
},
{
  navigationOptions:{
    drawerIcon: drawerConfig => <Ionicons name = {Platform.OS === 'android'?'md-create':'ios-create'} size = {23} color = {drawerConfig.tintColor}/>
  }
},
{
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold'
      },
      headerBackTitleStyle: {
        fontFamily: 'open-sans'
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  },
)

const mainNavigator = createDrawerNavigator({
  Cart: ProductsNavigator,
  Orders:OrderNavigator,
  Admin: productsNavigator
},
{
  contentOptions:{
    activeTintColor:Colors.primary 
  },
  contentComponent :props =>{
    const dispatch = useDispatch()
    return(
      <View style = {{flex:1, padding:20}}>
        <SafeAreaView forceInset = {{top:'always',horizontal:'never'}}>
            <DrawerNavigatorItems {...props}/>
            <Button title = 'Logout' onPress = {()=>{
              dispatch(authActions.Logout())
              props.navigation.navigate('auth');
            }}/> 
        </SafeAreaView>
      </View>
      )
  }
  
})

const MAINNAVIGATOR = createSwitchNavigator({
  start:StartScreen,
  auth:AuthScreen,
  main:mainNavigator
})

export default createAppContainer(MAINNAVIGATOR);
