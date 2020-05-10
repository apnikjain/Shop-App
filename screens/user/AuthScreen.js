import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Text,ScrollView,TextInput, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert} from 'react-native'
import Colors from '../../constants/Colors' 
import * as authActions from '../../store/actions/Auth'


const AuthScreen  = props =>{
	const [isEmailText, setIsEmailText]  = useState('') 
	const [isPassText, setIsPassText]  = useState('') 
	const [isValid, setIsValid] = useState(false)
	const [isLogin,setIsLogin] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState()
	const x = true
	const dispatch = useDispatch()
	const signUpHandler = async  () =>{

		setIsLoading(true)
		await dispatch(authActions.signUp(isEmailText,isPassText))
		setIsLoading(false)

	}
	const loginHandler = async  () =>{
		setError(null)
		try{
		setIsLoading(true)

		await dispatch(authActions.Login(isEmailText,isPassText))
		props.navigation.navigate('main')		
	}catch(err){
		setError(err.message)
		setIsLoading(false)
	}

		
		
		
	}


	useEffect(()=>{
		if(error){
			Alert.alert('error', error,[{text:'Okay'}])
		}
	}, [error])

return (
	<KeyboardAvoidingView>
	<ScrollView>
	<View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={isEmailText}
            onChangeText={text =>  setIsEmailText(text)}
            keyboardType = 'email-address' 
            
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={isPassText}
            onChangeText={text =>  setIsPassText(text)}
           	secureTextEntry = {x}
            
          />
          <View>
          	{isLoading ? <ActivityIndicator size = 'small' color = {Colors.primary}/>:<Button title = {isLogin ? "Login" :'Sign Up'} onPress = {isLogin ? loginHandler:signUpHandler} color = {Colors.primary}/>}

          	<Button title = {isLogin ? "Switch to SignUp" :"Switch to Login"} onPress = {() =>{setIsLogin(prevState => !prevState)}} color = {Colors.primary}/>
          </View>
        </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
	)
}


const styles = StyleSheet.create({
  form: {
    margin: 50,
    marginTop:120,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 10
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  loader:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
}
);

export default AuthScreen