import Order from '../../models/order'


export const ADD_ORDERS = "ADD_ORDERS"
export const SET_ORDERS = 'SET_ORDERS'


export const addOrder = (cartItems,totalAmount) =>{
	return async (dispatch, getState) => {
		const date = new Date()
		const token = getState().auth.token
		const userId = getState().auth.userId
		const response = await fetch(`https://shopapp-a41be.firebaseio.com/orders/${userId}.json?auth=${token}`,{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				cartItems,
				totalAmount,
				date:date.toISOString()
				
			})
		})

		const resData = await response.json()
	dispatch({type :ADD_ORDERS,orderData: {id:resData.name,items:cartItems, totalAmount:totalAmount, date:date }})
	}
}


export const fetchData = () =>{
	return async (dispatch,getState) =>{
		const userId = getState().auth.userId
		const response = await fetch(`https://shopapp-a41be.firebaseio.com/orders/${userId}.json`)
		const resData = await response.json()
		
		const loaded = []
		for(const key in resData){
			loaded.push(new Order(
				key,
				resData[key].cartItems,
				resData[key].totalAmount,
				new Date(resData[key].date)
				))
		}	
		
	dispatch({type:SET_ORDERS, data:loaded})
}
}