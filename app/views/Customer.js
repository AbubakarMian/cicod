import React from 'react'
import { View, ImageBackground, Text,Alert, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/CustomerCss'
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from '../views/Constant';
import Header from './Header'
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false,
            page:1,
            spinner:false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    componentDidMount(){
        console.log('this.props.user',this.props.user.access_token);
        this.getCustomers();
        
    }

    getCustomers(){

        this.setState({ spinner: true })
        let postData = {
            method: 'GET',  
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            }, 
        };
        //'https://com.cicodsaasstaging.com/com/api/customers?page=1'
        // Constants.customerlist+'?page='+this.state.page
         fetch(Constants.customerlist+'?page='+this.state.page, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('responseJson !!!! @@@@@@@@@@@@@@@@@@@@@@@@@@ ',responseJson)
                this.setState({
                    spinner: false,
                });
                if (responseJson.status === 'success') {
                    this.setState({
                        data:responseJson.data
                    })
                    // this.props.navigation.navigate('DrawerNavigation')
                } 
            })
            .catch(error=>{
                console.log('Error !!!', error)
            });
    }

    customerDetails(items){

        console.log('items !!!!!!!!!!!!',items.id)
        this.props.navigation.navigate('CustomersDetal', {customer_id:items.id})
    }

    render() {

        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={[{}, styles.mainView]}>
                <Header/>
                <Spinner
                        visible={this.state.spinner}
                        textContent={'Please Wait...'}
                        textStyle={{ color: '#fff' }}
                        color={'#fff'}
                    />
                <View style={[{}, styles.headerRow]}>
                    <View style={[{}, styles.headerRowBackiconView]}>
                    <Icon name="arrow-left" size={25} color="#929497" />
                    </View>
                    <View>
                        <Text style={[{}, styles.headerRowText]}>customers</Text>
                    </View>
                    <View style={[{}, styles.headerRowPlusiconView]}>
                        <Image
                            source={require('../images/products/circlePlus.png')}
                        />
                    </View>
                </View>
                <View style={[{}, styles.searchBoxView]}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <TextInput
                        placeholder="Johnson James"
                    />
                </View>
                <View style={[{}, styles.searchBoxDividerView]}></View>
                <ScrollView>
                    <FlatList
                    data={this.state.data}
                        // data={[
                        //     { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                        //     { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                        //     { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                        //     { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                        //     { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                        //     { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                        //     { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                        //     { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                        // ]}
                        ItemSeparatorComponent={
                            Platform.OS !== 'android' &&
                            (({ highlighted }) => (
                                <View
                                    style={[
                                        style.separator,
                                        highlighted && { marginLeft: 0 }
                                    ]}
                                />
                            ))
                        }
                        renderItem={({ item, index, separators }) => (
                            <TouchableHighlight
                                key={item.key}
                                onPress={(() => this.customerDetails(item))}//=>this.props.navigation.navigate('CustomersDetal')
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 5 }}>
                                    <View style={[{ flexDirection: 'row' }]}>
                                        <Image
                                            style={[{ height: 50, width: 50, marginRight:5 }]}
                                            source={require('../images/customer/usericon.png')}
                                        />
                                    </View>
                                    <View style={{ position: 'relative', flex: 3 }}>
                                        <Text>{item.first_name +' '+ item.last_name}</Text>
                                        <View style={{ flexDirection: 'row', }}>

                                            <Text style={{fontSize:10,color:'#929497'}}>{item.email + '.'+ item.phone}</Text>
                                            <View style={[{ position: 'absolute', right: 0, backgroundColor:'#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                                <Text style={[{ color: '#26C281' }]}>{(item.is_active)?'ACTIVE':'IN ACTIVE'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
  };
  function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER })
    }
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Customer)