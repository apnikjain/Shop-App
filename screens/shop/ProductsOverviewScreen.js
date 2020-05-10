import React, {useEffect, useState, useCallback} from 'react';
import { ActivityIndicator,View, StyleSheet, FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors'
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/HeaderButton';



const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();


  const selectItemHandler = (id,title) =>{
    props.navigation.navigate('ProductDetail', {
              productId: id,
              productTitle: title
  })
}

const loaded = useCallback(async () =>{
  
  setError(null)
  setIsRefreshing(true)
      try{  
            
            await dispatch(productActions.fetchData())
          }catch (err){
            setError(err.message)
            
          }
  setIsRefreshing(false)
},[dispatch,setIsLoading, setError])

  useEffect(() =>{
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loaded
      )
    return () =>{
      willFocusSub.remove();
    }
  },[loaded])

  useEffect(() =>{
      setIsLoading(true)
      loaded().then(() =>{setIsLoading(false)})
  },[dispatch, loaded])



    if(isLoading){
      return(
        <View style = {styles.loader}>
          <ActivityIndicator size = 'large' color = {Colors.primary}/>
        </View>
        )
    }
    
  


  return (

    <FlatList
      onRefresh = {loaded}
      refreshing = {isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id,itemData.item.title)
            }
          }
        >
        <Button
                color={Colors.primary}
                title="View Details"
                onPress={() => {
            selectItemHandler(itemData.item.id,itemData.item.title)
            }}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
              />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
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
    headerRight: () => 
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cart"
              iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              onPress={() => {
                  navData.navigation.navigate('Cart')
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

export default ProductsOverviewScreen;
