import React from 'react'
import { View, Dimensions, Image, Platform, Alert,TextInput, TouchableOpacity } from 'react-native'
import { Text,  Modal } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/ConnectViewCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import { Constants } from '../views/Constant';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class ConnectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            searchPress: 1,
            productImageModal: false,
            spinner: false,
            prodDetail: {},
            supendModal: false,
            action: 'suspend',
            item: {},
            area: '',
            business_sector: '',
            business_type: '',
            merchant_id: 0,
            buyer_name: '',
            buyer_id: '',
            date_joined: '',
            buyer_data: '',
            comment:'',
            decline_modal:false
        }
    }

    componentDidMount() {
        console.log('props !!!!!!!!!!!!!!!!!!!!!', this.props.route.params.item);
        // let pro_url = Constants.products + '/' + this.props.route.params.prod_id
        // this.getProductDetail(pro_url)
        let buyer_name = this.props.route.params.item.buyer_name;
        let url = Constants.searchMerchant + '?merchantId=' + buyer_name;
        console.log('url @@@@@@@@@@ !!!!!!!!!!!!!!!!!!!!!', url);
        this.getBuyer(url);
    }
    getBuyer(url) {
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
                console.log('response json received buyers !!!!!!!!!!!!!', responseJson);
                this.setState({
                    spinner: false
                });
                if (responseJson.success === true) {
                    // let buyer_data = responseJson.data.map((x, key) => { return { buyer_id: x.merchant_id, buyer_name: x.id } });
                    console.log(' responseJson.responseJson.data buyer data  !!!!!!!!!!!!!!!', responseJson.data)
                    let buyer_detail = responseJson.data
                    this.setState({
                        area: buyer_detail.area,
                        business_sector: buyer_detail.business_sector,
                        business_type: buyer_detail.business_type,
                        merchant_id: buyer_detail.merchant_id,
                        buyer_name: buyer_detail.merchant_name,
                        date_joined: buyer_detail.date_joined,
                        buyer_data: {
                            buyer_id: responseJson.data.merchant_id,
                            buyer_name: responseJson.data.merchant_name
                        },
                    })
                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.data.message
                    if (message == '' || message == undefined) {
                        message = 'Server responded with error contact admin'
                    }
                    Alert.alert('Error', message)
                }
            })
    }
    getConnectDetail(url) {
        let token = this.props.user.access_token;
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('responseJson.message', responseJson);
                this.setState({
                    spinner: false,

                });
                console.log('response json in products detail !!!!!!!!!!!!!!!!!!', responseJson);
                if (responseJson.status === "success" || responseJson.success === true) {
                    if (responseJson.data.is_active == true) {
                        this.setState({
                            prodDetail: responseJson.data,
                            action: 'suspend'
                        })
                    }
                    else {
                        this.setState({
                            prodDetail: responseJson.data,
                            action: 'unsuspend'
                        })
                    }

                } else {
                    let message = responseJson.message;
                    Alert.alert('Error', message)
                }
            })
    }
    
    suspendUnsuspendFun() {
        // https://com.cicodsaasstaging.com/com/api/products/23?action=suspend
        let url = Constants.products + '/' + this.state.prodDetail.id + '?action=' + this.state.action;
        console.log(' suspend product url !!!!!!!!!!!!', url);
        let token = this.props.user.access_token;
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('responseJson.message', responseJson);
                this.setState({
                    spinner: false,

                });
                console.log('response json suspend product  !!!!!!!!!!!!!!!!!!', responseJson);
                if (responseJson.status === "success" || responseJson.success === true) {
                    Alert.alert('Message', responseJson.message);
                    this.props.navigation.navigate('Products');
                } else {
                    let message = responseJson.message;
                    Alert.alert('Error', message)
                }
            })
    }

    declineRequest(){
    this.setState({ spinner: true })

    let url = Constants.decline_request+'?id='+this.props.route.params.item.id
    console.log('***********',url)
    let postData = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.props.user.access_token,
        },
        body: JSON.stringify({
            comment: this.state.comment,
        })
    };
    console.log('**************',this.state.comment);
    fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('*******************response json received buyers !!!!!!!!!!!!!', responseJson);
                this.setState({
                    spinner: false
                });
                if (responseJson.success === true) {

                    // let buyer_data = responseJson.data.map((x, key) => { return { buyer_id: x.merchant_id, buyer_name: x.id } });

                    console.log(' responseJson.responseJson.data buyer data  !!!!!!!!!!!!!!!', responseJson.data)
                    let buyer_detail = responseJson.data
                    this.setState({
                        area: buyer_detail.area,
                        business_sector: buyer_detail.business_sector,
                        business_type: buyer_detail.business_type,
                        buyer_id: buyer_detail.merchant_id,
                        buyer_name: buyer_detail.merchant_name,
                        date_joined: buyer_detail.date_joined,
                        buyer_data: {
                            buyer_id: responseJson.data.merchant_id,
                            buyer_name: responseJson.data.merchant_name
                        },
                    })

                    
                    Alert.alert('Success', "Decline is successfull!");
                    this.props.navigation.navigate('Connect')
                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.data.message
                    if (message == '' || message == undefined) {
                        message = 'Server responded with error contact admin'
                    }
                    Alert.alert('Error', message)
                }

            })
            .catch((error) => {
                // console.log('its error',error);
                Alert.alert('Error', error)
                this.setState({
                    spinner: false
                });
                
            });
    }

    render() {
        console.log('this.state.buyer_data this.state.buyer_data: ', this.state.buyer_data);

        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>Connect</Text>
                    </View>
                </View>
                <View style={[{}, styles.productDeatailContainer]}>
                    <View style={[{}, styles.productDeatailHeaderRow]}>

                        <Image
                            style={[{ alignSelf: 'baseline', height: 40, width: 40 }]}
                            source={require('../images/bage.png')} />

                    </View>
                    <Text style={[{ color: '#4E4D4D', textAlign: 'center' }, fontStyles.bold18]}>{this.state.buyer_name}</Text>
                    {/* <Text style={[{ color: '#929497', textAlign: 'center' }, fontStyles.normal12]}>sdf sdf sdfsdf sfd</Text> */}
                    <View style={{ borderBottomWidth: 1, borderColor: '#E6E6E6', marginVertical: 10 }}></View>
                    <View style={[{}, styles.descRow]}>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Merchant ID</Text>
                            <Text style={[{}, styles.darkGarayText]}>{this.state.buyer_name}</Text>
                        </View>
                    </View>
                    <View style={[{}, styles.descRow]}>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Business Sector</Text>
                            <Text style={[{}, styles.darkGarayText]}>{this.state.business_sector}</Text>
                        </View>
                    </View>
                    <View style={[{}, styles.descRow]}>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Business Type</Text>
                            <Text style={[{}, styles.darkGarayText]}>{this.state.business_type}</Text>
                        </View>
                    </View>
                    <View style={[{}, styles.descRow]}>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Area</Text>
                            <Text style={[{}, styles.darkGarayText]}>{this.state.area}</Text>
                        </View>
                    </View>
                    <View style={[{}, styles.descRow]}>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Date joined</Text>
                            <Text style={[{}, styles.darkGarayText]}>{this.state.date_joined}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',alignItems:'center', padding: 40, justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={()=>this.setState({decline_modal:true})}
                        style={[{marginHorizontal:5}, styles.greyTouch]}>
                        <Text style={{ color: '#929497' }}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('UpdateProduct', { buyer_detail: this.state.buyer_data, screen: 'buyer',item:this.props.route.params.item })}
                        style={[{}, styles.redTouch]}>
                        <Text style={{ color: '#fff' }}>Enable</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={this.state.productImageModal}
                    transparent={true}
                >
                    <View style={[{}, styles.modalBackGroung]}>
                        <TouchableOpacity
                            onPress={() => this.setState({ productImageModal: false })}
                            style={[{}, styles.modalCloseTouch]}
                        >
                            <Icon name="close"
                                color={'#fff'}
                                size={25}
                            />
                            <Text style={{ color: '#fff', marginLeft: 10 }}>Close</Text>
                        </TouchableOpacity>

                        <Image
                            style={{ height: height / 2, width: width / 1.3 }}
                            // source={require('../images/juice.png')}
                            source={{ uri: this.state.prodDetail.image }}
                        />
                    </View>

                </Modal>

                <Modal
                    visible={this.state.supendModal}

                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => this.setState({ supendModal: false })}
                    >
                        <View style={[{}, styles.suspendmodalBackGround]}>
                            <View style={[{ flexDirection: 'column', alignSelf: 'baseline' }, styles.suspendTouch]}>
                                <TouchableOpacity
                                    onPress={() => this.updateProductFun()}
                                    style={[{ flexDirection: 'row' },]}>
                                    {/* <Image source={require('../images/ban.png')} style={[{}, styles.banImage]} /> */}
                                    <Icon name="edit" color={'gray'} size={20} style={[{}, styles.banImage]} />
                                    <Text style={{}}>Update</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.suspendUnsuspendFun()}
                                    style={[{ flexDirection: 'row', marginVertical: 10 },]}>
                                    <Image source={require('../images/ban.png')} style={[{}, styles.banImage]} />
                                    {(this.state.action == "suspend") ?
                                        <Text style={{}}>Suspend</Text> :
                                        <Text style={{}}>Unsuspend</Text>
                                    }

                                </TouchableOpacity>
                            </View>
                        </View>

                    </TouchableOpacity>

                </Modal>
              
                <Modal
                    visible={this.state.decline_modal}

                    // transparent={true}
                >
                    <TouchableOpacity
                       onPress={()=>this.setState({decline_modal:false})}
                    >
                        <View style={[ styles.suspendmodalBackGround]}>
                           <View style={{backgroundColor:'#fff',paddingVertical:30,paddingHorizontal:30,width:width-50, borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                           <Image
                           style={{height:100,width:100}}
                           source={require('../images/Group7637.png')}
                           />
                           <Text style={[{color:'#4E4D4D'},fontStyles.normal15]}>You are about to Decline</Text> 
                           <View style={{flexDirection:'row'}}>
                             <Text style={[{color:'#4E4D4D'},fontStyles.bold18]}>{this.state.buyer_name}</Text>
                             <Text style={[{color:'#4E4D4D',paddingTop:3},fontStyles.normal15]}>  request</Text>
                           </View>
                           <Text style={[{color:'#929497',alignSelf:'flex-start',marginVertical:10},fontStyles.bold15]}>Reason</Text>
                          <View style={{width:width-70,}}>
                          <TextInput
                           placeholder="Enter Reason for decline"
                           style={{height:width/3,backgroundColor:'#E6E6E6',borderRadius:5}}
                           onChangeText={(text) => this.setState({ comment: text })} 
                           />
                       
                          </View>
                          <TouchableOpacity
                          onPress={() => this.declineRequest()}
                          style={[{backgroundColor:'#B1272C',marginTop:10,justifyContent:'center',alignItems:'center',width:width/1.5,borderRadius:100,paddingVertical:10}]}
                          >
                              <Text style={[{color:'#fff'},fontStyles.normal15]}>Decline</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                          onPress={()=>this.setState({decline_modal:false})}
                          style={[{backgroundColor:'#fff',borderWidth:0.5,borderColor:'#E6E6E6', marginTop:10,justifyContent:'center',alignItems:'center',width:width/1.5,borderRadius:100,paddingVertical:10}]}
                          >
                              <Text style={[{color:'#929497'},fontStyles.normal15]}>Cancle</Text>
                          </TouchableOpacity>
                           </View>
                        </View>

                    </TouchableOpacity>

                </Modal>
                
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
export default connect(mapStateToProps, mapDispatchToProps)(ConnectView)
