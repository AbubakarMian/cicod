import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss'
import Header from '../views/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
import { Constants } from '../views/Constant';
 class Supplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false,
            spinner: false,
            data: []
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    componentDidMount() {

        this.getSuppliersList(Constants.supplierlist);
    }


    componentWillReceiveProps() {
        console.log('this.props.route', this.props.route.params.filters);
        // console.log('this.props.route',this.props.route.params);
        // this.getData(Constants.productslist);
        let filters = this.props.route.params.filters;
        let filter = '?';
        for (let i = 0; i < filters.length; i++) {
            filter = filter + filters[i].key + '=' + filters[i].value;
            if (i != filters.length - 1) {
                filter = filter + '&';
            }
        }

        this.getSuppliersList(Constants.supplierlist + filter);
    }


    getSuppliersList(url) {

        console.log('get Suppliers List');
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
                console.log('responseJson',responseJson);
                this.setState({
                    spinner: false,
                });
                if (responseJson.success === true) {

                    this.setState({
                        data: responseJson.data
                    })
                } else {
                    let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', message)
                }
            })

    }
    render() {

        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={{ height: height, width: width, position: 'relative', backgroundColor: '##F0F0F0', }}>
               <Header navigation={this.props.navigation}/>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <View style={{ flexDirection: 'row', marginVertical: 10, alignContent: 'center', alignItems: 'center', width: width - 20, alignSelf: 'center' }}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Home')}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 20 }}>SUPPLIER</Text>
                    </View>
                    <View style={{ position: 'absolute', right: 0 }}>
                        <Image
                            source={require('../images/products/circlePlus.png')}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' }}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <View>
                        <TextInput
                            placeholder="Search supplier"
                        />
                    </View>
                    <View style={{ position: 'absolute', right: 0, alignSelf: 'center', }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Filter')}
                        >
                            <Image
                                source={require('../images/Order/settingicon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                
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
                
    

                <ScrollView>
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
                            <TouchableHighlight
                                key={item.key}
                                onPress={() => this._onPress(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 5 }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    source={require('../images/supplier/bage.png')}
                                                />
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontWeight: 'bold' }}>{item.buyer_name}</Text>
                                                    <Text style={[{ color: '#aaa' }]}>{item.seller_name}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'column' }}>
                                        {(item.is_active == 1) ?
                                            <View style={[{ backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                                <Text style={[{ color: '#26C281' }]}>ACTIVE</Text>
                                            </View>
                                            :
                                            <View style={[{ backgroundColor: '#e3b8be', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                                <Text style={[{ color: '#ba071f' }]}>IN ACTIVE</Text>
                                            </View>
                                        }
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
export default connect(mapStateToProps, mapDispatchToProps)(Supplier)