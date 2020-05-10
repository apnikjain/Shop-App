import {ADD_ORDERS, SET_ORDERS} from '../actions/orders'
import Order from '../../models/order'


const initialState = {
	orders:[]
}

export default (state = initialState,action) =>{
	switch(action.type){
			case (SET_ORDERS):
			
			return {
				orders:action.data
			}
			case(ADD_ORDERS):
			const newOrder = new Order(action.orderData.id,action.orderData.items,action.orderData.totalAmount, action.orderData.date )
			return{
				...state,
				orders:state.orders.concat(newOrder)
			}}
	return state
}