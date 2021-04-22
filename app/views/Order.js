import React from 'react'
import { View, ImageBackground, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, } from 'react-native'
import { Text, TextInput, Alert } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
// import styles from '../css/DashboardCss';
import styles from '../css/OrderCss';
import fontStyles from '../css/FontCss'
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { Constants } from '../views/Constant';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
import FontCss from '../css/FontCss';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false,
            data: [],
            is_active_list: 'all',
            spinner: false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    componentDidMount() {
        this.orderList(Constants.orderslist);
    }
    customeList(listType) {

        this.setState({
            spinner: true,
            is_active_list: listType
        })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },

        };
        console.log("%%%%%%%%%%", Constants.orderslist + '?order_status=' + listType)
        fetch(Constants.orderslist + '?order_status=' + listType, postData)

            .then(response => response.json())
            .then(async responseJson => {

                console.log("@@@@@@@@@@@@", responseJson)
                if (responseJson.status === 'success') {
                    this.setState({ spinner: false });
                    this.setState({
                        data: responseJson.data
                    });
                    // this.props.navigation.navigate('DrawerNavigation')
                } else {
                    let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', message)
                }

            })
    }
    orderList(url) {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },

        };
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log("###############", responseJson)
                if (responseJson.status === 'success') {
                    this.setState({ spinner: false });
                    this.setState({
                        data: responseJson.data
                    });
                    // this.props.navigation.navigate('DrawerNavigation')
                } else {
                    let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', message)
                }

            })

    }

    componentWillReceiveProps() {
        console.log('this.props.route', this.props.route.params.filters);
        let filters = this.props.route.params.filters;
        let filter = '?';
        for (let i = 0; i < filters.length; i++) {
            filter = filter + filters[i].key + '=' + filters[i].value;
            if (i != filters.length - 1) {
                filter = filter + '&';
            }
        }
        console.log(' will receive props !!!!!!!!!!!!!', Constants.orderslist + filter);
        return
        this.orderList(Constants.orderslist + filter);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    itemDetail(item) {
        const id = item.id
        console.log("item_id item_id item_id item_id ", id)
        this.props.navigation.navigate('OrderDetail', { id })
    }
    render() {

        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={{ width: width, position: 'relative', backgroundColor: '##F0F0F0', }}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', width: width - 20, alignSelf: 'center' }}>
                    <View>
                        <Text style={{ color: '#2F2E7C', fontWeight: 'bold' }}>ORDER</Text>
                    </View>
                    <View>
                        <DropDownPicker
                            items={[
                                { label: 'USA', value: 'usa', hidden: true },
                                { label: 'UK', value: 'uk', },
                                { label: 'France', value: 'france', },
                            ]}
                            defaultValue={this.state.country}
                            containerStyle={{ height: 50 }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{
                                justifyContent: 'flex-start',
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => this.setState({
                                date: item.value
                            })}
                            style={{ width: width / 2 - 30, alignSelf: 'center', marginTop: 10, marginLeft: 10 }}
                        />
                    </View>
                    {/* style={{ width: width / 2 - 30, alignSelf: 'center', marginTop: 10, marginLeft: 10 }} 
                    containerStyle={{ height: 50 }}
                    */}
                    <View style={{ position: 'absolute', right: 0 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('CreateOrder',{heading:'order'})}
                        >
                            <Image
                                source={require('../images/products/circlePlus.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' }}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <View>
                        <TextInput
                            label="Search order ID, customer, amount, tic"
                            style={{ backgroundColor: 'transparent', }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                        />
                    </View>
                    <View style={{ position: 'absolute', right: 0, alignSelf: 'center', }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('OrderFilter')}
                        >
                            <Image
                                source={require('../images/Order/settingicon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView
                    horizontal={true}
                    paddingHorizontal={10}
                    // marginBottom={10}
                    height={30}
                    marginTop={5}
                    marginBottom={5}
                    scrollEnabled={true}
                >
                 
                        <TouchableOpacity
                            onPress={() => this.customeList("")}
                        >
                            <Text style={{
                                color: this.state.is_active_list === 'all' ? '#000' : '#e2e2e2',
                                fontWeight: 'bold', backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                            }}>ALL</Text>
                        </TouchableOpacity >
                        <TouchableOpacity
                            onPress={() => this.customeList("pending")}
                        >
                            <Text style={{
                                color: this.state.is_active_list === 'pending' ? '#000' : '#e2e2e2',
                                backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                            }}>PENDING</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.customeList("paid")}
                        >
                            <Text style={{
                                color: this.state.is_active_list === 'paid' ? '#000' : '#e2e2e2',
                                backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                            }}>PAID</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.customeList("partPayment")}
                        >
                            <Text style={{
                                color: this.state.is_active_list === 'partPayment' ? '#000' : '#e2e2e2',
                                backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                            }}>PART PAYMENT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.customeList("paidFromCredit")}
                        >
                            <Text style={{
                                color: this.state.is_active_list === 'paidFromCredit' ? '#000' : '#e2e2e2',
                                backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                            }}>PAID FROM CREDIT</Text>
                        </TouchableOpacity>
                    
                </ScrollView>
                <ScrollView style={{marginBottom:200}}>
                    <FlatList
                        data={this.state.data}
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
                            <TouchableOpacity
                                key={item.key}
                                onPress={() => this.itemDetail(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    source={require('../images/Order/bage.png')}
                                                />
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={[{color:'#4E4D4D'},fontStyles.bold15]}>{item.cicod_order_id}</Text>
                                                    <Text style={[{color:'#929497'},fontStyles.normal12]}>{item.customer.name}</Text>
                                                </View>
                                            </View>
                                            <Text style={[{color:'#929497',marginTop:5},fontStyles.normal12]}>{item.order_date}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'column' }}>
                                        <Text style={[{color:'#4E4D4D'},fontStyles.bold15]}>N{item.amount}</Text>
                                        {/* {(item.order_status == 'PENDING') ?
                                            <View style={[{ backgroundColor: '#ffabb5', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                                <Text style={[{ color: '#f7001d' }]}>{item.payment_status}</Text>
                                            </View>
                                            : null} */}

                                        {(item.order_status == 'PENDING') ?
                                            <Text style={[{ borderRadius: 50, paddingHorizontal: 5, backgroundColor: '#FFF3DB', color: '#FDB72B', width: width / 5, alignSelf: 'flex-end' }, styles.detailColumn2text]}>
                                                {item.order_status}
                                            </Text>
                                            : (item.order_status == 'PAID') ?
                                                <Text style={[{ borderRadius: 50, paddingHorizontal: 5, backgroundColor: '#DAF8EC', color: '#26C281', width: width / 5, alignSelf: 'flex-end' }, styles.detailColumn2text]}>
                                                    {item.order_status}
                                                </Text>
                                                : (item.order_status == 'PART PAYMENT') ?
                                                    <Text style={[{ borderRadius: 50, paddingHorizontal: 5, backgroundColor: '#E6E6E6', color: '#929497', width: width / 5, alignSelf: 'flex-end' }, styles.detailColumn2text]}>
                                                        {item.order_status}
                                                    </Text>
                                                    : null}
                                    </View>
                                </View>
                            </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(Order)