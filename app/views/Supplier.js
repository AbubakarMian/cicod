import React from 'react'
import { View, TouchableHighlight, FlatList, Dimensions, Image, Platform,  Alert ,TouchableOpacity, ScrollView, } from 'react-native'
import { Text, TextInput,Searchbar } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss';
import fontStyles from '../css/FontCss'
import Header from '../views/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
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

    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
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
        console.log('get Suppliers List',url);
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
                console.log('responseJson', responseJson);
                this.setState({
                    spinner: false,
                });
                if (responseJson.success === true) {

                    this.setState({
                        data: responseJson.data
                    })
                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }
            })

    }

    supliersDetail(items) {
        console.log('items !!!!!!!!!!!!', items);
        this.props.navigation.navigate('BuyersView', { items: items, heading: 'SUPPLIERS' })
    }
    render() {

        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={{ height: height, width: width, position: 'relative', backgroundColor: '#F0F0F0', }}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom:5, alignContent: 'center', alignItems: 'center', width: width - 20, alignSelf: 'center' }}>
                    <TouchableOpacity
                        // onPress={() => this.props.navigation.navigate('Home')}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View>
                        <Text style={[{ color: '#2F2E7C', marginHorizontal: 20 },fontStyles.normal15]}>SUPPLIERS</Text>
                    </View>
                    {/* <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddSuppliers')}
                        style={{ position: 'absolute', right: 0 }}>
                        <Image
                            style={{height:30,width:30}}
                            source={require('../images/products/circlePlus.png')}
                        />
                    </TouchableOpacity> */}
                </View>
                {/* <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', paddingHorizontal: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' }}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <View>
                        <TextInput
                            label="Search supplier"
                            style={{ backgroundColor: 'transparent', }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
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
                </View> */}
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', borderRadius: 5, marginTop: 10, alignItems: 'center' }}>

                    {/* <View style={{ flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', height: 50, paddingHorizontal: 10, borderRadius: 5, width: width - 80 }}>
                        <Image
                            style={{height:30,width:30}}
                            source={require('../images/products/searchicon.png')}
                        />
                        <TextInput
                            label=""
                            // selectionColor={'#fff'}
                            disabled={true}
                            style={{ backgroundColor: 'transparent', }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                            onChangeText={text => this.setState({ search_product: text })}
                            onSubmitEditing={() => this.search()}
                        />
                    </View> */}
                     <Searchbar
                    placeholder="Search supplier"
                    style={[{color:'#D8D8D8'},fontStyles.normal14]}
                    iconColor="#929497"
                    style={{width:width/1.3,alignSelf:'center', marginTop:10,marginBottom:5,elevation:0,borderColor:'#D8DCDE'}}
                    onChangeText={text => this.setState({ search_product: text })}
                    onSubmitEditing={() => this.search()}
                    //update
                    ></Searchbar>
                <View style={[{borderBottomColor:'#E6E6E6',borderBottomWidth:0.25,width:width-20,alignSelf:'center',marginTop:10,marginBottom:10}]}></View>
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 0, alignSelf: 'center', }}
                        onPress={() => this.props.navigation.navigate('Filter',{screen:'Supplier'})}
                    >
                        <Image
                            style={{height:50,width:50}}
                            source={require('../images/Order/settingicon.png')}
                        />
                    </TouchableOpacity>

                </View>
                <View style={{ borderWidth: 0.25, borderColor: '#929497', width: width - 20, alignSelf: 'center', marginVertical: 5 }}></View>

                <ScrollView>
                    {(this.state.data.length>0)?
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
                                onPress={() => this.supliersDetail(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ position: 'relative', alignSelf: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    source={require('../images/supplier/bage.png')}
                                                />
                                                <View style={{ flexDirection: 'column', marginLeft: 5 }}>
                                                    <Text style={[{ color: '#4E4D4D' }, fontStyles.bold15]}>{item.buyer_name}</Text>
                                                    <View style={{flexDirection:'row'}}>
                                                    <Text style={[{color:'#929497',marginRight:5},fontStyles.normal12]}>Product Category:</Text>
                                                    <Text style={[{ color: '#929497' }, fontStyles.bold13]}>{item.no_of_products
                                                    }</Text>
                                                </View>
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
                            </TouchableOpacity>
                        )}
                    />
                    :
                    <View style={{ height: height / 1.75, position: 'relative', flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0', width: width - 20, padding: 10, borderRadius: 10, marginBottom: 5 }}>
                    <Image
                        source={require('../images/Untitled-1.png')}
                    />
                    <Text style={{ color: '#929497', fontSize: 20, fontWeight: 'bold', fontFamily: 'Open Sans' }}>No Supplier found</Text>
                </View>
                    }
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