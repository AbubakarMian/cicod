import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/AddProductCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class AddProduct extends React.Component {
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
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity>
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>ADD PRODUCT</Text>
                    </View>
                </View>
                <View>
                    <ScrollView>
                        <View style={[{}, styles.searchContainer]}>
                            <Image 
                            source={require('../images/products/searchicon.png')}
                            />
                            <TextInput 
                            placeholder="Search Customer"
                            />
                            
                        </View>
                        <View style={[{},styles.searchByCatCOntainer]}>
                            
                            <TextInput 
                            placeholder="Filter by Product Category"
                            />
                            <View style={[{},styles.searchByCatCOntainerIconView]}>
                            <Icon name="caret-down" size={25}
                            />
                            </View>
                        </View>
                        <View style={[{},styles.contentView]}>
                          <Image 
                          source={require('../images/noProduct.png')}
                          />
                          <Text style={[{},styles.contentViewHeadingText]}>No product selected</Text>
                          <Text style={[{},styles.contentViewDescText]}>Search for a product</Text>
                        </View>

                       
                    </ScrollView>
                </View>
            </View>
        )
    }
}
