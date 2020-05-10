import React , {useEffect}from 'react'
import {View, FlatList,Text} from 'react-native'
import {useSelector, useDispatch } from 'react-redux'
import {HeaderButtons,Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrdersItem'
import * as ordersAction from '../../store/actions/orders'

const OrdersScreen = props => {
	const orders = useSelector(state => state.orders.orders)
	const dispatch = useDispatch()
	useEffect(()=>{
		dispatch(ordersAction.fetchData())
	}, [dispatch])
	
	return (<FlatList 
		data = {orders} 
		renderItem = {itemData =>
			<OrderItem 
				amount = {itemData.item.totalAmount} 
				date = {itemData.item.readableDate}
				items = {itemData.item.items}/> 
		}
		/>)
}	

OrdersScreen.navigationOptions = navData =>{
	return{
		title:'Your Orders ',
		headerLeft: ()=>
			<HeaderButtons HeaderButtonComponent = {HeaderButton}>
				<Item title = 'Menu' iconName = 'ios-menu' onPress = {() =>{navData.navigation.toggleDrawer()}}/>
			</HeaderButtons>
	}
}



export default OrdersScreen