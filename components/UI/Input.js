import React from 'react'
import {View, Text, TextInput, StyleSheet } from  'react-native'

const Input  = props =>{
	return (
		<View style={styles.formControl}>
          <Text style={styles.label}>{props.label}</Text>
          <TextInput
          	{...props}
            style={styles.input}
            value={props.value}
            onChangeText={() => props.onChnageT(title)}
          />
          {!formState.inputValidities.title && <Text>{props.errorMsg}</Text> }
        </View>
		)
} 
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
export default Input