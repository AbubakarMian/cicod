import { View, Text } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import Login from './Login';
import ResetPassword from '../views/ResetPassword'
import Filter from './Filter';
import Home from './Home';
import Dashnoard from './Dashnoard';
import Products from './Products';
import ProductFilter from './ProductFilter';
import Order from './Order';
import OrderDetail from './OrderDetail';
import OrderFilter from './OrderFilter';
import CreateOrder from './CreateOrder';
import MakePayment from './MakePayment';
import Customer from './Customer';
import AddCustomer from './AddCustomer';
import CustomersDetal from '../views/CustomersDetal';
import Supplier from '../views/Supplier'
import Connect from './Connect';
import Buyers from './Buyers';
import BuyersFilter from './BuyersFilter';
import Buy from './Buy';
import User from './User';
import ChangePassword from './ChangePassword';
import TabNavigater from './TabNavigater';
import Sell from './Sell';
import PayByPos from './payByPos';
import PayByCash from './PayByCash';
import PayByUssd from './PayByUssd';
import AddProduct from './AddProduct';
import CreateProduct from './CreateProduct';
import ApplyDiscount from './ApplyDiscount';
import AddNote from './AddNote';
import BuyersView from './BuyersView';
import ProductView from './ProductView';
import EnableProduct from './EnableProduct';
import AddNewCustomer from './AddNewCustomer';
import UpdateProduct from './UpdateProduct';
import ProductCategory from './ProductCategory';
const Stack = createStackNavigator();

export default class AppNavigater extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />


          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Dashnoard" component={TabNavigater} options={{ headerShown: false }} />
          <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
          <Stack.Screen name="ProductFilter" component={ProductFilter} options={{ headerShown: false }} />

          <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }} />
          <Stack.Screen name="OrderFilter" component={OrderFilter} options={{ headerShown: false }} />
          <Stack.Screen name="CreateOrder" component={CreateOrder} options={{ headerShown: false }} />
          <Stack.Screen name="MakePayment" component={MakePayment} options={{ headerShown: false }} />

          <Stack.Screen name="Customer" component={Customer} options={{ headerShown: false }} />

          <Stack.Screen name="CustomersDetal" component={CustomersDetal} options={{ headerShown: false }} />
          <Stack.Screen name="Supplier" component={Supplier} options={{ headerShown: false }} />

          <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
          <Stack.Screen name="Connect" component={Connect} options={{ headerShown: false }} />
          <Stack.Screen name="Buyers" component={Buyers} options={{ headerShown: false }} />
          <Stack.Screen name="BuyersFilter" component={BuyersFilter} options={{ headerShown: false }} />
          <Stack.Screen name="Buy" component={Buy} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
          <Stack.Screen name="Sell" component={Sell} options={{ headerShown: false }} />
          <Stack.Screen name="PayByPos" component={PayByPos} options={{ headerShown: false }} />
          <Stack.Screen name="PayByCash" component={PayByCash} options={{ headerShown: false }} />
          <Stack.Screen name="PayByUssd" component={PayByUssd} options={{ headerShown: false }} />
          <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
          <Stack.Screen name="ApplyDiscount" component={ApplyDiscount} options={{ headerShown: false }} />
          <Stack.Screen name="AddNote" component={AddNote} options={{ headerShown: false }} />
          <Stack.Screen name="EnableProduct" component={EnableProduct} options={{ headerShown: false }} />
          <Stack.Screen name="AddNewCustomer" component={AddNewCustomer} options={{ headerShown: false }} />
          <Stack.Screen name="AddCustomer" component={AddCustomer} options={{ headerShown: false }} />
          <Stack.Screen name="ProductView" component={ProductView} options={{ headerShown: false }} />
          <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{ headerShown: false }} />
          <Stack.Screen name="CreateProduct" component={CreateProduct} options={{ headerShown: false }} />
          <Stack.Screen name="BuyersView" component={BuyersView} options={{ headerShown: false }} />
          <Stack.Screen name="ProductCategory" component={ProductCategory} options={{ headerShown: false }} />


        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}