import React from 'react'
import { View, ScrollView, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity,} from 'react-native'
import {   Text, TextInput, Alert,Modal} from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/UpdateProductCss'
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Constants } from './Constant';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class UpdateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            searchPress: 1,
            updateProductModal: false,
            prod_list: []
        }

    }

    componentDidMount() {
        this.getData();
    }

    getData() {

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
        fetch(Constants.products, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('responseJson.message', responseJson);
                console.log('responseJson.postData', postData);
                this.setState({
                    spinner: false,

                });
                if (responseJson.status === "success" || responseJson.success === true) {

                    let datares_arr = responseJson.data;
                    let categories = [];
                    let data_arr = [];
                    for (let i = 0; i < datares_arr.length; i++) {
                        console.log('index ', i);
                        console.log('data_arrdata_arrdata_arr ', datares_arr[i]);
                        console.log('data_arrdata_arrdata_arr 2', datares_arr[i].category);
                        let cat_name = '';
                        if (!datares_arr[i].category) {
                            continue;
                            // cat_name = datares_arr[i].category;
                        }
                        cat_name = datares_arr[i].category;
                        if (this.in_array(categories, cat_name) === -1) {
                            console.log('categoriescategoriescategories categories', categories)
                            categories.push(datares_arr[i].category);
                            data_arr.push({
                                category: cat_name,
                                data: []
                            });
                            for (let j = 0; j < datares_arr.length; j++) {
                                console.log('datares_arr[j].category 1', datares_arr[j].category);
                                console.log('cat_name 1', cat_name);
                                if (datares_arr[j].category == cat_name) {
                                    console.log('datares_arr[j].category ', datares_arr[j].category);
                                    console.log('cat_name ', cat_name);
                                    data_arr[(data_arr.length - 1)].data.push(datares_arr[j]);
                                }
                            }
                            break;
                        }
                    }
                    console.log('categoriesdata_arrdata_arrdata_arr hi ', data_arr);

                    this.setState({
                        data: responseJson.data,
                        prod_list: data_arr
                    })
                } else {
                    let message = responseJson.message;
                    console.log('message !!!!!!!!!!!!!!!!', message);
                    Alert.alert('Error !!!!!!!!!!', message)
                }
            })
    }

    in_array(arr, value) {
        console.log('arr', arr)
        console.log('value', value)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == value) {
                return i;
            }
        }
        return -1;
    }

    updateProductAccess() {
        // https://com.cicodsaasstaging.com/com/api/value-chain/update-buyer-products?id=123435
        // Constants.updateBuyerProduct
        let postData = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token,
            },
            body: JSON.stringify({
                products: [
                    "100",
                    "101",
                    "102"
                ]
            })
        };
        fetch(Constants.login, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log("response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                if (responseJson.status === "SUCCESS") {
                    this.props.setUser({
                        firstname: responseJson.user.firstname,
                        lastname: responseJson.user.lastname,
                        email: responseJson.user.email,
                        phone: responseJson.user.phone,
                        access_token: 'Bearer ' + responseJson.token
                    });
                    this.setState({ spinner: false })


                    console.log('get user !!!!!!!!!!!!!!!!', this.props.user)
                    this.props.navigation.navigate('Home')
                } else {
                    this.setState({ spinner: false })
                    let message = responseJson.messa
                    Alert.alert('Error', message)
                }
            }
            )
            .catch((error) => {
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });
    }


render() {

    return (
        <View style={[{}, styles.mainView]}>
            <Header navigation={this.props.navigation} />
            <View style={[{}, styles.backHeaderRowView]}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Buyers')}
                >
                    <Icon name="arrow-left" size={25} color="#929497" />
                </TouchableOpacity>
                <View style={[{}, styles.backHeadingView]}>
                    <Text style={[{}, styles.backHeadingText]}>UPDATE PRODUCTS - WELLFOODS NG</Text>
                </View>
            </View>
            <View style={[{}, styles.headingDescView]}>
                <Text style={[{}, styles.headingDescText]}>Select Product category or products you want Merchant to have access to</Text>
            </View>
            <View style={[{}, styles.headingBoxView]}>
                <Image source={require('../images/bage.png')} />
                <Text style={[{}, styles.headingBoxText]}>WellFoods NG</Text>
            </View>
            <View style={{ borderWidth: 0.5, borderColor: '#E6E6E6', marginVertical: 10, width: width - 20, alignSelf: 'center' }}></View>
            <View style={[{}, styles.searchRowView]}>
                <View>
                    <Image source={require('../images/products/searchicon.png')} />
                </View>
                <View>
                    <TextInput
                        label="Search product or product category"
                        style={{ backgroundColor: 'transparent', }}
                        width={width - 50}
                        alignSelf={'center'}
                        color={'#000'}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Filter')}
                    style={[{}, styles.searchRowSettingIconView]}>
                    <Image
                        source={require('../images/Order/settingicon.png')}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                    <View style={[{}, styles.selectedProductRowView]}>
                        <Text style={[{}, styles.darkGrayBoldText]}>10 </Text>
                        <Text style={[{}, styles.darkGrayNormalText]}>product selected</Text>
                    </View>
                    <View>
                        <Text style={[{}, styles.flatelistHeadingText]}>RUDY JUICE</Text>
                        <Icon
                            style={[{ right: 20 }, styles.flatelistHeadingIcon]}
                            name="check-circle"
                            color={'#26C281'}
                            size={20}
                        />
                    </View>
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
                        data={[
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item2' },
                        ]}
                        renderItem={({ item, index, separators }) => (
                            <TouchableHighlight
                                key={item.key}
                                onPress={() => this._onPress(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={[{}, styles.flatListRowView]}>
                                    <Image source={require('../images/ticket.png')} />
                                    <Text style={[{}, styles.flatListRowText]}>Big APPLE Rody FRUTTA 500ML</Text>
                                    <Icon
                                        style={[{ right: 10 }, styles.flatelistHeadingIcon]}
                                        name="check-circle"
                                        color={'#26C281'}
                                        size={20}
                                    />
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                    <View style={{ marginTop: 5, }}>
                        <Text style={[{}, styles.flatelistHeadingText]}>BUST JUICE</Text>
                        <Icon
                            style={[{ right: 20 }, styles.flatelistHeadingIcon]}
                            name="check-circle"
                            color={'#E6E6E6'}
                            size={20}
                        />
                    </View>
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
                        data={[
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item2' },
                            { title: 'Title Text', key: 'item3' },
                        ]}
                        renderItem={({ item, index, separators }) => (
                            <TouchableHighlight
                                key={item.key}
                                onPress={() => this._onPress(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={[{}, styles.flatListRowView]}>
                                    <Image source={require('../images/ticket.png')} />
                                    <Text style={[{}, styles.flatListRowText]}>APPLE BUST FRUTTA 250ML</Text>
                                    <Icon
                                        style={[{ right: 10 }, styles.flatelistHeadingIcon]}
                                        name="check-circle"
                                        color={'#E6E6E6'}
                                        size={20}
                                    />
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                    <View>
                        <Text style={[{}, styles.flatelistHeadingText]}>FRUTTA JUICE</Text>
                        <Icon
                            style={[{ right: 20 }, styles.flatelistHeadingIcon]}
                            name="check-circle"
                            color={'#26C281'}
                            size={20}
                        />
                    </View>
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
                        data={[
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item2' },
                        ]}
                        renderItem={({ item, index, separators }) => (
                            <TouchableHighlight
                                key={item.key}
                                onPress={() => this._onPress(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={[{}, styles.flatListRowView]}>
                                    <Image source={require('../images/ticket.png')} />
                                    <Text style={[{}, styles.flatListRowText]}>Big APPLE Rody FRUTTA 500ML</Text>
                                    <Icon
                                        style={[{ right: 10 }, styles.flatelistHeadingIcon]}
                                        name="check-circle"
                                        color={'#26C281'}
                                        size={20}
                                    />
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                    <View>
                        <Text style={[{}, styles.flatelistHeadingText]}>BUST JUICE</Text>
                        <Icon
                            style={[{ right: 20 }, styles.flatelistHeadingIcon]}
                            name="check-circle"
                            color={'#E6E6E6'}
                            size={20}
                        />
                    </View>
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
                        data={[
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item2' },
                        ]}
                        renderItem={({ item, index, separators }) => (
                            <TouchableHighlight
                                key={item.key}
                                onPress={() => this._onPress(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={[{}, styles.flatListRowView]}>
                                    <Image source={require('../images/ticket.png')} />
                                    <Text style={[{}, styles.flatListRowText]}>APPLE BUST FRUTTA 250ML</Text>
                                    <Icon
                                        style={[{ right: 10 }, styles.flatelistHeadingIcon]}
                                        name="check-circle"
                                        color={'#E6E6E6'}
                                        size={20}
                                    />
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => this.setState({ updateProductModal: true })}
                style={[{}, styles.redTouchView]}
            >
                <Text style={{ color: '#fff' }}>Update Product Access</Text>
            </TouchableOpacity>

            <Modal
                visible={this.state.updateProductModal}
                transparent={true}
            >
                <TouchableHighlight
                    onPress={() => this.setState({ updateProductModal: false })}
                    style={[{}, styles.modalMainContainer]}>
                    <View style={[{}, styles.modalCOntainer]}>
                        <Image source={require('../images/bluequesmark.png')} />
                        <Text style={[{}, styles.modalNormalText]}>You are about to give</Text>
                        <View style={[{}, styles.modalTextRowView]}>
                            <Text style={[{}, styles.modalNormalText]}>WellFoods NG access to</Text>
                            <Text style={[{}, styles.modalBOldText]}> 15 </Text>
                        </View>
                        <View style={[{}, styles.modalTextRowView]}>
                            <Text style={[{}, styles.modalBOldText]}>products </Text>
                            <Text style={[{}, styles.modalNormalText]}>in 4 product category</Text>
                        </View>
                        <TouchableOpacity

                            style={[{ backgroundColor: '#B1272C', }, styles.modalTouchView]}
                        >
                            <Text style={{ color: '#fff' }}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.setState({ updateProductModal: false })}
                            style={[{ backgroundColor: '#fff', }, styles.modalTouchView]}
                        >
                            <Text style={{ color: '#929497' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableHighlight>
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)