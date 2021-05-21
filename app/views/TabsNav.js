import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/TabNavCss'
import fontStyles from '../css/FontCss'
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
export default class TabsNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    render() {
     const that=this;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={[{},styles.tabRoW]}>
             <TouchableOpacity style={[{},styles.tabCoulumn]}
                onPress={()=>{this.props.props.navigation.navigate('Dashnoard')}}>
                <Image
                style={{height:30,width:30}}
                source={this.props.active_screen == 'Dashboard'?require('../images/tabnav/red_chart.png'):require('../images/tabnav/chart.png')}
                />
                <Text style={[{color:'#929497'},fontStyles.normal13]}>Dashboard</Text>
             </TouchableOpacity>
             <TouchableOpacity style={[{},styles.tabCoulumn]}             
             onPress={()=>{this.props.props.navigation.navigate('Order')}}>
                <Image                
                style={{height:30,width:25}}
                source={this.props.active_screen == 'Order'?require('../images/tabnav/red_order.png'):require('../images/tabnav/order.png')}
                />
                <Text>Orders</Text>
             </TouchableOpacity>
             <TouchableOpacity style={[{},styles.tabCoulumn]}             
             onPress={()=>{this.props.props.navigation.navigate('Products')}}>
                <Image
                style={{height:30,width:30}}
                source={this.props.active_screen == 'Products'?require('../images/tabnav/red_products.png'):require('../images/tabnav/products.png')}

                />
                <Text>Products</Text>
             </TouchableOpacity>
             <TouchableOpacity style={[{},styles.tabCoulumn]}             
             onPress={()=>{this.props.props.navigation.navigate('More')}}>
                <Image
                style={{height:30,width:30}}
                source={this.props.active_screen == 'More'?require('../images/tabnav/red_more.png'):require('../images/tabnav/more.png')}

                />
                <Text>More</Text>
             </TouchableOpacity>
            </View>
        )
    }
}
