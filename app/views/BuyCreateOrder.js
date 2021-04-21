import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Dimensions, Modal, Image, Platform, TouchableOpacity, FlatList } from 'react-native'
import { Text, TextInput, Alert } from 'react-native-paper';
import styles from '../css/BuyCreateOrderCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-check-box';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class BuyCreateOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            suppliereModal: true
        }

    }
    render() {
        var radio_props_dilvery = [
            { label: 'Dilivery', value: 0 },

        ];
        var radio_props_pickup = [
            { label: 'Pickup', value: 1 },
        ];
        var radio_props_payment = [
            { label: 'Pay Now', value: 0 },
            { label: 'Pay Acount', value: 1 },
            { label: 'Pay Invoice', value: 2 },

        ];
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <ScrollView>
                    <View>
                        <View style={[{}, styles.backHeaderRowView]}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Home')}

                            >
                                <Icon name="arrow-left" size={25} color="#929497" />
                            </TouchableOpacity>
                            <View style={[{}, styles.backHeadingView]}>
                                <Text style={[{}, styles.backHeadingText]}>CREATE sdfs fsdfsdfORDER</Text>
                            </View>
                            <View style={[{}, styles.backHeadingCloseView]}>
                                <Icon name="times" size={20} color="#929497" />
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Home')}
                                >
                                    <Text style={[{}, styles.backHeadingCloseText]}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[{}, styles.customerTitleRowView]}>
                            <Text style={[{}, styles.customerTitleRowHeadingText]}>TestKing Nigeria</Text>
                            <TouchableOpacity
                                onPress={() => this.setState({ suppliereModal: true })}
                            >
                                <Text style={[{}, styles.customerTitleRowchangesupplierText]}>Change Supplier</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[{}, styles.customerDetailView]}>
                            <Text style={[{}, styles.customerDetailHeadingText]}>Customer Details</Text>
                            <View style={[{}, styles.customerDetailRow]}>
                                <Icon name="user-circle" color={'#929497'} size={15} />
                                <Text style={[{}, styles.customerDetailNameText]}>BridgeBuy Retail</Text>
                            </View>
                            <View style={[{}, styles.customerDetailRow]}>
                                <Text style={[{}, styles.customerDetailLable]}>Email:  </Text>
                                <Text style={[{}, styles.customerDetailInfo]}>j.joghnson@gmail.com</Text>
                            </View>
                            <View style={[{}, styles.customerDetailRow]}>
                                <Text style={[{}, styles.customerDetailLable]}>Phone:  </Text>
                                <Text style={[{}, styles.customerDetailInfo]}>08123456789</Text>
                            </View>
                            <View style={[{}, styles.downIconView]}>
                                <Icon name="angle-down"
                                    size={20}
                                    color={'#929497'} />
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddProduct')}
                        >
                            <View style={[{}, styles.customerContaineraddProductView]}>

                                <Image
                                    source={require('../images/products/circlePlus.png')}
                                />
                                <Text style={[{}, styles.customerContaineraddProductText]}>Add Product</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[{}, styles.OrderDetailContainer]}>
                            <Text style={[{}, styles.customerContainerhead]}>Order Detail</Text>
                            <Image
                                source={require('../images/cartSlash.png')}
                            />
                            <Text style={[{}, styles.OrderDetailContainerHeadingText]}>No product added</Text>
                            <Text style={[{}, styles.OrderDetailContainerText]}>Add a product</Text>
                        </View>
                        <View style={[{}, styles.diliveryTypeContainerView]}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('DiliveryAddress')}
                            >
                                <View style={[{}, styles.radioFormView]}>
                                    {/* <RadioForm
                                        isSelected={false}
                                        color={'green'}
                                        buttonColor={'grey'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        radio_props={radio_props_dilvery}

                                        // initial={0}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                    /> */}
                                    <RadioForm
                                        isSelected={false}
                                        color={'yellow'}
                                        // radio_props={radio_props_payment}
                                        size={5}
                                        buttonColor={'green'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        initial={0}
                                        onPress={(value) => { this.setState({ value3Index: value }) }}
                                    />
                                    {
                                        radio_props_dilvery.map((obj, i) => (
                                            <RadioButton labelHorizontal={true} key={i} >
                                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={this.state.value3Index === i}
                                                    onPress={(value) => { this.setState({ value3Index: value }) }}
                                                    borderWidth={1}
                                                    buttonInnerColor={'#e74c3c'}
                                                    buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    buttonStyle={{}}

                                                    buttonWrapStyle={{ marginLeft: 10 }}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={(value) => { this.setState({ value3Index: value }) }}
                                                    // labelStyle={{fontSize: 20, color: '#2ecc71'}}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                        ))
                                    }
                                    <Text style={[{}, styles.smailGrayText]}>Dilivery to customer address</Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('PickUpLocation')}
                            >
                                <View style={[{}, styles.radioFormView]}>
                                    {/* <RadioForm
                                        isSelected={false}
                                        buttonColor={'red'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        radio_props={radio_props_pickup}
                                        // initial={0}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                    /> */}
                                    <RadioForm
                                        isSelected={false}
                                        color={'yellow'}
                                        // radio_props={radio_props_payment}
                                        size={5}
                                        buttonColor={'green'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        initial={0}
                                        onPress={(value) => { this.setState({ value3Index: value }) }}
                                    />
                                    {
                                        radio_props_pickup.map((obj, i) => (
                                            <RadioButton labelHorizontal={true} key={i} >
                                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={this.state.value3Index === i}
                                                    onPress={(value) => { this.setState({ value3Index: value }) }}
                                                    borderWidth={1}
                                                    buttonInnerColor={'#e74c3c'}
                                                    buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    buttonStyle={{}}

                                                    buttonWrapStyle={{ marginLeft: 10 }}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={(value) => { this.setState({ value3Index: value }) }}
                                                    // labelStyle={{fontSize: 20, color: '#2ecc71'}}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                        ))
                                    }
                                    <Text style={[{}, styles.smailGrayText]}>Pickup from our location</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[{}, styles.paymentContainerView]}>
                            <Text style={[{}, styles.paymentHeadingText]}>Payment Options</Text>
                            <View style={[{}, styles.radioFormView]}>
                                <RadioForm
                                    isSelected={false}
                                    color={'yellow'}
                                    // radio_props={radio_props_payment}
                                    size={5}
                                    buttonColor={'green'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    initial={0}
                                    onPress={(value) => { this.setState({ value3Index: value }) }}
                                />
                                {
                                    radio_props_payment.map((obj, i) => (
                                        <RadioButton labelHorizontal={true} key={i} >
                                            {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.value3Index === i}
                                                onPress={(value) => { this.setState({ value3Index: value }) }}
                                                borderWidth={1}
                                                buttonInnerColor={'#e74c3c'}
                                                buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                buttonSize={10}
                                                buttonOuterSize={20}
                                                buttonStyle={{}}

                                                buttonWrapStyle={{ marginLeft: 10 }}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={(value) => { this.setState({ value3Index: value }) }}
                                                // labelStyle={{fontSize: 20, color: '#2ecc71'}}
                                                labelWrapStyle={{}}
                                            />
                                        </RadioButton>
                                    ))
                                }
                            </View>
                            <View style={[{}, styles.paymentCheckboxView]}>
                                <CheckBox
                                    style={{ width: width / 1.5, alignSelf: 'center', alignItems: 'center' }}
                                    onClick={() => {
                                        this.setState({
                                            isChecked: !this.state.isChecked
                                        })
                                    }}
                                    isChecked={this.state.isChecked}
                                    rightText={"Accept multiple part payment"}


                                />
                            </View>
                        </View>
                        <View style={[{}, styles.subTotleRowView]}>

                            <View style={[{}, styles.subTotleColumn1View]}>
                                <Text style={[{}, styles.subTotleColumn1Text]}>subtotal:</Text>
                                <Text style={[{}, styles.subTotleColumn1Text]}>Tax(7.5%)</Text>
                                <Text style={[{}, styles.subTotleColumn1Text]}>TOTAL:</Text>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('ApplyDiscount')}

                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="times-circle" size={20} color="#B1272C" />
                                        <Text style={{ color: '#929497', fontSize: 10, marginLeft: 5, fontWeight: 'bold' }}>Apply for Discount</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={[{}, styles.subTotleColumn2View]}>
                                <Text style={[{}, styles.subTotleColumn2Text]}>-</Text>
                                <Text style={[{}, styles.subTotleColumn2Text]}>-</Text>
                                <Text style={[{}, styles.subTotleColumn2Text]}>-</Text>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('AddNote')}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="times-circle" size={20} color="#B1272C" />
                                        <Text style={{ color: '#929497', fontSize: 10, marginLeft: 5, fontWeight: 'bold' }}>Add a note</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('MakePayment')}
                            style={[{}, styles.btnContinuueView]}>
                            <Text style={{ color: '#FFFFFF' }}>Pay</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Modal
                    visible={this.state.suppliereModal}
                    transparent={true}
                >
                    <View style={[{}, styles.mainContainer]}>
                        <TouchableOpacity
                            style={[{}, styles.backgroundTouch]}
                        >

                        </TouchableOpacity>
                        <View style={[{}, styles.contentView]}>
                            <View style={[{}, styles.modalCancleRow]}>
                                <Text style={[{}, styles.modalCancleText]}>SELECT SUPPLIERS</Text>
                                <TouchableOpacity
                                    onPress={() => this.setState({ suppliereModal: false })}
                                    style={[{}, styles.modalCancleTouch]}
                                >
                                    <Icon name="times" size={20} color="#929497" />
                                </TouchableOpacity>
                            </View>
                            <View style={[{}, styles.searchRow]}>
                                <Icon name="search" size={20} color="#929497" />
                                <TextInput
                                    label="Search supplier"
                                    style={{ backgroundColor: 'transparent', }}
                                    width={width - 50}
                                    alignSelf={'center'}
                                    color={'#000'}
                                />
                            </View>
                            <ScrollView

                            >
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
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item1' },
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item2' },
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item3' },
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item4' },
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item5' },
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item6' },
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item7' },
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item8' },
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item9' },
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item10' },
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item11' },
                                        { title: 'TestKing Nigeria', num: '836439034', key: 'item12' },
                                    ]}
                                    renderItem={({ item, index, separators }) => (
                                        <TouchableHighlight
                                            key={item.key}
                                            onPress={() => this.props.navigation.navigate('Supplier')}
                                            onShowUnderlay={separators.highlight}
                                            onHideUnderlay={separators.unhighlight}>
                                            <View style={[{}, styles.modalListContainer]}>
                                                <Image source={require('../images/bage.png')} />
                                                <View style={[{}, styles.modalListContentView]}>
                                                    <Text style={[{}, styles.modalBoldeText]}>{item.title}</Text>
                                                    <Text style={[{}, styles.modalNumberText]}>{item.num}</Text>
                                                </View>
                                                <Icon
                                                    style={[{}, styles.modalListContentRightIcon]}
                                                    name="angle-right" size={20} color="#aaa" />
                                            </View>
                                        </TouchableHighlight>
                                    )}
                                />
                            </ScrollView>

                        </View>
                    </View>

                </Modal>
            </View>
        );
    }
}


