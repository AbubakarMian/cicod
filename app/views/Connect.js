import React from 'react'
import { View, ImageBackground,ScrollView, TouchableHighlight, Alert, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity, } from 'react-native'
import splashImg from '../images/splash.jpg'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';

import styles from '../css/ConnectCss';
import { Container, Left, Body, Right, Button, Title, Segment, Content, } from 'native-base';
import { Constants } from './Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class Connect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabViewIndex: 1,
            received_arr: [],
            send_arr: [],
            spinner: false
        }
    }
    componentDidMount() {

        this.getSendConnect()
        this.getReceivedConnect()
    }
    getReceivedConnect() {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(Constants.connectreceivedrequest, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('response json received!!!!',responseJson);
                this.setState({
                    spinner: false
                });
                if (responseJson.success === true) {
                    this.setState({
                        received_arr:responseJson.data
                    })
                } else {
                    let message =responseJson.message
                    Alert.alert('Message', message)
                }
            })
    }
    getSendConnect() {
        this.setState({ spinner: true })

        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(Constants.connectsentrequest, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    spinner: false,
                });
                console.log('responseJson sent conet ', responseJson)
                if (responseJson.success === true) {
                    this.setState({
                        send_arr: responseJson.data
                    })
                } else {
                    let message = JSON.stringify(responseJson.message)
                    Alert.alert('Error', message)
                }
            })
    }


    connectView() {
        return (
            // <View>

            // </View>
            <View>
                <View style={[{}, styles.contentView]}>
                    <Image
                        source={require('../images/home/connect.png')}
                    />
                    <Text style={{ width: width / 2, textAlign: 'center', fontWeight: 'bold', color: '#4E4D4D' }}>Search for Merchant you want to connect with</Text>
                    <View style={[{}, styles.searchView]}>
                        <Image
                            source={require('../images/connect/redsearch.png')}
                        />
                        <TextInput
                            placeholder="Merchant Domain Name"
                        />
                    </View>


                </View>
                {/* <View style={[{}, styles.deatilcontentView]}>
                    <Icon
                        name="briefcase"
                        size={100}
                        color={'#D8D8D8'}
                    />
                    <Text style={{ fontWeight: 'bold', color: '#929497' }}>No Merchant</Text>
                    <Text style={{ color: '#929497', fontSize: 12 }}>Search for a merchant</Text>
                </View> */}
                <ScrollView>
                <View style={[{},styles.detailContentView]}>
                    <Image source={require('../images/bage.png')}/>
                    <Text style={[{},styles.customerNameText]}>Godswill</Text>
                    <View>
                        <View style={[{},styles.marchentRow]}>
                            <View style={[{},styles.marchentlableView]}>
                            <Text style={[{},styles.marchentlableText]}>Merchant ID</Text>
                            </View>
                            <View style={[{},styles.marchentInfoView]}>
                            <Text style={[{},styles.marchentInfoText]}>234134</Text>
                            </View>
                        </View>
                        <View style={[{},styles.marchentRow]}>
                            <View style={[{},styles.marchentlableView]}>
                            <Text style={[{},styles.marchentlableText]}>Business Sector</Text>
                            </View>
                            <View style={[{},styles.marchentInfoView]}>
                            <Text style={[{},styles.marchentInfoText]}>Manufacturing</Text>
                            </View>
                        </View>
                        <View style={[{},styles.marchentRow]}>
                            <View style={[{},styles.marchentlableView]}>
                            <Text style={[{},styles.marchentlableText]}>Business Type</Text>
                            </View>
                            <View style={[{},styles.marchentInfoView]}>
                            <Text style={[{},styles.marchentInfoText]}>Food Production</Text>
                            </View>
                        </View>
                        <View style={[{},styles.marchentRow]}>
                            <View style={[{},styles.marchentlableView]}>
                            <Text style={[{},styles.marchentlableText]}>Area</Text>
                            </View>
                            <View style={[{},styles.marchentInfoView]}>
                            <Text style={[{},styles.marchentInfoText]}>Eti-Osa</Text>
                            </View>
                        </View>
                        <View style={[{},styles.marchentRow]}>
                            <View style={[{},styles.marchentlableView]}>
                            <Text style={[{},styles.marchentlableText]}>Date Joined</Text>
                            </View>
                            <View style={[{},styles.marchentInfoView]}>
                            <Text style={[{},styles.marchentInfoText]}>November 18, 2020, 11:34 am</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                style={[{},styles.connectBtn]}
                >
                    <Text style={{color:'#fff'}}>Connect</Text>
                </TouchableOpacity>
                    </View>
                </View>
                

                </ScrollView>
            </View>
        );
    }
    recievedView() {
        return (
            <ScrollView>
                <View>
                    <View style={[{}, styles.searchContainer]}>
                        <Image
                            source={require('../images/products/searchicon.png')}
                        />
                        <TextInput
                            placeholder="Search a products"
                        />
                    </View>
                    <View style={[{}, styles.recievedList]}>
                        <FlatList
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
                            data={this.state.received_arr}
                            renderItem={({ item, index, separators }) => (
                                <TouchableHighlight
                                    key={item.key}
                                    onPress={() => this._onPress(item)}
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}>
                                    <View style={[{}, styles.flatCardView]}>
                                        <View style={{ flex: 1 }}>
                                            <Image source={require('../images/Order/bage.png')} />
                                        </View>
                                        <View style={{ flex: 3, flexDirection: 'column' }}>
                                            <Text>KNGS CROWN</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>342345 .  </Text>
                                                <Text style={{ color: '#aaa', fontSize: 10 }}>2017-01-30 / 10:45 AM</Text>
                                            </View>
                                        </View>

                                        <View style={[{ position: 'absolute', right: 0, marginTop: 5, backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                            <Text style={[{ color: '#26C281' }]}>ACTIVE</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
    sentView() {
        return (
            <View>
                <View style={[{}, styles.searchContainer]}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <TextInput
                        placeholder="Search a products"
                    />
                </View>
                <View style={[{}, styles.recievedList]}>
                    <FlatList
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
                        data={this.state.send_arr}
                        renderItem={({ item, index, separators }) => (
                            <TouchableHighlight
                                key={item.key}
                                onPress={() => this._onPress(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={[{}, styles.flatCardView]}>
                                    <View style={{ flex: 1 }}>
                                        <Image source={require('../images/Order/bage.png')} />
                                    </View>
                                    <View style={{ flex: 3, flexDirection: 'column' }}>
                                        <Text>{item.buyer_name}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.buyer_id}  </Text>
                                            <Text style={{ color: '#aaa', fontSize: 10 }}>{item.time_requested}</Text>
                                        </View>
                                    </View>
                                    {(item.status == 'PENDING') ?
                                        <View style={[{ position: 'absolute', right: 0, marginTop: 5, backgroundColor: '#FFFF99', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                            <Text style={[{ color: '#CCCC00' }]}>PENDING</Text>
                                        </View>
                                        :
                                        (item.status == 'APPROVED') ?
                                            <View style={[{ position: 'absolute', right: 0, marginTop: 5, backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                                <Text style={[{ color: '#26C281' }]}>APPROVED</Text>
                                            </View>
                                            : null
                                    }
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                </View>
            </View>
        );
    }
    tabView = () => {
        if (this.state.tabViewIndex == 1) {
            return this.connectView();
        }
        else if (this.state.tabViewIndex == 2) {
            return this.recievedView();
        }
        else if (this.state.tabViewIndex == 3) {
            return this.sentView();
        }
    }

    render() {
        return (

            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation}/>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <ScrollView>
                <View style={[{}, styles.mainRow]}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Home')}
                    style={[{ flexDirection: 'row', alignItems: 'center',marginLeft:5, marginVertical: 10 }]}>
                        <Icon name="arrow-left" size={25} color="#929497" />
                        <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>CONNECT</Text>
                    </TouchableOpacity>
                </View>
                <View style={[{}, styles.tabView]}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => { this.setState({ tabViewIndex: 1 }) }}
                    >
                        <Text style={{ color: '#B1272C', fontWeight: 'bold', textAlign: 'center' }}>Connect</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => { this.setState({ tabViewIndex: 2 }) }}
                    >
                        <Text style={{ textAlign: 'center' }}>Recieved</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => { this.setState({ tabViewIndex: 3 }) }}
                    >
                        <Text style={{ textAlign: 'center' }}>Sent</Text>
                    </TouchableOpacity>
                </View>

                <this.tabView />
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
export default connect(mapStateToProps, mapDispatchToProps)(Connect)
