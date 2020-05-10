import {SET_AUTH_SIGNUP, SET_AUTH_LOGIN, LOGOUT} from '../actions/Auth'

const initialState ={
	token:null,
	userId:null
}

export default (state  = initialState, action) =>{
	switch(action.type){
		case(SET_AUTH_LOGIN):
			
			return{
				token:action.token,
				userId:action.userId
			}
		case(SET_AUTH_SIGNUP):
			return{
				token:action.token,
				userId:action.userId
			}
		case(LOGOUT):
			return initialState
		default:
			return state
	}	
	return state
}