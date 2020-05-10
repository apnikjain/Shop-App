export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';
import Product from '../../models/product'


export const fetchData = () =>{
	return async (dispatch, getState) =>{
			const userId = getState().auth.userId 
			const response = await fetch('https://shopapp-a41be.firebaseio.com/products.json')
			const resData = await response.json()
			const loadedData = []
			
			if(!response.ok){
				throw new Error('somthing went wrong')
			}

			for (const key in resData){
				loadedData.push(
					new Product(
						key,
						resData[key].ownerId,
						resData[key].title,
						resData[key].imageUrl,
						resData[key].description,
						resData[key].price
						)
					)
			}
			

			dispatch({type:SET_PRODUCT,products:loadedData, userProducts:loadedData.filter(prod => prod.ownerId === userId)})
		
	}


}

export const deleteProduct = productId => {

	return async (dispatch, getState) =>{
		const token = getState().auth.token

		const response = await fetch(`https://shopapp-a41be.firebaseio.com/products/${productId}.json?auth=${token}`,{
			method:'DELETE'
		})

		if(!response.ok){
			throw new Error('somthing went wrong')
		}

 		dispatch( { type: DELETE_PRODUCT, pid: productId });

	}
};


export const createProduct = (imageUrl,title,description,price) =>{
	
	return async (dispatch,getState) => {
		// any async code you want !
		const token = getState().auth.token
		const userId = getState().auth.userId
		const response = await fetch(`https://shopapp-a41be.firebaseio.com/products.json?auth=${token}`,{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				title,
				description,
				imageUrl,
				price,
				ownerId:userId
			})
		})

		if(!response.ok){
			const resData = await response.json()
			const msg = resData.error
			throw new Error(msg)
		}
		const resData = await response.json()

	dispatch({type:CREATE_PRODUCT,
		productData:{
				id:resData.name,
				imageUrl,
				title,
				description,
				price

			},ownerId:userId}	)
	}
	
}


export const updateProduct = (id,imageUrl,title,description) =>{
	
	return async (dispatch, getState)  =>{
		const token = getState().auth.token
		
		const response = await fetch(`https://shopapp-a41be.firebaseio.com/products/${id}.json?auth=${token}`,{
			method:'PATCH',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				title,
				description,
				imageUrl
				
			})
		})
		if(!response.ok){
			throw new Error('somthing went wrong')
		}

	dispatch({type:UPDATE_PRODUCT,pid:id,productData:{
				imageUrl,
				title,
				description
				}})
}
}