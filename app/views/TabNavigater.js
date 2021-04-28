import { View, Text, Image,StyleSheet } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { UpdateTabbar } from '../redux/constants/index';
import Dashnoard from './Dashnoard';
import Order from './Order';
import Products from './Products';
import More from './More';

const Tab = createBottomTabNavigator();
class TabNavigater extends React.Component {
  constructor(props){
    super(props);
    this.state={
      orderActive:'',
      active_screen:this.props.extraData.name
    }
  }
  componentWillReceiveProps(){
    console.log('my props extraData',this.props.extraData);
    if(this.state.active_screen == ''){
      this.setState({
        active_screen:this.props.extraData.name
      })
    }    
  }

  render() {
    let selected_tabBar = this.props.tabBar;
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: '#fff',
          activeTintColor:'#B1272C',
          inactiveTintColor:'#929497',          
        }}
        initialRouteName={this.props.extraData.initialRouteName}
      >
        <Tab.Screen
          name="Dashnoard"
          component={Dashnoard} 
          listeners={{
            tabPress: e => {
              this.setState({active_screen:'dashboard'})
            },
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#ffffff',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1.65,
                  elevation: 0,
                }}>
                <Image
                  // source={this.state.active_screen == 'dashboard'?require('../images/tabnav/chart.png'):require('../images/tabnav/red_chart.png')}
                  source={this.state.active_screen == 'dashboard'?require('../images/tabnav/red_chart.png'):require('../images/tabnav/chart.png')}
                  style={{
                    width: 25,
                    height: 25,
                    borderColor: 'red',
                    //tintColor: '#f1f6f9',
                    alignContent: 'center',
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={Order}
          listeners={{
            tabPress: e => {
              this.setState({active_screen:'order'})
            },
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#ffffff',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1.65,
                  elevation: 0,
                }}>
                <Image
                  // source={require('../images/orders.png')}
                  source={this.state.active_screen == 'order'?require('../images/tabnav/red_order.png'):require('../images/tabnav/order.png')}

                  style={{
                    width: 20,
                    height: 25,
                    borderColor: 'red',
                    //tintColor: '#f1f6f9',
                    alignContent: 'center',
                  }}
                />
              </View>
            ),
          }}
        />

<Tab.Screen
          name="Products"
          listeners={{
            tabPress: e => {
              this.setState({active_screen:'products'})
            },
          }}
          component={Products}          
          listeners={{
            tabPress: e => {
              this.setState({active_screen:'products'})
            },
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#ffffff',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1.65,
                  elevation: 0,
                }}>
                <Image
                  source={require('../images/noProduct.png')}
                  source={this.state.active_screen == 'products'?require('../images/tabnav/red_products.png'):require('../images/tabnav/products.png')}
                  style={{
                    width: 25,
                    height: 25,
                    borderColor: 'red',
                    //tintColor: '#f1f6f9',
                    alignContent: 'center',
                  }}
                />
              </View>
            ),
          }}
        />

<Tab.Screen
          name="More"
          component={More}
          listeners={{
            tabPress: e => {
              this.setState({active_screen:'more'})
            },
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#ffffff',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1.65,
                  elevation: 0,
                }}>
                <Image
                  source={require('../images/more.png')}
                  source={this.state.active_screen == 'more'?require('../images/tabnav/red_more.png'):require('../images/tabnav/more.png')}
                  style={{
                    width: 25,
                    height: 25,
                    borderColor: 'red',
                    //tintColor: '#f1f6f9',
                    alignContent: 'center',
                  }}
                />
              </View>
            ),
          }}
        />        
        

      </Tab.Navigator>
    );
  }
}
function mapStateToProps(state) {
    return {
      tabBar: state.tabBarReducer
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setTabBar: (value) => dispatch({ type: UpdateTabbar, value: value }),
    }
};
export default connect(mapStateToProps)(TabNavigater)
