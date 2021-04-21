import React from 'react'
import { View, ImageBackground,  FlatList,  TouchableHighlight, Dimensions, Image, Platform, TouchableOpacity,  } from 'react-native'
import splashImg from '../images/splash.jpg'
import {   Text, TextInput, Alert} from 'react-native-paper';
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
import { Container, Left, Body, Right, Button, Title, Segment, Content, } from 'native-base';
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
            search_buyers: ''

        }
    }

    componentDidMount() {
        this.buyerList(Constants.buyerlist);
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

                } else {
                    let message = responseJson.message;
                    // Alert.alert('Error', message)
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
        console.log(' will receive props !!!!!!!!!!!!!', filter);
        return
        this.getData(Constants.productslist + filter);
    }

    search() {

        let search_url = Constants.buyerlist + '?filter[buyer_name]=' + this.state.search_buyers;
        this.buyerList(search_url);
        console.log('search_url search_url', search_url);
    }

    buyersDetail() {

        this.props.navigation.navigate('BuyersView')
    }


    render() {
        console.log('data data !!!!!!!!!!!!', this.state.data);
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
                        onPress={() => this.props.navigation.navigate('Home')}
                        style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 5 }]}>
                        <Icon name="arrow-left" size={25} color="#929497" />
                        <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>BUYERS</Text>

                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', paddingHorizontal: 10, borderRadius: 5, marginTop: 10, alignItems: 'center', borderBottomColor: '#E6E6E6', borderBottomWidth: 2, paddingBottom: 10 }}>
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

                </View>

                <ScrollView
                    scrollEnabled={true}
                    horizontal={true}
                    marginTop={10}
                >
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
                                onPress={() => this.buyersDetail()}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={[{}, styles.flatCardView]}>
                                    <View style={[{}, styles.cardRow]}>
                                        <Image
                                            source={require('../images/bage.png')}
                                        />
                                        <View style={[{}, styles.cardContentView]}>
                                            <Text style={[{}, styles.cardContentDarkText]}>{item.buyer_name}</Text>
                                            <Text style={[{}, styles.lightGrayText]}>{item.product_categories}</Text>
                                        </View>
                                        <View style={[{}, styles.cardActionView]}>

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
                                                            <MenuOption onSelect={() => alert(`Save`)} >
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Image
                                                                        source={require('../images/update.png')}
                                                                    />
                                                                    <Text style={{ marginLeft: 10 }}>Update</Text>
                                                                </View>
                                                            </MenuOption>
                                                            <MenuOption onSelect={() => alert(`Save`)} >
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Image
                                                                        source={require('../images/suspend.png')}
                                                                    />
                                                                    <Text style={{ marginLeft: 10 }}>Suspend</Text>
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
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Buyers)
