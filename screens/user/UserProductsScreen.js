import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View ,FlatList, Platform, Button,Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors'
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

const UserProducts = props => {
  const products = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [error,setError] = useState()

  const selectItemHandler = (id) =>{
    props.navigation.navigate('editScreen',{productId:id})
}
  
  const deleteHandler = (id) =>{
    Alert.alert('Are you sure', 'Do you Really want to delete this item ?',[
        {text:'No',style:'default'},
        {text:'Yes', style:'destructive',onPress : async () =>{
          setError(null)
          setIsLoading(true)

          try{
          await dispatch(productsActions.deleteProduct(id))
          setIsLoading(false)

        }catch(err){
          setError(err.message)
          setIsLoading(false)
        }


          
        } }
    
      ])
  }

  useEffect(() =>{
    if(error){
      Alert.alert('Error',error,[{text:'Retry'}])
    }
  },[error])

  if(isLoading){
    return (
      <View  style = {styles.loader}>
        <ActivityIndicator size = 'large' color = {Colors.primary}/>
      </View>
      )
  }
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {selectItemHandler(itemData.item.id)
            }
          }
        >
        <Button
                color={Colors.primary}
                title="Edit"
                onPress={() => {selectItemHandler(itemData.item.id,{productId:itemData.item.id})
            }}
              />
              <Button
                color={Colors.primary}
                title="Delete"
                onPress={() =>{deleteHandler(itemData.item.id)}}
              />
        </ProductItem>
      )}
    />
  );
};

UserProducts.navigationOptions = navData => {
  return {
    headerTitle: 'User Products',
    headerLeft : () =>
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={Platform.OS === 'android' ? 'ios-menu' : 'ios-menu'}
              onPress={() => {
                  navData.navigation.toggleDrawer()
              }}
            />
        </HeaderButtons>,
        
    headerRight : () =>
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Add"
              iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              onPress={() => {
                  navData.navigation.navigate('editScreen')
              }}
            />
        </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  loader:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default UserProducts;
