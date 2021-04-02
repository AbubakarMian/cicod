import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss'
import Header from '../views/Header';
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false,
            data: []
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    componentDidMount() {
        this.setState({ Spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },

        };//Constants.Products
        fetch('https://com.cicodsaasstaging.com/com/api/orders', postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log("###############",responseJson)
                if (responseJson.status === 'success') {
                    this.setState({ Spinner: false });
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
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    itemDetail(item) {
        const id=item.id
        console.log("item_id item_id item_id item_id ",id)
        this.props.navigation.navigate('OrderDetail',{id})
    }
    render() {

        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={{ height: height, width: width, position: 'relative', backgroundColor: '##F0F0F0', }}>
                <Header />
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
                                country: item.value
                            })}
                            style={{ width: width / 2 - 30, alignSelf: 'center', marginTop: 10, marginLeft: 10 }}
                        />
                    </View>
                    <View style={{ position: 'absolute', right: 0 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('CreateOrder')}
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
                            placeholder="Search order ID, customer, amount, tic"
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
                    paddingHorizontal={20}
                    marginBottom={20}
                    scrollEnabled={true}
                >
                    <View style={{ width: width - 20, flexDirection: 'row' }}>
                        <View >
                            <Text style={{ marginRight: 5, backgroundColor: '#E6E6E6', paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff' }}>All</Text>
                        </View>
                        <View >
                            <Text style={{ color: '#909090', backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 10 }}>PENDING</Text>
                        </View>
                        <View >
                            <Text style={{ color: '#909090', backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 10 }}>PAID</Text>
                        </View>
                        <View >
                            <Text style={{ color: '#909090', backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 10 }}>PART PAYMENT</Text>
                        </View>
                        <View >
                            <Text style={{ color: '#909090', backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 10 }}>PAID FROM CREDIT</Text>
                        </View>
                    </View>
                </ScrollView>
                <ScrollView>
                    <FlatList
                        data={this.state.data}
                        // data={[
                        //     { title: '10', key: 'item1', customer: 'James ', brand: 'Pure  ', date: '2017-01-30 ' },
                        //     { title: '10', key: 'item2', customer: 'James ', brand: 'Pure  ', date: '2017-01-30 ' },
                        //     { title: '10', key: 'item3', customer: 'James ', brand: 'Pure  ', date: '2017-01-30 ' },
                        //     { title: '10', key: 'item4', customer: 'James ', brand: 'Pure  ', date: '2017-01-30 ' },
                        //     { title: '10', key: 'item5', customer: 'James ', brand: 'Pure  ', date: '2017-01-30 ' },
                        //     { title: '10', key: 'item6', customer: 'James ', brand: 'Pure  ', date: '2017-01-30 ' },
                        //     { title: '10', key: 'item7', customer: 'James ', brand: 'Pure  ', date: '2017-01-30 ' },


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
                                onPress={() => this.itemDetail(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 5 }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    source={require('../images/Order/bage.png')}
                                                />
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontWeight: 'bold' }}>{item.cicod_order_id}</Text>
                                                    <Text style={[{ color: '#aaa' }]}>{item.customer.name}</Text>
                                                </View>
                                            </View>
                                            <Text style={[{ color: '#aaa' }]}>{item.order_date}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'column' }}>
                                        <Text style={{ fontWeight: 'bold' }}>N{item.amount}</Text>
                                        <View style={[{ backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                            <Text style={[{ color: '#26C281' }]}>{item.payment_status}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(Order)