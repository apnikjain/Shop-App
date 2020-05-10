import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector,useDispatch } from 'react-redux';
import * as editActions from '../../store/actions/products'
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors'

const REDUCER_UPDATE = 'UPDATE'
const formReducer = (state, action) => {
	if(action.type === REDUCER_UPDATE){
		const updateValues = {
			...state.inputValues,
			[action.input]:action.value
		}
		const updateVal = {
			...state.inputValidities,
			[action.input]:action.isValid
		}
	
	let updatedFormIsValid = true
	for (const key in updateVal){
		updatedFormIsValid= updatedFormIsValid && updateVal[key]
	}
	return {
		formIsValid: updatedFormIsValid,
		inputValidities:updateVal,
		inputValues:updateValues
	} 
}

	return state
};


const EditScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [isTitleValidate, setIsTitleValidate] = useState(false)
  const prodId = props.navigation.getParam('productId');
  const [error, setError] = useState()
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer,{
  	inputValues:{
  		title:editedProduct ? editedProduct.title : '',
  		imageUrl: editedProduct ? editedProduct.imageUrl : '',
  		description:editedProduct ? editedProduct.description : '',
  		price:''

  	},
  	inputValidities:{
  		title:editedProduct ? true:false,
  		imageUrl:editedProduct ? true:false,
  		description:editedProduct ? true:false,
  		price:editedProduct ? true:false,
  	},
  	formIsValid: editedProduct ? true:false
  })

 



  const submitHandler = useCallback(async () => {
  	if(!formState.formIsValid){
  		
  		
  			Alert.alert('Error', 'Enter a valid input',[
        {text:'Okay'}
    
      ])
  		return
  		  		
  	}
  	if(editedProduct){
  		setError(null)
      setIsLoading(true)
      try{
  		await dispatch(editActions.updateProduct(prodId,formState.inputValues.imageUrl,formState.inputValues.title,formState.inputValues.description))
  		setIsLoading(false)
  		props.navigation.goBack()
  	}catch(err){
  		setError(err.message)
  		setIsLoading(false)
  	}

      

  	}
  	else{
  		setError(null)
      setIsLoading(true)
      try{
  		await dispatch(editActions.createProduct(formState.inputValues.imageUrl,formState.inputValues.title,formState.inputValues.description,+formState.inputValues.price))	
  		props.navigation.goBack()
  		setIsLoading(false)
      }catch(err){
      	setError(err.message)
      	setIsLoading(false)
      }
      
      
  	}
    
  }, [dispatch,prodId,formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  useEffect(() =>{
  	if(error){
  		Alert.alert('error',error,[{text:'Retry'}])
  	}
  },[error])


  if(isLoading){
    return (
      <View style = {styles.loader}>
        <ActivityIndicator size = 'large' color = {Colors.primary} />
      </View>
      )
  }
  const textChangeHandler = (inputIdentifier, text) =>{
  	let isValid = false
  	if(text.trim().length > 0){
  		isValid = true
  	}

  	dispatchFormState({
  		type:REDUCER_UPDATE,
  		value: text,
  		isValid:isValid,
  		input:inputIdentifier
  	})

  }
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(this,'title')}
            keyboardType = 'default'
            autoCapitalize = 'sentences'
            autoCorrect
            returnKeyType = 'next'
            onEndEditing = {() =>{}}
            
          />
          {!formState.inputValidities.title ? <Text>Enter valid text</Text> :null}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={textChangeHandler.bind(this,'imageUrl')}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={textChangeHandler.bind(this,'price')}
              keyboardType = 'decimal-pad'
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={textChangeHandler.bind(this,'description')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
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
});

export default EditScreen;
