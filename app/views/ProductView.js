import React from 'react'
import { View, Dimensions, Image, Platform, Alert,TouchableOpacity} from 'react-native'
import { Text, TextInput, Modal  } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/ProductViewCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import { Constants } from '../views/Constant';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class ProductView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            searchPress: 1,
            productImageModal: false,
            spinner: false,
            prodDetail: {},
            supendModal:false,
            action:'suspend',
        }

    }

    componentDidMount() {
       
        let pro_url = Constants.products + '/' + this.props.route.params.prod_id
        this.getProductDetail(pro_url)
    }

    getProductDetail(url) {
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
                    if(responseJson.data.is_active == true){
                        this.setState({
                            prodDetail: responseJson.data,
                            action:'suspend'
                        })
                    }
                    else{
                        this.setState({
                            prodDetail: responseJson.data,
                            action:'unsuspend'
                        })
                    }
                    
                } else {
                    let message = responseJson.message;
                    Alert.alert('Error', message)
                }
            })
    }

    actionFun(){

    }
    suspendUnsuspendFun() {
        // https://com.cicodsaasstaging.com/com/api/products/23?action=suspend
        let url = Constants.products + '/' + this.state.prodDetail.id + '?action='+this.state.action;
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
                    Alert.alert('Message 1233', responseJson.message);
                    this.props.navigation.navigate('Products');
                } else {
                    let message = responseJson.message;
                    Alert.alert('Error', message)
                }
            })
    }

    updateProductFun(){

        this.props.navigation.navigate('CreateProduct',{action:'update',prodDetail:this.state.prodDetail});
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
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>PRODUCT</Text>
                    </View>
                </View>
                <View style={[{}, styles.productDeatailContainer]}>
                    <View style={[{}, styles.productDeatailHeaderRow]}>

                            {(this.state.prodDetail.is_active == true) ?
                            <View style={[{}, styles.aciveView]}>
                                <Text style={{ color: '#26C281' }}>ACTIVE</Text>
                                </View>
                                :
                                <View style={[{}, styles.inaciveView]}>
                                <Text style={{ color: '#B1272C' }}>IN ACTIVE</Text>
                                </View>
                            }
                        <Image
                            style={[{ alignSelf: 'baseline' }]}
                            source={require('../images/ticket.png')} />
                      <TouchableOpacity
                    style={[{}, styles.settingIcon]}
                    onPress={() => this.setState({ supendModal: true })}
                      >
                            <Icon
                                
                                size={25}
                                color={'#929497'}
                                name="ellipsis-h" />
                        </TouchableOpacity>
                    </View>
                    <Text style={[{color:'#4E4D4D',textAlign:'center'},fontStyles.bold18]}>{this.state.prodDetail.name + ' ' + this.state.prodDetail.quantity}</Text>
                    <Text style={[{color:'#929497',textAlign:'center'}, fontStyles.normal12]}>{this.state.prodDetail.code}</Text>
                    <View style={{ borderBottomWidth: 1, borderColor: '#E6E6E6', marginVertical: 10 }}></View>
                    <View style={[{}, styles.descRow]}>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Quantity</Text>
                            <Text style={[{}, styles.darkGarayText]}>{this.state.prodDetail.quantity}</Text>
                        </View>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Category</Text>
                            <Text style={[{}, styles.darkGarayText]}>{this.state.prodDetail.category}</Text>
                        </View>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Price</Text>
                            <Text style={[{}, styles.darkGarayText]}>N{this.state.prodDetail.price}</Text>

                        </View>
                    </View>
                    <View style={[{}, styles.descRow]}>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Reservation (Days)</Text>
                            <Text style={[{}, styles.darkGarayText]}>0</Text>
                        </View>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Created By</Text>
                            <Text style={[{}, styles.darkGarayText]}>{this.state.prodDetail.created_by} </Text>
                        </View>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Created Date</Text>
                            <Text style={[{}, styles.darkGarayText]}>{this.state.prodDetail.date_created}</Text>
                            {/* <Text style={[{}, styles.darkGarayText]}>10:30 AM</Text> */}

                        </View>

                    </View>
                    <View style={[{}, styles.descRow]}>
                        <View style={[{}, styles.descColumn]}>
                            <Text style={[{}, styles.lightGrayTex]}>Updated Date</Text>
                            <Text style={[{}, styles.darkGarayText]}>2020-11-23 11:26 AM</Text>
                        </View>
                        <View style={[{}, styles.descColumn]}>
                           
                        </View>
                        <View style={[{}, styles.descColumn]}>
                            

                        </View>

                    </View>

                </View>
                <Text style={[{}, styles.imageHeadingText]}>IMAGE</Text>
                <TouchableOpacity
                    onPress={() => this.setState({ productImageModal: true })}
                >
                    <Image
                        style={[{}, styles.productImage]}
                        // source={require('../images/juice.png')} />
                        source={{ uri: this.state.prodDetail.image }} />
                </TouchableOpacity>
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
                           <View style={[{flexDirection:'column',alignSelf:'baseline'},styles.suspendTouch]}>
                           <TouchableOpacity
                                onPress={()=>this.updateProductFun()}
                                style={[{flexDirection:'row'}, ]}>
                                {/* <Image source={require('../images/ban.png')} style={[{}, styles.banImage]} /> */}
                                <Icon name="edit" color={'gray'} size={20} style={[{}, styles.banImage]} />
                                <Text style={{}}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.suspendUnsuspendFun()}
                                style={[{flexDirection:'row',marginVertical:10}, ]}>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
