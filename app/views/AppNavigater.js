import { View, Text } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import Login from './Login';
import ResetPassword from '../views/ResetPassword'
import Filter from './Filter';
import Home from './Home';
import Dashboard from './Dashboard';
import Products from './Products';
import CategoryFilter from './CategoryFilter';
import ProductFilter from './ProductFilter';
import Order from './Order';
import OrderDetail from './OrderDetail';
import OrderDetail_pending from './OrderDetail_pending';
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
import ConnectView from './ConnectView';
import EnableProduct from './EnableProduct';
import AddNewCustomer from './AddNewCustomer';
import UpdateProduct from './UpdateProduct';
import ProductCategory from './ProductCategory';
import BuyCreateOrder from './BuyCreateOrder';
import DiliveryAddress from './DiliveryAddress';
import PickUpLocation from './PickUpLocation';
import AddDiliveryAddress from './AddDiliveryAddress';
import AddSuppliers from './AddSuppliers';
import PaymentWeb from './PaymentWeb';
import BuyDiliveryAddress from './BuyDiliveryAddress';
import CreateProductCategory from './CreateProductCategory';
import More from '../views/More';
import PartPaytment from './PartPaytment';
import PaymentSuccess from './PaymentSuccess';
import BuyersProducts from './BuyersProducts';
import CreateOrderValueChain from './CreateOrderValueChain';
import AddProductValueChain from './AddProductValueChain';
import OrderDetailValueChain from './OrderDetailValueChain';
import PayByUssdValueChain from './PayByUssdValueChain';
import BuyDiliveryAddressValueChain from './BuyDiliveryAddressValueChain';
import BarcodeScannerView from './BarcodeScannerView';

const Stack = createStackNavigator();

export default class AppNavigater extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">{/* PartPaytment  OrderDetail*/}          
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentWeb" component={PaymentWeb} options={{ headerShown: false }} />
          <Stack.Screen name="BuyDiliveryAddress" component={BuyDiliveryAddress} options={{ headerShown: false }} />
          <Stack.Screen name="BuyDiliveryAddressValueChain" component={BuyDiliveryAddressValueChain} options={{ headerShown: false }} />

          
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Dashboard" component={TabNavigater}  options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
            {props => <TabNavigater extraData={{ name: 'dashboard', initialRouteName: 'Dashboard' }} />}
          </Stack.Screen> */}

          {/* <Stack.Screen name="Products" options={{ headerShown: false }}>
            {props => <TabNavigater extraData={{ name: 'products', initialRouteName: 'Products' }}   />}
          </Stack.Screen> */}
          <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
          <Stack.Screen name="ProductFilter" component={ProductFilter} options={{ headerShown: false }} />
          <Stack.Screen name="CategoryFilter" component={CategoryFilter} options={{ headerShown: false }} />
{/* 
          <Stack.Screen name="Order" options={{ headerShown: false }}>
            {props => <TabNavigater extraData={{ name: 'order', initialRouteName: 'Orders' }} />}
          </Stack.Screen> */}
          <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetailValueChain" component={OrderDetailValueChain} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetail_pending" component={OrderDetail_pending} options={{ headerShown: false }} />
          <Stack.Screen name="OrderFilter" component={OrderFilter} options={{ headerShown: false }} />
          <Stack.Screen name="CreateOrder" component={CreateOrder} options={{ headerShown: false }} />
          <Stack.Screen name="CreateOrderValueChain" component={CreateOrderValueChain} options={{ headerShown: false }} />
          <Stack.Screen name="MakePayment" component={MakePayment} options={{ headerShown: false }} />
          <Stack.Screen name="Customer" component={Customer} options={{ headerShown: false }} />
          <Stack.Screen name="CustomersDetal" component={CustomersDetal} options={{ headerShown: false }} />
          <Stack.Screen name="Supplier" component={Supplier} options={{ headerShown: false }} />
          <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
          <Stack.Screen name="Connect" component={Connect} options={{ headerShown: false }} />
          <Stack.Screen name="ConnectView" component={ConnectView} options={{ headerShown: false }} />
          <Stack.Screen name="Buyers" component={Buyers} options={{ headerShown: false }} />
          <Stack.Screen name="BuyersFilter" component={BuyersFilter} options={{ headerShown: false }} />
          <Stack.Screen name="Buy" component={Buy} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
          <Stack.Screen name="Sell" component={Sell} options={{ headerShown: false }} />
          <Stack.Screen name="PayByPos" component={PayByPos} options={{ headerShown: false }} />
          <Stack.Screen name="PayByCash" component={PayByCash} options={{ headerShown: false }} />
          <Stack.Screen name="PayByUssd" component={PayByUssd} options={{ headerShown: false }} />
          <Stack.Screen name="PayByUssdValueChain" component={PayByUssdValueChain} options={{ headerShown: false }} />
          <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
          <Stack.Screen name="AddProductValueChain" component={AddProductValueChain} options={{ headerShown: false }} />
          <Stack.Screen name="ApplyDiscount" component={ApplyDiscount} options={{ headerShown: false }} />
          <Stack.Screen name="AddNote" component={AddNote} options={{ headerShown: false }} />
          <Stack.Screen name="EnableProduct" component={EnableProduct} options={{ headerShown: false }} />
          <Stack.Screen name="AddNewCustomer" component={AddNewCustomer} options={{ headerShown: false }} />
          <Stack.Screen name="AddCustomer" component={AddCustomer} options={{ headerShown: false }} />
          <Stack.Screen name="ProductView" component={ProductView} options={{ headerShown: false }} />
          <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{ headerShown: false }} />
          <Stack.Screen name="CreateProduct" component={CreateProduct} options={{ headerShown: false }} />
          <Stack.Screen name="BarcodeScannerView" component={BarcodeScannerView} options={{ headerShown: false }} />
          <Stack.Screen name="BuyersView" component={BuyersView} options={{ headerShown: false }} />
          <Stack.Screen name="BuyersProducts" component={BuyersProducts} options={{ headerShown: false }} />
          <Stack.Screen name="ProductCategory" component={ProductCategory} options={{ headerShown: false }} />
          <Stack.Screen name="BuyCreateOrder" component={BuyCreateOrder} options={{ headerShown: false }} />
          <Stack.Screen name="DiliveryAddress" component={DiliveryAddress} options={{ headerShown: false }} />
          <Stack.Screen name="PickUpLocation" component={PickUpLocation} options={{ headerShown: false }} />
          <Stack.Screen name="AddDiliveryAddress" component={AddDiliveryAddress} options={{ headerShown: false }} />
          <Stack.Screen name="AddSuppliers" component={AddSuppliers} options={{ headerShown: false }} />
          <Stack.Screen name="CreateProductCategory" component={CreateProductCategory} options={{ headerShown: false }} />
          <Stack.Screen name="More" component={More} options={{ headerShown: false }} />
          <Stack.Screen name="PartPaytment" component={PartPaytment} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}