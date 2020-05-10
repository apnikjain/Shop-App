import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {View, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native'
import Colors from '../../constants/Colors'
import * as authActions from '../../store/actions/Auth.js'

const StartScreen = (props) =>{
	const dispatch = useDispatch()
	useEffect(() =>{
		tryLogin = async () =>{
			const userData = await AsyncStorage.getItem('userData')
			
			if(!userData){
				props.navigation.navigate('auth')
				return
			}
			const transformedData = JSON.parse(userData)
			const { token, userId, expiryDate} = transformedData
			const expirationDate = new Date(expiryDate)

			if(expirationDate<=new Date() || !token || !userId){
				props.navigation.navigate('auth')
				return
			}
			props.navigation.navigate('main')
			dispatch(authActions.Login(token,userId)) 
		}
		tryLogin()	
	},[dispatch])
	return(
		<View style = {styles.screen}>
			<ActivityIndicator size = 'large' color ={Colors.primary} />
		</View>
		)
}

const styles = StyleSheet.create({
	screen:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	}
})

export default StartScreen