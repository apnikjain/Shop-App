import {AsyncStorage} from 'react-native'
 
export const LOGOUT = 'LOGOUT'
export const SET_AUTH_SIGNUP = "SET_AUTH_SIGNUP"
export const SET_AUTH_LOGIN = 'SET_AUTH_LOGIN'
 
export const Logout = () =>{
	return {type:LOGOUT}
}

export const signUp = (email,password) =>{
	return async dispatch => {

		const response  = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQikItzMrz3Fb6MmoOHbDzoGf6A1ZNIpA ",{
			method :'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				email,
				password,
				returnSecureToken:true
			})
		})

		if(!response.ok){
			const errorResData = await response.json()
			const errId = errorResData.error.message
			let message = 'Somthing went wrong'
			if(errId ==='EMAIL_EXISTS'){
				message = 'This email could not be found'
			}
			else if(errId === 'WEAK_PASSWORD'){
				message = ' Password should be at least 6 characters'
			}
			throw new Error(message)
		}
		const resData = await response.json()
		dispatch({type:SET_AUTH_SIGNUP,token:resData.idToken,userId:resData.localId})

		dispatch({type:SET_AUTH_LOGIN,token:resData.idToken,userId:resData.localId})
		const expirationDate = new Date().getTime() + parseInt(resData.expiresIn)*1000 
		saveDataToStorage(resData.idToken,resData.localId, expirationDate)

	}
}

export const Login = (email,password) =>{
	return async dispatch => {
		
		const response  = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQikItzMrz3Fb6MmoOHbDzoGf6A1ZNIpA ",{
			method :'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				email,
				password,
				returnSecureToken:true
			})
			})
			if(!response.ok){
				const errorResData = await response.json()
				const errId = errorResData.error.message
				let message = 'Somthin went wrong'
				if(errId ==='EMAIL_NOT_FOUND'){
					message = 'This email could not be found'
				}
				else if(errId === 'INVALID_PASSWORD'){
					message = 'Incorrect Password'
				}
				throw new Error(message)
			}
		const resData = await response.json()
		
		dispatch({type:SET_AUTH_LOGIN,token:resData.idToken,userId:resData.localId})
		const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000 )
		saveDataToStorage(resData.idToken,resData.localId, expirationDate)
	}

	
}


const saveDataToStorage = (token,userId,expirationDate) =>{
		AsyncStorage.setItem(
			'userData',JSON.stringify({
				token:token,
				userId:userId,
				expiryDate: expirationDate.toISOString()
			}))
	}
