import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Touchable,
  Alert,
  ScrollView,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import styles from '../css/MoreCss';
import fontStyles from '../css/FontCss';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {SET_USER, LOGOUT_USER} from '../redux/constants/index';
import TabNav from '../views/TabsNav';
import Scaffold from './Components/Scaffold';

var {width, height} = Dimensions.get('window');

class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }
  ressetPassword() {
    console.log('Resset Resset Resset ');
  }
  logoutFun() {
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <Scaffold>
        <View style={[{}, styles.mainView]}>
          <Header navigation={this.props.navigation} />
          <View style={[{}, styles.headingRow]}>
            <Text style={[{}, styles.moreText]}>MORE</Text>
          </View>
          <ScrollView>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Customer')}
                style={[{}, styles.cardView]}>
                <View style={{width: 30}}>
                  <Image source={require('../images/users.png')} />
                </View>
                <View style={[{}, styles.cardTextView]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                    Customers
                  </Text>
                  <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                    List of all your customers
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('CreateOrder', {
                    screen_name: 'buy',
                  })
                }
                style={[{}, styles.cardView]}>
                <View style={{width: 30}}>
                  <Image source={require('../images/buy.png')} />
                </View>
                <View style={[{}, styles.cardTextView]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                    Buy
                  </Text>
                  <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                    Purchase Product from your suppliers
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Supplier')}
                style={[{}, styles.cardView]}>
                <View style={{width: 30}}>
                  <Image source={require('../images/supplier.png')} />
                </View>
                <View style={[{}, styles.cardTextView]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                    Suppliers
                  </Text>
                  <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                    List of all your suppliers
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Buyers')}
                style={[{}, styles.cardView]}>
                <View style={{width: 30}}>
                  <Image source={require('../images/buyers.png')} />
                </View>
                <View style={[{}, styles.cardTextView]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                    Resellers
                  </Text>
                  <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                    List of all your resellers
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Connect')}
                style={[{}, styles.cardView]}>
                <View style={{width: 30}}>
                  <Image source={require('../images/connect.png')} />
                </View>
                <View style={[{}, styles.cardTextView]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                    Connect
                  </Text>
                  <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                    Connect with other merchants
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Network')}
                style={[{}, styles.cardView]}>
                <View style={{width: 30}}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../images/networkMore.png')}
                  />
                </View>
                <View style={[{}, styles.cardTextView]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                    Network
                  </Text>
                  <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                    See List of Merchants to Connect
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('QuickInvoice')}
                style={[{}, styles.cardView]}>
                <View style={{width: 30}}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../images/quickInvMore.png')}
                  />
                </View>
                <View style={[{}, styles.cardTextView]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                    Quick Invoice
                  </Text>
                  <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                    Send Quick Invoice{' '}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('Connect')}
                style={[{}, styles.cardView]}>
                <View style={{width: 30}}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../images/supportMore.png')}
                  />
                </View>
                <View style={[{}, styles.cardTextView]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                    Support
                  </Text>
                  <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                    Read help articles and watch help videos{' '}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('User')}
                style={[{}, styles.cardView]}>
                <View
                  style={{
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../images/user.png')} />
                </View>
                <View style={[{}, styles.cardTextView]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                    Account
                  </Text>
                  <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                    Details of user account
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.logoutFun()}
              style={[{}, styles.logoutView]}>
              <Icon name="sign-out" color={'#929497'} size={30} />
              <Text style={[{}, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 10,
                marginBottom: 20,
                width: '70%',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{color: '#929497', letterSpacing: 1.0, fontSize: 10}}>
                CICOD Customer Order Management Mobile App is a product of Crown
                Interactive
              </Text>
              <Text
                style={{
                  color: '#929497',
                  fontWeight: 'bold',
                  marginTop: 20,
                  marginBottom: 20,
                }}>
                Version 1.0
              </Text>
              <Text
                style={{color: '#B1272C', fontSize: 13, fontWeight: 'bold'}}>
                A PRODUCT OF CROWN INTERACTIVE
              </Text>
            </View>
          </ScrollView>
          <TabNav
            style={{position: 'absolute', bottom: 0}}
            screen={'more'}
            props={this.props}
          />
        </View>
      </Scaffold>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(More);
