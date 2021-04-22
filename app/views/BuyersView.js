import React from 'react';
import { Container, Input, InputGroup, List, ListItem } from 'native-base';
import { View, TouchableOpacity, Image, Dimensions, TouchableHighlight, Touchable, FlatList, ScrollView, Modal } from 'react-native';
import { Text, TextInput, Alert } from 'react-native-paper';
import fontStyles from '../css/FontCss'
import styles from '../css/BuyersViewCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from './Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';


var { width, height } = Dimensions.get('window');
class BuyersView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: true,
            supendModal: false,
            moreDeatailMOdal: false,
            items: {},
            orderList: []
        }
    }

    componentDidMount() {
        console.log('suppliers Props @@@@@@@@@!!!!!!!!!!!', this.props.route.params.items);
        this.setState({
            items: this.props.route.params.items,
            spinner: false,
        })
        if (this.props.route.params.heading == "SUPPLIER") {
            this.getSellerOrderHistory();
        } else {
            this.getBuyerOrderHistory()
        }
    }

    getSellerOrderHistory() {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        let orderListUrl = Constants.orderslist + '?id=' + this.props.route.params.items.seller_id + '&sort=-id';

        fetch(orderListUrl, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    spinner: false
                });
                if (responseJson.status === 'success') {
                    console.log('data data data res res res ', responseJson)
                    this.setState({
                        orderList: responseJson.data
                    });
                } else {
                    // let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', responseJson.message)
                }
            })
    }

    getBuyerOrderHistory() {

    }
    viewProducts() {
        this.props.navigation.navigate('Products', { seller_id: this.state.items.seller_id })
    }
    render() {
        return (

            <View>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <ScrollView>
                    <View style={[{}, styles.backRowView]}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="arrow-left" size={25} color={'#929497'} />
                        </TouchableOpacity>
                        <View style={[{}, styles.backRowHeadingView]}>
                            <Text style={[{}, styles.backRowHeadingText]}>{this.props.route.params.heading}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={[{}, styles.productDetailContainerView]}>
                            <Image source={require('../images/bage.png')} />
                            <Text style={[{}, styles.darkGrayBoldText]}>WellFoods NG</Text>
                            <Text style={[{}, styles.lightGrayText]}>836439034</Text>
                            <TouchableOpacity
                                onPress={() => this.setState({ supendModal: true })}
                                style={[{}, styles.iconRight]}
                            >
                                <Icon

                                    name="ellipsis-h"
                                    size={25}
                                    color={'#929497'}
                                />
                            </TouchableOpacity>


                        </View>
                        <View style={[{ borderWidth: 0.2, width: width - 30, marginVertical: 10, alignSelf: 'center' }]}></View>
                        <View>

                        </View>
                        <View style={[{}, styles.productDetailROwView]}>
                            <View style={[{}, styles.columnView]}>
                                <Text style={[{}, styles.lightGrayText]}>No of Products</Text>
                                <Text style={[{}, styles.darkGrayBoldText]}>{this.state.items.no_of_products}</Text>
                            </View>
                            <View style={[{}, styles.columnView]}>
                                <Text style={[{}, styles.lightGrayText]}>Order Created</Text>
                                <Text style={[{}, styles.darkGrayBoldText]}>{this.state.items.no_of_orders}</Text>
                            </View>
                            <View style={[{}, styles.columnView]}>
                                <Text style={[{}, styles.lightGrayText]}>Values of orders</Text>
                                <Text style={[{}, styles.darkGrayBoldText]}>N{this.state.items.value_of_orders}</Text>
                            </View>
                        </View>
                        <View style={[{}, styles.productDetailROwView]}>
                            <View style={[{}, styles.columnView]}>
                                <Text style={[{}, styles.lightGrayText]}>Min. Spend</Text>
                                <Text style={[{}, styles.darkGrayBoldText]}>N{this.state.items.minimum_spend}</Text>
                            </View>
                            <View style={[{}, styles.columnView]}>
                            </View>
                            <View style={[{}, styles.columnView]}>
                            </View>
                        </View>
                        <View style={[{}, styles.productDetailROwView]}>
                            <View style={[{}, styles.columnView]}>
                                {(this.props.route.params.heading == 'BUYERS') ?
                                    <TouchableOpacity
                                    onPress={()=>this.props.navigation.navigate('UpdateProduct')}
                                        style={[{}, styles.redTouch]}
                                    >

                                        <Text style={{ color: '#fff' }}>Update Products</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                    onPress={()=>this.props.navigation.navigate('CreateOrder',{heading:'supplier'})}
                                        style={[{}, styles.redTouch]}
                                    >

                                        <Text style={{ color: '#fff' }}>Create Order</Text>
                                    </TouchableOpacity>
                                }

                            </View>
                            <View style={[{}, styles.columnView]}>
                                <TouchableOpacity
                                    onPress={() => this.viewProducts()}
                                    style={[{}, styles.whiteTOuch]}
                                >
                                    <Text style={{ color: '#B1272C' }}>View Products</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <TouchableOpacity
                            onPress={() => this.setState({ moreDeatailMOdal: true })}
                            style={[{}, styles.moreTOuct]}>
                            <Text style={[{ marginRight: 10 }, styles.lightGrayText]}>More Details</Text>
                            <Icon
                                name="arrow-right"
                                color={'#B1272C'}
                                size={15}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={[{}, styles.searRowView]}>
                        <Icon name="search" color={'#B1272C'} size={20} />
                        <TextInput
                            label="Search order ID, amount, ticket Id"
                            style={{ backgroundColor: 'transparent', }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                        />
                        <TouchableOpacity
                            style={[{}, styles.settingIconView]}
                        >
                            <Image

                                source={require('../images/Order/settingicon.png')} />
                        </TouchableOpacity>

                    </View>
                    <Text style={[{}, styles.historyHeadingText]}>ORDER HISTORY</Text>
                    <ScrollView style={{ paddingBottom: 50, marginBottom: 20 }}>
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
                            data={this.state.orderList}
                            renderItem={({ item, index, separators }) => (
                                <TouchableHighlight
                                    key={item.key}
                                    // onPress={() => this._onPress(item)}
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}>
                                    <View style={[{}, styles.flatlistMainContianer]}>
                                        <View style={[{}, styles.flatlistMainRow]}>
                                            <Image
                                                source={[{}, styles.listImage]}
                                                source={require('../images/bage.png')} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={[{}, styles.darkGrayBoldText]}>103943535</Text>
                                                <Text style={[{}, styles.lightGrayText]}>Order contains 4 products</Text>
                                            </View>
                                            <View style={[{}, styles.actionContainer]}>
                                                <Text style={[{}, styles.darkGrayBoldText]}>N1,500,000</Text>
                                                <View style={[{}, styles.greenView]}>
                                                    <Text style={[{}, styles.greenText]}>PAID</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={[{}, styles.lightGrayText]}>2017-01-30 / 10:45 AM</Text>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </ScrollView>
                </ScrollView>
                <Modal
                    visible={this.state.supendModal}

                    transparent={true}
                >
                    <TouchableHighlight
                        onPress={() => this.setState({ supendModal: false })}
                    >
                        <View style={[{}, styles.modalBackGround]}>
                            <TouchableOpacity
                                onPress={() => this.setState({ supendModal: false })}
                                style={[{}, styles.suspendTouch]}>
                                <Image source={require('../images/ban.png')} style={[{}, styles.banImage]} />
                                <Text style={{}}>Suspend</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableHighlight>

                </Modal>
                {/* MoreDetail Modal */}
                <Modal
                    visible={this.state.moreDeatailMOdal}
                    transparent={true}
                >
                    <View style={[{}, styles.modalBackGround]}>
                        <View style={[{}, styles.moreDetailModalContentContainer]}>
                            <View style={[{}, styles.moreDeatialModalHeadingRow]}>
                                <Text style={[{}, styles.moreDetailHeadingText]}>MORE DETAIL</Text>
                                <TouchableOpacity
                                    onPress={() => this.setState({ moreDeatailMOdal: false })}
                                    style={[{}, styles.moreDetailModalCloseTouch]}
                                >
                                    <Icon name="close" size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={[{}, styles.moreDetailModalContentView]}>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>Email: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>j.joghnson@gmail.com</Text>
                                </View>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>Phone: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>08123456789</Text>
                                </View>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>Address: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>45b,45b Admiralty way, Lekki Phase 1,</Text>
                                </View>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>Area: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>Eti Osa</Text>
                                </View>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>State: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>Lagos</Text>
                                </View>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>Country: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>Nigeria</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );

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
export default connect(mapStateToProps, mapDispatchToProps)(BuyersView)