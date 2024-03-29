import React from 'react'
import { View, ImageBackground, FlatList, Alert, TouchableHighlight, Dimensions, Image, Platform, TouchableOpacity, } from 'react-native'
import splashImg from '../images/splash.jpg'
import { Text, TextInput, Searchbar } from 'react-native-paper';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import { connect } from 'react-redux';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import { SET_USER, LOGOUT_USER, ADD_TO_PRODUCT, REMOVE_FROM_CART } from '../redux/constants/index';
import SearchBar from 'react-native-search-bar';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../css/BuyersCss';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from './Constant';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class Buyers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toolTipVisible: false,
            spinner: false,
            data: [],
            search_buyers: '',
            reload: true,
            url_buyers: '',
            refreshlist:false

        }
    }

    // componentDidMount() {
    //     this.buyerList(Constants.buyerlist);
    // }



    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }
    buyerList(url) {

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
                console.log('***************@@@@@@@@###########', responseJson)
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

    search() {

        let search_url = Constants.buyerlist + '?filter[buyer_name]=' + this.state.search_buyers;
        this.buyerList(search_url);
        console.log('search_url search_url', search_url);
    }

    buyersDetail(item) {

        this.props.navigation.navigate('BuyersView', { items: item, heading: 'BUYERS' })
        // Alert.alert('Message','UI Update Inprogress !')
    }

    suspendBuyer(buyer_id) {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(Constants.suspendBuyer + '?id=' + buyer_id, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('buyer un suspend Request !!!!!!!!!!', responseJson)
                this.setState({
                    spinner: false,
                });
                if (responseJson.success === true) {
                    // this.setState({
                    //     data: responseJson.data
                    // })
                    Alert.alert('Message', responseJson.data.message);

                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }
            })
    }

    unsuspendBuyer(buyer_id) {
        this.setState({ spinner: true ,
            refreshlist:true
        })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(Constants.unsuspendBuyer + '?id=' + buyer_id, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('buyer un suspend Request !!!!!!!!!!', responseJson)
                this.setState({
                    spinner: false,
                });
                if (responseJson.success === true) {
                    // this.setState({
                    //     data: responseJson.data
                    // })
                    Alert.alert('Message', responseJson.data.message);
                    this.props.navigation.navigate('Buyers')

                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    console.log('error un suspend Request !!!!!!!!!!', responseJson.data)
                    let message = responseJson.data.message
                    Alert.alert('Error', message)
                }
            })
    }

    suspendAction(item) {
        this.setState({
            refreshlist:true
        })
        if (item.is_active) {
            // suspend
            this.suspendBuyer(item.buyer_id);
            this.buyerList(Constants.buyerlist);

        } else {
            // unsuspend
            this.unsuspendBuyer(item.buyer_id);
            this.buyerList(Constants.buyerlist);
        }
        // this.listBuyers(this)
    }
    listBuyers(props) {
        
        let _that = props._that;
        let url = '';
        if (_that.props.route == null || _that.props.route.params == null || _that.props.route.params.filters == null) {
            url = Constants.buyerlist;
        }
        else {
           
            let filters = _that.props.route.params.filters;
            let filter = '?';
            for (let i = 0; i < filters.length; i++) {
                filter = filter +'filter'+ '['+filters[i].key +']' + '=' + filters[i].value;
                if (i != filters.length - 1) {
                    filter = filter + '&';
                }
            }
            url = (Constants.buyerlist + filter);
        }
        if (url != _that.state.url_buyers || _that.state.refreshlist) {
            _that.buyerList(url);
            _that.setState({
                url_buyers: url,
                refreshlist:false
            })
        }

        return (
            <View>
                {(_that.state.data.length>0)?
                <FlatList
                    data={_that.state.data}
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
                            onPress={() => _that.buyersDetail(item)}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}>
                            <View style={[{}, styles.flatCardView]}>
                                <View style={[{ paddingLeft: 10, alignItems: 'center' }, styles.cardRow]}>
                                    <Image
                                        style={{ height: 30, width: 30 }}
                                        source={require('../images/bage.png')}
                                    />
                                    <View style={[{}, styles.cardContentView]}>
                                        <Text style={[{}, styles.cardContentDarkText]}>{item.buyer_name}</Text>
                                        <Text style={[{}, styles.lightGrayText]}>{item.product_categories}</Text>
                                    </View>
                                    <View style={[{ alignItems: 'center', justifyContent: 'center' }, styles.cardActionView]}>

                                        <View style={[{}, styles.cardActionView]}>
                                            <TouchableOpacity
                                                // onPress={() => this.setState({ toolTipVisible: true })}
                                                style={[{}, styles.cardActionTouch]}
                                            >
                                                <Menu>
                                                    {/* <MenuTrigger text='. . .' customStyles={{}} /> */}
                                                    <MenuTrigger style={styles.trigger}>
                                                        {/* <Text style={styles.triggerText}>Slide-in menu...</Text> */}
                                                        <Icon name="ellipsis-h" color={'#929497'} size={20} />
                                                    </MenuTrigger>
                                                    <MenuOptions>
                                                        <MenuOption onSelect={() => _that.props.navigation.navigate('UpdateProduct', { buyer_detail: item ,fetch_action:'updateproduct',screen:'updateproduct' ,item:item})} >
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Image
                                                                    source={require('../images/update.png')}
                                                                />
                                                                <Text style={{ marginLeft: 10 }}>Update</Text>
                                                            </View>
                                                        </MenuOption>
                                                        <MenuOption onSelect={() => _that.suspendAction(item)} >
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Image
                                                                    source={require('../images/suspend.png')}
                                                                /> 
                                                                {(item.is_active == 1) ?
                                                                    <Text style={{ marginLeft: 10 }}>Suspend</Text>
                                                                    : <Text style={{ marginLeft: 10 }}>Unsuspend</Text>}
                                                            </View>
                                                        </MenuOption>

                                                    </MenuOptions>
                                                </Menu>
                                            </TouchableOpacity>
                                            {(item.is_active == 1) ?
                                                <Text style={[{}, styles.statusText]}>Active</Text>
                                                : <Text style={[{}, styles.statusPendingText]}>In Active</Text>}
                                        </View>

                                    </View>
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
            <Text style={{ color: '#929497', fontSize: 20, fontWeight: 'bold', fontFamily: 'Open Sans' }}>No Buyer found</Text>
        </View>
            }
            </View>
        );
    }

    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <View style={[{}, styles.mainRow]}>
                    <TouchableOpacity
                        // onPress={() => this.props.navigation.navigate('Home')}
                        onPress={() => this.props.navigation.goBack()}
                        style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 5 }]}>
                        <Icon name="arrow-left" size={25} color="#929497" />
                        <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>RESELLERS</Text>

                    </TouchableOpacity>
                </View>
                {/* <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', paddingHorizontal: 10, borderRadius: 5, marginTop: 10, alignItems: 'center', borderBottomColor: '#E6E6E6', borderBottomWidth: 2, paddingBottom: 10 }}>
                    <View style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, width: width - 30, alignSelf: 'center' }}>
                        <Image
                            source={require('../images/products/searchicon.png')}
                        />
                        <View>
                            <TextInput
                                label="Search buyers"
                                style={{ backgroundColor: 'transparent', }}
                                width={width - 50}
                                alignSelf={'center'}
                                color={'#000'}
                                onChangeText={text => this.setState({ search_buyers: text })}
                                onSubmitEditing={() => this.search()}

                            />
                        </View>
                        <View style={{ position: 'absolute', right: 0, alignSelf: 'center', }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('BuyersFilter')}
                            >
                                <Image
                                    source={require('../images/Order/settingicon.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View> */}
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', borderRadius: 5, marginTop: 10, alignItems: 'center' }}>

                    {/* <View style={{ flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', height: 50, paddingHorizontal: 10, borderRadius: 5, width: width - 80 }}>
                        <Image
                            style={{height:30,width:30}}
                            source={require('../images/products/searchicon.png')}
                        />
                        <TextInput
                            label="Search Buyers"
                            // selectionColor={'#fff'}

                            style={{ backgroundColor: 'transparent', }}
                            width={width / 1.4}
                            alignSelf={'center'}
                            color={'#000'}
                            onChangeText={text => this.setState({ search_buyers: text })}
                            onSubmitEditing={() => this.search()}
                        />
                    </View> */}
                    <Searchbar
                        placeholder="Search Resellers"
                        iconColor="#929497"
                        style={{ width: width / 1.3, alignSelf: 'center', marginTop: 10, marginBottom: 5, elevation: 0, borderColor: '#D8DCDE' }}
                        onChangeText={text => this.setState({ search_buyers: text })}
                        onSubmitEditing={() => this.search()}
                    //update
                    ></Searchbar>


                    <TouchableOpacity
                        style={{ position: 'absolute', right: 0, alignSelf: 'center', }}
                        // onPress={() => this.props.navigation.navigate('ProductFilter')}
                        onPress={() => this.props.navigation.navigate('BuyersFilter')}
                    >
                        <Image
                            style={{ height: 50, width: 50 }}
                            source={require('../images/Order/settingicon.png')}
                        />
                    </TouchableOpacity>

                </View>
                <View style={{ borderBottomWidth: 1, marginVertical: 5, width: width - 20, alignSelf: 'center', borderBottomColor: '#E6E6E6' }}></View>

                <ScrollView
                    scrollEnabled={true}
                    horizontal={true}
                    marginTop={10}
                >
                    <this.listBuyers _that={this} />
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
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Buyers)
