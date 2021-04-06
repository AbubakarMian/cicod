import React from 'react'
import { View, ImageBackground, ScrollView, Text, Dimensions, Image, Platform, TouchableOpacity, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg';
import styles from '../css/CreateProductCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class CreateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false
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
            { label: 'Part Payment', value: 3 },
        ];
        return (
            <View style={[{}, styles.mainView]}>
                <Header />
                <View style={[{}, styles.backRowView]}>
                    <TouchableOpacity>
                        <Icon name="arrow-left" size={25} color={'#929497'} />
                    </TouchableOpacity>
                    <View style={[{}, styles.backRowHeadingView]}>
                        <Text style={[{}, styles.backRowHeadingText]}>CREATE PRODUCT</Text>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <View style={[{}, styles.productDetailContainerView]}>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Product Category"
                                    />
                                    <Icon
                                        style={[{}, styles.rightIcon]}
                                        name="caret-down" />
                                </View>
                            </View>

                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="ProName*"
                                    />

                                </View>
                            </View>

                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Description"
                                    />

                                </View>
                            </View>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Product Code"
                                    />

                                </View>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Price (.00)"
                                    />

                                </View>
                            </View>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Reservation (Days)"
                                    />

                                </View>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Quantity"
                                    />

                                </View>
                            </View>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <CheckBox
                                        style={[{ width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                isChecked: !this.state.isChecked
                                            })
                                        }}
                                        isChecked={this.state.isChecked}
                                        rightText={"Add to Webshop"}
                                    />
                                </View>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <CheckBox
                                        style={[{ width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                isChecked: !this.state.isChecked
                                            })
                                        }}
                                        isChecked={this.state.isChecked}
                                        rightText={"No Quantity Limit?"}
                                    />
                                </View>
                            </View>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="VAT"
                                    />
                                   <Icon
                                        style={[{position:'absolute',right:width/2+20}]}
                                        name="caret-down" />
                                </View>
                            </View>
                            <View style={[{},styles.addImageView]}>
                               <Text style={[{},styles.addImageLableText]}>Image</Text>
                               <Image 
                               source={require('../images/redPlus.png')}
                               />
                            </View>
                        </View>
                        <View style={[{marginTop:10}, styles.productDetailContainerView]}>
                         <View style={[{}, styles.formRowView]}>
                               <View style={[{ flexDirection:'column' }]}>
                                    <CheckBox
                                        style={[{ width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                isChecked: !this.state.isChecked
                                            })
                                        }}
                                        isChecked={this.state.isChecked}
                                        rightText={"Add Variation"}
                                    />
                                    <Text style={[{},styles.lightGrayText]}>This product has more than one option</Text>
                                    <Text style={[{},styles.varaitionText]}>Variation</Text>
                                </View>
                            </View>   
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Attribute"
                                    />
                                   <Icon
                                        style={[{},styles.rightIcon]}
                                        name="caret-down" />
                                </View>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Price (.00)"
                                    />
                                </View>
                            </View>  
                            <View style={[{}, styles.formRowView]}>
                                <TouchableOpacity style={[{ position: 'relative' }, styles.formColumn]}>
                                    <Text style={[{},styles.redTouchText]}>
                                    + Add another variation
                                    </Text>
                                </TouchableOpacity>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                <CheckBox
                                        style={[{ width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                isChecked: !this.state.isChecked
                                            })
                                        }}
                                        isChecked={this.state.isChecked}
                                        rightText={"same price"}
                                    />
                                </View>
                            </View>  
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput 
                                    placeholder="Quantity"
                                    />
                                </View>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                <CheckBox
                                        style={[{ width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                isChecked: !this.state.isChecked
                                            })
                                        }}
                                        isChecked={this.state.isChecked}
                                        rightText={"No Quantity Limit?"}
                                    />
                                </View>
                            </View>
                            <View>
                            <Text style={[{},styles.productImageLable]}>Images</Text>
                            <View style={[{position:'relative',width:width/4}]}>
                                <TouchableOpacity style={[{},styles.productImageCross]}>
                                    <Image source={require('../images/productCross.png')}/>
                                </TouchableOpacity>
                            <Image 
                            style={[[],styles.productImage]}
                            source={require('../images/juice.png')}/>
                            </View> 
                            </View>
                          
                                <TouchableOpacity style={[{ alignSelf:'center',marginVertical:20 }, styles.formColumn]}>
                                    <Text style={[{},styles.redTouchText]}>
                                    + Add another variation
                                    </Text>
                                </TouchableOpacity>
                                
                        
                        </View>
                        <TouchableOpacity style={[{},styles.redTouch]}>
                            <Text style={{color:'#fff'}}>Save</Text>
                        </TouchableOpacity>
                       
                    </View>
                </ScrollView>
            </View>
        )
    }
}
